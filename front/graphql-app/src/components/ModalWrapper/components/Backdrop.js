import React from 'react';

const Backdrop = props => {
  const { onClose } = props;
  return <div onClick={onClose} />;
};

export default Backdrop;
