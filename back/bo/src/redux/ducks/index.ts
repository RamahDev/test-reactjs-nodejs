import { combineReducers } from 'redux';

import { authReducer as auth, AuthState } from './auth';
import { appReducer as app } from './app';
import { sidebarReducer as sidebar } from './sidebar';

export type RootState = {
  auth: AuthState;
};

export const combinedReducer = combineReducers({
  auth,
  app,
  sidebar,
});
