import * as React from 'react';
import * as PropTypes from 'prop-types';
import { mergeClassNames } from '../../common/utils/ClassNameMerge';
import { ClickOutsideDetector } from './ClickOutsideDetector';
import { Spinner } from './Spinner';

const styles = {
  primary: 'text-white bg-blue-900 text-xs',
  secondary: 'text-green-400 bg-white text-xs hover:bg-gray-100',
  link: 'text-blue-900 underline bg-white text-xs',
  icon: 'px-0 py-0 my-0',
};

export const Button = (props) => {
  const {
    children,
    variant,
    className,
    menu,
    onClick,
    form,
    loading,
    disabled,
    tooltip,
    ...otherProps
  } = props;
  const [open, setOpen] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const handleClick = () => {
    if (menu) {
      setOpen((state) => !state);
    }
    onClick();
  };
  const baseClassName = mergeClassNames(
    `disabled:opacity-50 rounded-2xl font-bold relative ${variant !== 'icon' ? 'w-full px-4 py-2 custom-submit' : 'min-w-max max-h-min'
    }`,
    styles[variant],
  );

  return (
    <>
      {/* eslint-disable-next-line react/button-has-type */}
      <button
        className={mergeClassNames(baseClassName, className)}
        disabled={disabled || loading}
        {...(form ? { form } : {})}
        {...otherProps}
        onClick={handleClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {tooltip ? (
          <span
            className={
              hover
                ? 'flex absolute -top-5 mx-auto font-normal text-sm bg-gray-700 text-white rounded-lg px-2'
                : 'hidden'
            }
            style={{ left: '-50%' }}
          >
            {tooltip}
          </span>
        ) : null}
        <span className="flex items-center justify-center">
          {loading ? <Spinner className="mr-2 opci" /> : ''}
          {children}
          {menu && open && (
            <ClickOutsideDetector
              className="transition ease-in-out duration-700 origin-top-right absolute right-9 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu"
              onClickOutside={() => setOpen(false)}
            >
              {menu.map(({ label, onClick: onMenuClick }) => (
                // eslint-disable-next-line max-len
                // eslint-disable-next-line jsx-a11y/interactive-supports-focus, jsx-a11y/click-events-have-key-events, jsx-a11y/anchor-is-valid
                <a
                  key={label}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  onClick={() => {
                    if (onMenuClick) {
                      onMenuClick();
                    }
                  }}
                >
                  {label}
                </a>
              ))}
            </ClickOutsideDetector>
          )}
        </span>
      </button>
    </>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  form: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.elementType,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  variant: PropTypes.oneOf(['primary', 'secondary', 'link', 'icon']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  tooltip: PropTypes.string,
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      onClick: PropTypes.func,
    }),
  ),
};

Button.defaultProps = {
  form: '',
  className: '',
  loading: false,
  disabled: false,
  children: '',
  type: 'button',
  variant: 'primary',
  onClick: () => { },
  menu: null,
  tooltip: '',
};
