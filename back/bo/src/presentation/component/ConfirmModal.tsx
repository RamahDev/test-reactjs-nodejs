import * as React from 'react';
import * as PropTypes from 'prop-types';

import { Modal } from './Modal';
import { SaveCancel } from './SaveCancel';

export const ConfirmModal = (props) => {
  const { title, children, onClose, loading, open } = props;

  return (
    <Modal
      open={open}
      title={title}
      onClose={onClose}
      actions={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <SaveCancel
          className="px-4"
          onCancelClick={() => onClose()}
          onSaveClick={() => onClose(true)}
          loading={loading}
        />
      }
      style={{ minWidth: '25%' }}
      isContentText
    >
      <span className="text-center">{children}</span>
    </Modal>
  );
};

ConfirmModal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType, PropTypes.element])
    .isRequired,
  onClose: PropTypes.func,
  loading: PropTypes.bool,
  open: PropTypes.bool,
};

ConfirmModal.defaultProps = {
  title: 'Confirmation',
  loading: false,
  open: false,
  onClose: () => {},
};
