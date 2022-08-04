import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { LocalStorageKeys } from '../../data/constants/LocalStorageKeys';
import { RootState } from '../../redux/ducks';

export const ProtectedRoute = ({ children, ...rest }) => {
  const accessToken = useSelector(({ auth }: RootState) => auth.credentials.accessToken);
  const credentials = JSON.parse(localStorage.getItem(LocalStorageKeys.credentials || 'null'));
  const tokenValue = (credentials && credentials.accessToken) || accessToken;
  // const history = useHistory();
  // const { updateCredentials } = useAuth();

  // React.useEffect(() => {
  //   if (tokenValue) {
  //     console.log(tokenValue);
  //     history.replace('/app');
  //   }
  // });
  // console.log(useLocation());

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (tokenValue) {
          return children;
        }
        return <Redirect to={{ pathname: '/auth', state: { from: location } }} />;
      }}
    />
  );
};

ProtectedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};
