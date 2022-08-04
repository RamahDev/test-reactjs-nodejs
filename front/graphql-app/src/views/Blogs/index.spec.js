import 'cross-fetch/polyfill';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { split, HttpLink, InMemoryCache, ApolloClient, ApolloProvider } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

import { store, mockDispatchfn } from '../../../testHelpers';

import Blogs from './';

const toggleExpand = jest.fn();
const defaultProps = {
  item: {},
  data: [],
  store,
};

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:4004/subscriptions',
  // connectionParams: {
  //   authToken: user.authToken,
  // },
}));

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
});

test('<Blogs /> component renders correctly', () => {
  const { container } = render(
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Blogs {...defaultProps} dispatch={mockDispatchfn} />
      </ApolloProvider>
    </Provider>
  );
  expect(container).toMatchSnapshot();
});
