import React from 'react';

const ModalOverlay = props => {
  return (
    <div>
      <div>{props.children}</div>
    </div>
  );
};

export default ModalOverlay;
