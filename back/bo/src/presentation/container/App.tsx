import * as React from 'react';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { useSelector } from 'react-redux';

import { Auth } from './auth/Auth';
import { Home } from './protected/Home';
import { PasswordReset } from './auth/PasswordReset';
import { ProtectedRoute } from '../component/ProtectedRoute';

import { LocalStorageKeys } from '../../data/constants/LocalStorageKeys';
import { RootState } from '../../redux/ducks';

const App = () => {
  const accessToken = useSelector(({ auth }: RootState) => auth.credentials.accessToken);
  const credentials = JSON.parse(localStorage.getItem(LocalStorageKeys.credentials || 'null'));
  const tokenValue = (credentials && credentials.accessToken) || accessToken;
  const history = useHistory();
  const { pathname } = useLocation();

  React.useEffect(() => {
    if (tokenValue && !pathname.includes('/app')) {
      history.replace('/app');
    }
  });

  return (
    <Switch>
      <Route path="/auth" component={Auth} />

      <Route path="/reset-password">
        <PasswordReset />
      </Route>

      <ProtectedRoute path="/app">
        <Home />
      </ProtectedRoute>

      <Route path="*">
        <Redirect to="/auth" />
      </Route>
    </Switch>
  );
};

declare let module: Record<string, unknown>;

export default hot(module)(App);
