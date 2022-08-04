import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import SnackbarProvider from 'react-simple-snackbar';
import 'react-awesome-lightbox/build/style.css';

import App from './presentation/container/App';
import { store } from './redux/store';
import '../tailwind.out.css';
import './index.css';

const rootEl = document.getElementById('root');

render(
  <Provider store={store}>
    <SnackbarProvider>
      <Router>
        <App />
      </Router>
    </SnackbarProvider>
  </Provider>,
  rootEl,
);
