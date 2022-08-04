import React from 'react';
import { Fragment } from 'react';
import ReactDom from 'react-dom';
import Backdrop from './components/Backdrop';
import ModalOverlay from './components/ModalOverlay';
import './styles.scss';

// semantically and from a clean HTML structure perspective having deeply nested modal isn't ideal
// an overlay to the entire page above everything else and can lead to :
// 1- problems with styling
// 2- and accesibility screen reader

const ModalWrapper = props => {
  const portalElement = document.getElementById('overlay');
  const { onClose } = props;
  return (
    <Fragment>
      {ReactDom.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </Fragment>
  );
};

export default ModalWrapper;
