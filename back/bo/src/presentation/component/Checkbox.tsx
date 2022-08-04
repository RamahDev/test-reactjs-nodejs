import * as React from 'react';
import * as PropTypes from 'prop-types';
import { mergeClassNames } from '../../common/utils/ClassNameMerge';

export const Checkbox = (props) => {
  const { inputRef, name, label, className, checked, onChange } = props;

  return (
    <>
      <div className="flex items-center mt-2 ">
        <p className="text-sm ">
          {label}
          {' '}
&nbsp;&nbsp;&nbsp;
        </p>
        <input
          onChange={onChange}
          name={name}
          type="checkbox"
          ref={inputRef}
          checked={checked}
          className={mergeClassNames(
            'focus:border-transparent rounded text-green-900 focus:bg-transparent',
            className,
          )}
        />
      </div>
      <div className="flex items-center mt-2 " />
    </>
  );
};

Checkbox.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  inputRef: PropTypes.any,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

Checkbox.defaultProps = {
  inputRef: null,
  label: '',
  className: '',
  checked: false,
  onChange: () => {},
};
