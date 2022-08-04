import * as React from 'react';
import * as PropTypes from 'prop-types';

import { AutoComplete } from './AutoComplete';

export const UncontrolledAutoComplete = (props) => {
  const {
    className,
    name,
    // errors,
    options,
    valueKey,
    label,
    onInputChange,
    value,
    onSelectedChange,
    defaultValue,
    required,
    placeholder,
  } = props;

  return (
    <AutoComplete
      className={className}
      placeholder={placeholder}
      name={name}
      //   errors={errors}
      onInputValueChange={(e) => {
        const { type, inputValue } = e;

        if (type === '__input_change__') {
          onSelectedChange(null);
          onInputChange(inputValue);
        }
      }}
      value={value}
      valueKey={valueKey}
      options={options}
      label={label}
      required={required}
      onSelectedChange={(e) => onSelectedChange(e.selectedItem)}
      {...(defaultValue ? { defaultValue } : {})}
    />
  );
};

UncontrolledAutoComplete.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.any).isRequired,
  valueKey: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  defaultValue: PropTypes.any,
  label: PropTypes.string,
  onInputChange: PropTypes.func,
  required: PropTypes.bool,
  onSelectedChange: PropTypes.func,
  className: PropTypes.string,
};

UncontrolledAutoComplete.defaultProps = {
  placeholder: '',
  label: '',
  onInputChange: () => {},
  onSelectedChange: () => {},
  defaultValue: null,
  required: false,
  value: null,
  className: '',
};
