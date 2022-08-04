import * as React from 'react';
import * as PropTypes from 'prop-types';

import { Button } from './Button';
import { Close } from './icons/Close';
import { mergeClassNames } from '../../common/utils/ClassNameMerge';

export const Modal = (props) => {
  const { children, title, onClose, actions, open, className, isContentText, style } = props;

  return open ? (
    <div
      className="w-screen h-screen bg-gray-50 absolute right-0 top-0 z-50 flex items-center justify-center transition duration-500 ease-out"
      style={{ backgroundColor: 'rgba(0,0,0, 0.3)' }}
    >
      <div
        className={mergeClassNames(' bg-white rounded-lg shadow-sm', className)}
        style={{ minWidth: '45%', maxWidth: '55%', ...style }}
      >
        {/* Header */}
        <div className="px-4 py-2 flex justify-center items-center  text-black rounded-t-lg font-medium">
          <p className="text-center flex-1">{title}</p>
          <Button variant="icon" onClick={onClose} className="mr-2">
            <Close className="w-4" />
          </Button>
        </div>

        {/* Séparator */}
        <div className="border-b  mr-2 ml-2" />

        {/* Content */}
        <div
          className={`px-32 py-4 overflow-y-auto ${isContentText ? 'flex justify-center' : ''}`}
          style={{ maxHeight: '85vh' }}
        >
          {children}
        </div>

        {/* Action Button */}
        <div>{actions}</div>
      </div>
    </div>
  ) : (
    <></>
  );
};

Modal.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType, PropTypes.element])
    .isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  actions: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType]),
  className: PropTypes.string,
  isContentText: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
};

Modal.defaultProps = {
  open: false,
  actions: null,
  className: '',
  isContentText: false,
  style: {},
};
