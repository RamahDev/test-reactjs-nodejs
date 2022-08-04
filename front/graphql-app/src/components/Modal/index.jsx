import React from 'react';
import PropTypes from 'prop-types';

import ModalWrapper from '../ModalWrapper';
import './styles.scss';

// import crossIcon from '../../assets/images/picto/cross.svg';

const crossIcon = ""

const Modal = props => {
  return [
    props.open && (
      <ModalWrapper key={Math.random().toString(16).substring(2)}>
        <div className={`${props.className} modal__block `}>
          <div className="modal__content">
            <div className="modal__header">
              {props.title}
              {props.closable && (
                <button
                  type="button"
                  className="close"
                  onClick={props.closeModal}
                  onClose={props.closeModal}
                >
                  <img src={crossIcon} width="17" height="17" alt="close modal" />
                </button>
              )}
            </div>
            <div className="modal__body">{props.content ? props.content : props.children}</div>
            {props.footerContent && <div className="modal__footer">{props.footerContent}</div>}
          </div>
        </div>
      </ModalWrapper>
    ),
  ];
};

Modal.defaultProps = {
  // modal is closable by default
  closable: false,
  open: true, // true by default to avoid unexpected behaviour with existing code
  closeModal: () => null,
  className: '',
};

Modal.propTypes = {
  // title of the modal
  title: PropTypes.string.isRequired,
  // content of the modal
  content: PropTypes.object, //eslint-disable-line
  // boolean to make modal closable with js
  closable: PropTypes.bool,
  // Is the modal open or not ?
  open: PropTypes.bool,
  // use children instead of content
  children: PropTypes.node,
  // function to close modal inside the view
  // required only if you want your modal to be open
  closeModal: PropTypes.func,
  className: PropTypes.string,
  footerContent: PropTypes.object,
};

export default Modal;
