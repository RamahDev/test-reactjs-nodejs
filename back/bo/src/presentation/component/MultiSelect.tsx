/* eslint-disable react/forbid-prop-types */
import * as React from 'react';
import * as PropTypes from 'prop-types';
import Select from 'react-select';
import { Controller } from 'react-hook-form';

export const MultiSelect = (props) => {
  const {
    name,
    control,
    options,
    isMulti,
    placeholder,
    defaultValue,
    rules,
    errors,
    label,
    required,
  } = props;

  return (
    <div>
      {label ? (
        <span className="text-sm flex">
          {label}
          {required ? <p className="text-xs text-pink-500">*</p> : ''}
        </span>
      ) : (
        ''
      )}
      <Controller
        name={name}
        as={Select}
        options={options}
        isMulti={isMulti}
        control={control}
        rules={rules}
        placeholder={placeholder}
        defaultValue={defaultValue}
        theme={(theme) => ({
          ...theme,
          borderRadius: '50px',
          colors: {
            ...theme.colors,
            primary: 'rgb(209, 213, 219)',
          },
        })}
        styles={{
          menu: (provided) => ({
            ...provided,
            borderRadius: '5px',
          }),
          multiValue: (provided) => ({
            ...provided,
            backgroundColor: '#F0F4F8',
            borderRadius: '30px',
          }),
          control: (provided, state) => ({
            ...provided,
            // eslint-disable-next-line no-nested-ternary
            boxShadow: state.isFocused
              ? errors?.[name]
                ? '0 0 0 2px #F00'
                : '0 0 0 2px #1D5C42'
              : 'none',
          }),
          input: (provided) => ({
            ...provided,
            border: 'Opx',
            boxShadow: '0',
          }),
        }}
      />
      {errors?.[name] ? <p className="text-xs text-red-600">{errors?.[name]?.message}</p> : ''}
    </div>
  );
};

MultiSelect.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ).isRequired,
  isMulti: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.any.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  defaultValue: PropTypes.any,
  rules: PropTypes.any,
  errors: PropTypes.any,
  label: PropTypes.string,
  required: PropTypes.bool,
};

MultiSelect.defaultProps = {
  isMulti: false,
  placeholder: '',
  defaultValue: [],
  rules: null,
  errors: null,
  label: '',
  required: false,
};
