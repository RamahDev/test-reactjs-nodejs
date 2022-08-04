import * as React from 'react';
import * as PropTypes from 'prop-types';

export const Image = (
  { value },
// eslint-disable-next-line jsx-a11y/alt-text
) => <div><img height={50} width={50} src={value} /></div>;

Image.propTypes = {
  value: PropTypes.string,
};

Image.defaultProps = {
  value: '',
};
