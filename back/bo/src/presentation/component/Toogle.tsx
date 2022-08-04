/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import '../../assets/css/toogle.css';

function Toggle(props) {
  const {
    size = "default",
    checked,
    disabled,
    onChange,
    offstyle = "btn-danger",
    onstyle = "btn-success",
  } = props;

  const displayStyle = checked ? onstyle : offstyle;
  return (
    <>
      <label>
        <span className={`${size} switch-wrapper`}>
          <input
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={(e) => onChange(e)}
          />
          <span className={`${displayStyle} switch`}>
            <span className="switch-handle" />
          </span>
        </span>
        {/* <span className="switch-label">{text}</span> */}
      </label>
    </>
  );
}

export default Toggle;
