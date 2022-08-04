import * as React from 'react';
import * as PropTypes from 'prop-types';

import { mergeClassNames } from '../../common/utils/ClassNameMerge';
import { Button } from './Button';

export const Input = (props) => {
  const {
    type,
    label,
    className,
    fileClassName,
    inputRef,
    errors,
    name,
    value,
    onChange,
    autoFocus,
    fileLabel,
    onFileChange,
    multiple,
    fileExtensions,
    filesUrl,
    onEnterPress,
    onKeyPress,
    required,
    rightIcon: RightIcon,
    onRightIconClick,
    disabled,
    readOnly,
    ...otherProps
  } = props;
  const [imageSources, setImageSources] = React.useState(filesUrl);
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onEnterPress();
    } else {
      onKeyPress(e);
    }
  };

  return type === 'file' ? (
    <div className={mergeClassNames('mt-2', fileClassName)}>
      <Button type="button" className="relative text-green-900 text-xs" variant="secondary">
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        <span className="flex">
          {fileLabel}
          {required ? <p className="text-xs text-pink-500">*</p> : ''}
        </span>
        <input
          name={name}
          type="file"
          ref={inputRef}
          className="absolute cursor-pointer opacity-0 h-full w-full right-0 top-0"
          multiple={multiple}
          disabled={disabled}
          onChange={(e) => {
            const files = Array.from(e.target.files);
            // console.log(files);
            setImageSources(files.map((file) => URL.createObjectURL(file)));
            onFileChange(files);
          }}
          {...(Array.isArray(fileExtensions) && fileExtensions.length
            ? { accept: fileExtensions.map((extension) => `.${extension}`).join(',') }
            : {})}
        />
      </Button>
      {errors && errors[name] ? <p className="text-red-600 text-xs">{errors[name].message}</p> : ''}
      <div className="flex flex-wrap">
        {Array.isArray(imageSources)
          ? imageSources.map((imageSource) => (
            // eslint-disable-next-line react/jsx-indent
            <img
              key={imageSource}
              alt="aperçu"
              src={imageSource}
              className="w-24 h-24 rounded shadow object-cover"
            />
            // eslint-disable-next-line indent
          ))
          : ''}
      </div>
    </div>
  ) : (
    <div className="flex flex-col inLayout">
      <span className="flex text-sm mb-2">
        {label}
        {required ? <span className="text-xs text-pink-500">*</span> : ''}
      </span>
      <div className="relative w-full">
        <input
          type={type}
          name={name}
          ref={inputRef}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={autoFocus}
          onKeyPress={handleKeyPress}
          disabled={disabled}
          readOnly={readOnly ? 'readOnly' : ''}
          {...(inputRef ? {} : { value, onChange })}
          {...otherProps}
          {...(type === 'number'
            ? { onKeyDown: (e) => (e.key === 'e' || e.key === '-') && e.preventDefault() }
            : {})}
          className={mergeClassNames(
            `rounded-input custom-input focus:ring-2 focus:border-transparent p-1 px-2 w-full ${disabled || readOnly ? 'bg-gray-200 cursor-not-allowed' : ''
            }  ${errors && errors[name]
              ? 'border-red-600 focus:ring-red-600'
              : 'border-gray-300 focus:ring-green-900'
            }`,
            className,
          )}
        />
        {RightIcon ? (
          <Button
            variant="icon"
            className="my-0 absolute right-0 mr-2 mt-1 custom-submit"
            onClick={onRightIconClick}
          >
            <RightIcon />
          </Button>
        ) : (
          ''
        )}
      </div>
      {errors && errors[name] ? <p className="text-red-600 text-xs">{errors[name].message}</p> : ''}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  inputRef: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.any,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  autoFocus: PropTypes.bool,
  fileExtensions: PropTypes.arrayOf(PropTypes.string),
  multiple: PropTypes.bool,
  onFileChange: PropTypes.func,
  fileLabel: PropTypes.string,
  filesUrl: PropTypes.arrayOf(PropTypes.string),
  onEnterPress: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyPress: PropTypes.func,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  rightIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType]),
  onRightIconClick: PropTypes.func,
  maxLength: PropTypes.number,
  fileClassName: PropTypes.string,
};

Input.defaultProps = {
  label: '',
  type: 'text',
  placeholder: '',
  inputRef: null,
  errors: null,
  className: '',
  value: '',
  onChange: () => { },
  autoFocus: false,
  fileExtensions: ['png', 'jpeg', 'jpg', 'svg'],
  multiple: false,
  onFileChange: () => { },
  fileLabel: 'Charger un fichier image',
  filesUrl: null,
  onEnterPress: () => { },
  onBlur: () => { },
  onKeyPress: () => { },
  required: false,
  disabled: false,
  readOnly: false,
  rightIcon: null,
  onRightIconClick: () => { },
  maxLength: 10000,
  fileClassName: '',
};
