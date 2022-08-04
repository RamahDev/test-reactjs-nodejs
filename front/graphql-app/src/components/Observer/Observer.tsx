import React from "react";
import "./Observer.scss";

const Observer = React.forwardRef<any, any>((props, ref) => {
  return <div className="Observer" ref={ref}></div>;
});

export default Observer;
