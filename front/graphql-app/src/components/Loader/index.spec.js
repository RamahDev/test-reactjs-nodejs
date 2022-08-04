import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Loader from './Loader';

const toggleExpand = jest.fn();
const defaultProps = {
  title: 'awesome title',
  content: {},
  onClick: toggleExpand,
};

test('<Loader /> component renders correctly', () => {
  const { container } = render(<Loader {...defaultProps} />);
  expect(container).toMatchSnapshot();
});
