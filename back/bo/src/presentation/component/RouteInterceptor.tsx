import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

export const RouterInterceptor = ({ redirectTo, ...props }) => (
  <Route {...props} render={() => <Redirect to={redirectTo} />} />
);

RouterInterceptor.propTypes = {
  redirectTo: PropTypes.string.isRequired,
};
