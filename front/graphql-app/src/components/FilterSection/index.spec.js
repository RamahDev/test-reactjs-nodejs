import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { dataCountList, dataStream } from "../../data/dataCountList";

import FilterSection from './FilterSection';

const toggleExpand = jest.fn();
const defaultProps = {
  customSelectProps: {
    dataCount: dataCountList,
    isStreamer: false,
    stream: false,
    setStream: toggleExpand,
    dataCountList,
    dataStream,
  },
  csvReport: {
    data: [],
  },
  isLoading: false,
  onClick: toggleExpand,
};

test('<FilterSection /> component renders correctly', () => {
  const { container } = render(<FilterSection {...defaultProps} />);
  expect(container).toMatchSnapshot();
});
