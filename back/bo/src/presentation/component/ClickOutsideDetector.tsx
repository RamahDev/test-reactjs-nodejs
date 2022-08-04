import * as React from 'react';
import * as PropTypes from 'prop-types';

export const ClickOutsideDetector = (props) => {
  const { children, onClickOutside, className, role, ...otherProps } = props;
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current?.contains(e.target)) {
        return;
      }

      onClickOutside();
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref]);

  return (
    <div ref={ref} className={className} role={role} {...otherProps}>
      {children}
    </div>
  );
};

ClickOutsideDetector.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.elementType,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  onClickOutside: PropTypes.func,
  className: PropTypes.string,
  role: PropTypes.string,
};

ClickOutsideDetector.defaultProps = {
  children: '',
  className: '',
  role: '',
  onClickOutside: () => {},
};
