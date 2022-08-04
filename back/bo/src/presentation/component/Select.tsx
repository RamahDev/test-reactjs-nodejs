import * as React from 'react';
import * as PropTypes from 'prop-types';
import { mergeClassNames } from '../../common/utils/ClassNameMerge';

export const Select = (props) => {
  const {
    name,
    inputRef,
    label,
    errors,
    value,
    className,
    onChange,
    valueKey,
    idKey,
    options,
    required,
    containerClassName,
    placeholder,
  } = props;

  return (
    <div className={mergeClassNames('flex flex-col mt-2', containerClassName)}>
      <span className="flex text-sm">
        {label}
        {required ? <p className="text-xs text-pink-500">*</p> : ''}
      </span>
      <select
        placeholder={placeholder}
        name={name}
        {...(inputRef ? { ref: inputRef } : { value, onChange })}
        className={mergeClassNames(
          'rounded-2xl border-gray-300 focus:ring-2 focus:ring-green-900 focus:border-transparent py-1 pl-2 pr-8',
          className,
        )}
      >
        {(options || []).map(
          // eslint-disable-next-line no-confusing-arrow
          (option) =>
            typeof option === 'object' ? (
              <option key={option[idKey]} value={option[idKey]}>
                {option[valueKey]}
              </option>
            ) : (
              <option key={option} value={option}>
                {option}
              </option>
            ),
          // eslint-disable-next-line function-paren-newline
        )}
      </select>
      {errors?.[name] ? <p className="text-red-600 text-xs">{errors?.[name]?.message}</p> : ''}
    </div>
  );
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  inputRef: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.any,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
  valueKey: PropTypes.string,
  idKey: PropTypes.string,
  required: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),
  ).isRequired,
  containerClassName: PropTypes.string,
  placeholder: PropTypes.string,
};

Select.defaultProps = {
  label: '',
  value: '',
  className: '',
  onChange: () => {},
  valueKey: null,
  idKey: 'id',
  errors: null,
  inputRef: null,
  required: false,
  containerClassName: '',
  placeholder: '',
};
