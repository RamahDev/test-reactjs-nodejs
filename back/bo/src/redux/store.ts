import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { combinedReducer } from './ducks';

const store = createStore(combinedReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

export { store };
