import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CustomSelect from './CustomSelect';

import { dataCountList, dataStream } from "../../data/dataCountList";

const toggleExpand = jest.fn();
const defaultProps = {
  setDataCount: toggleExpand,
  dataCount: [],
  isStreamer: true,
  stream: [],
  setStream: [],
  dataCountList,
  dataStream,
  onClick: toggleExpand,
};

test('<CustomSelect /> component renders correctly', () => {
  const { container } = render(<CustomSelect {...defaultProps} />);
  expect(container).toMatchSnapshot();
});
