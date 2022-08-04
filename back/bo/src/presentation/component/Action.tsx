import * as React from 'react';
import * as PropTypes from 'prop-types';

import deleteIcon from '../../assets/img/delete_icon.svg';
import { Button } from './Button';
import { ReactComponent as EditIcon } from '../../assets/img/edit_icon.svg';

export const ActionBtn = (props) => {
  const { handleCreateUpdate, original, handleDeleteConfirmation } = props;
  return (
    <span className="flex">
      <Button
        variant="icon"
        className="my-0 mr-6"
        onClick={handleCreateUpdate(original)}
        tooltip="Modifier"
      >
        <EditIcon />
      </Button>
      <Button
        variant="icon"
        className="my-0"
        onClick={handleDeleteConfirmation(original)}
        tooltip="Supprimer"
      >
        <img src={deleteIcon} alt="Suppression" />
      </Button>
    </span>
  );
};

ActionBtn.propTypes = {
  original: PropTypes.shape({}),
  handleCreateUpdate: PropTypes.func,
  handleDeleteConfirmation: PropTypes.func,
};

ActionBtn.defaultProps = {
  original: {},
  handleCreateUpdate: () => null,
  handleDeleteConfirmation: () => null,
};
