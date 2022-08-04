import * as React from 'react';
import * as PropTypes from 'prop-types';
import { mergeClassNames } from '../../../common/utils/ClassNameMerge';

export const Search = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={mergeClassNames('w-3', className)}
  >
    <path
      fillRule="evenodd"
      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
      clipRule="evenodd"
    />
  </svg>
);

Search.propTypes = {
  className: PropTypes.string,
};

Search.defaultProps = {
  className: '',
};
