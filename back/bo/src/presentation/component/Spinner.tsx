import * as React from 'react';
import * as PropTypes from 'prop-types';

import { mergeClassNames } from '../../common/utils/ClassNameMerge';

export const Spinner = (props) => {
  const { className } = props;
  return (
    <div
      className={mergeClassNames(
        'rounded-2xl border border-white w-6 h-6 border-t-2 animate-spin',
        className,
      )}
    />
  );
};

Spinner.propTypes = {
  className: PropTypes.string,
};

Spinner.defaultProps = {
  className: '',
};
