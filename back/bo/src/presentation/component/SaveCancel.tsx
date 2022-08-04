import * as React from 'react';
import * as PropTypes from 'prop-types';

import { Button } from './Button';
import { mergeClassNames } from '../../common/utils/ClassNameMerge';

export const SaveCancel = (props) => {
  const { cancelLabel, saveLabel, onCancelClick, onSaveClick, loading, className } = props;

  return (
    <div className={mergeClassNames('flex justify-end w-full mt-20', className)}>
      <Button variant="secondary" onClick={onCancelClick} loading={loading}>
        {cancelLabel}
      </Button>
      <Button
        form="submit-form"
        variant="primary"
        type="submit"
        className="ml-4"
        onClick={onSaveClick}
        loading={loading}
      >
        {saveLabel}
      </Button>
    </div>
  );
};

SaveCancel.propTypes = {
  className: PropTypes.string,
  cancelLabel: PropTypes.string,
  saveLabel: PropTypes.string,
  onCancelClick: PropTypes.func,
  onSaveClick: PropTypes.func,
  loading: PropTypes.bool,
};

SaveCancel.defaultProps = {
  className: '',
  cancelLabel: 'Annuler',
  saveLabel: 'Valider',
  onCancelClick: () => { },
  onSaveClick: () => { },
  loading: false,
};
