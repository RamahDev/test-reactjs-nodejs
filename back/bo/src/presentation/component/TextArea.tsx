import * as React from 'react';
import * as PropTypes from 'prop-types';

import { mergeClassNames } from '../../common/utils/ClassNameMerge';

export const TextArea = (props) => {
  const {
    label,
    className,
    inputRef,
    errors,
    name,
    value,
    onChange,
    required,
    rows,
    disabled,
    ...otherProps
  } = props;

  return (
    <div className="flex flex-col mt-2">
      <span className="flex text-sm">
        {label}
        {required ? <p className="text-xs text-pink-500">*</p> : ''}
      </span>
      <textarea
        name={name}
        {...(inputRef ? { ref: inputRef } : { value, onChange })}
        disabled={disabled}
        rows={rows}
        {...otherProps}
        className={mergeClassNames(
          `rounded-xl focus:ring-2 focus:border-transparent p-1 ${
            disabled ? 'bg-gray-200 cursor-not-allowed' : ''
          } ${
            errors && errors[name]
              ? 'border-red-600 focus:ring-red-600'
              : 'border-gray-300 focus:ring-green-900'
          }`,
          className,
        )}
      />
      {errors?.[name] ? <p className="text-red-600 text-xs">{errors?.[name]?.message}</p> : ''}
    </div>
  );
};

TextArea.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  inputRef: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.any,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string]),
  onChange: PropTypes.func,
  required: PropTypes.bool,
  rows: PropTypes.number,
  maxLength: PropTypes.number,
  disabled: PropTypes.bool,
};

TextArea.defaultProps = {
  label: '',
  placeholder: '',
  inputRef: null,
  errors: null,
  className: '',
  value: '',
  required: false,
  onChange: () => {},
  rows: 10,
  maxLength: 700,
  disabled: false,
};
