import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

import { AutoComplete } from './AutoComplete';

export const ControlledAutoComplete = (props) => {
  const {
    name,
    control,
    errors,
    options,
    valueKey,
    label,
    rules,
    onInputChange,
    defaultValue,
    required,
    className,
  } = props;

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ onChange, value }) => (
        <AutoComplete
          className={className}
          name={name}
          errors={errors}
          onInputValueChange={(e) => {
            const { type, inputValue } = e;

            if (type === '__input_change__') {
              onChange(null);
              onInputChange(inputValue);
            }
          }}
          value={value}
          valueKey={valueKey}
          options={options}
          label={label}
          required={required}
          onSelectedChange={(e) => onChange(e.selectedItem)}
          {...(defaultValue ? { defaultValue } : {})}
        />
      )}
    />
  );
};

ControlledAutoComplete.propTypes = {
  name: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.any.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.any.isRequired,
  options: PropTypes.arrayOf(PropTypes.any).isRequired,
  valueKey: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  rules: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  defaultValue: PropTypes.any,
  label: PropTypes.string,
  onInputChange: PropTypes.func,
  required: PropTypes.bool,
  className: PropTypes.string,
};

ControlledAutoComplete.defaultProps = {
  label: '',
  rules: null,
  onInputChange: () => {},
  defaultValue: null,
  required: false,
  className: '',
};
