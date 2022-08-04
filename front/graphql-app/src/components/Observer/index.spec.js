import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Observer from './Observer';

const toggleExpand = jest.fn();
const defaultProps = {
  title: 'awesome title',
  content: {},
  onClick: toggleExpand,
};

test('<Observer /> component renders correctly', () => {
  const { container } = render(<Observer {...defaultProps} />);
  expect(container).toMatchSnapshot();
});
