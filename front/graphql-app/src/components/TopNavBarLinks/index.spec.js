import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TopNavBarLinks from './TopNavBarLinks';

const toggleExpand = jest.fn();
const defaultProps = {
  title: 'awesome title',
  content: {},
  onClick: toggleExpand,
};

test('<TopNavBarLinks /> component renders correctly', () => {
  const { container } = render(<TopNavBarLinks {...defaultProps} />);
  expect(container).toMatchSnapshot();
});
