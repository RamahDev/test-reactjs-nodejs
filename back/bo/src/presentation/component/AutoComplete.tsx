import * as React from 'react';
import * as PropTypes from 'prop-types';
import { useCombobox } from 'downshift';
import { mergeClassNames } from '../../common/utils/ClassNameMerge';
import { ChevronDown } from './icons/ChevronDown';

export const AutoComplete = (props) => {
  const {
    label,
    className,
    errors,
    name,
    defaultValue,
    onInputValueChange,
    options,
    onSelectedChange,
    valueKey,
    required,
    placeholder,
  } = props;
  const {
    isOpen,
    closeMenu,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    selectItem,
    selectedItem,
    openMenu,
  } = useCombobox({
    onInputValueChange,
    items: options,
    itemToString: (option) => option?.[valueKey],
    onSelectedItemChange: (e) => {
      closeMenu();
      onSelectedChange(e);
    },
  });

  React.useEffect(() => {
    if (defaultValue && !selectedItem) {
      selectItem(defaultValue);
    }
  }, [defaultValue]);

  return (
    <div className={mergeClassNames('mt-2 relative', className)}>
      {label ? (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label {...getLabelProps()} className="text-sm flex">
          {label}
          {required ? <p className="text-xs text-pink-500">*</p> : ''}
        </label>
      ) : (
        ''
      )}
      <div {...getComboboxProps()} className="w-full flex relative">
        <input
          type="text"
          {...getInputProps({ placeholder, onFocus: openMenu })}
          className={mergeClassNames(
            `w-full px-2 rounded-2xl focus:ring-2 focus:border-transparent p-1 ${
              errors?.[name]
                ? 'border-red-600 focus:ring-red-600'
                : 'border-gray-300 focus:ring-green-900'
            }`,
            className,
          )}
        />
        <button
          type="button"
          {...getToggleButtonProps()}
          aria-label="toggle menu"
          className="absolute right-0 mt-2 mr-2"
        >
          <ChevronDown className="w-4" />
        </button>
      </div>
      {errors?.[name] ? <p className="text-xs text-red-600">{errors?.[name]?.message}</p> : ''}
      <ul
        {...getMenuProps()}
        className={`overflow-y-auto absolute w-full pr-2 pl-4 z-40 bg-white ${
          isOpen ? 'max-h-48' : ''
        } `}
      >
        {/* eslint-disable-next-line operator-linebreak */}
        {isOpen &&
          options.map((item, index) => (
            <li
              style={highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}}
              key={item.id}
              {...getItemProps({ item, index })}
            >
              {item[valueKey]}
            </li>
          ))}
      </ul>
    </div>
  );
};

AutoComplete.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  label: PropTypes.string,
  className: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  inputRef: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.any,
  onChange: PropTypes.func,
  valueKey: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onInputValueChange: PropTypes.func,
  setValue: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  defaultValue: PropTypes.any,
  onSelectedChange: PropTypes.func,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
};

AutoComplete.defaultProps = {
  label: '',
  className: '',
  value: '',
  inputRef: null,
  errors: null,
  required: false,
  onChange: () => {},
  onInputValueChange: () => {},
  setValue: () => {},
  onSelectedChange: () => {},
  defaultValue: null,
  placeholder: '',
};
