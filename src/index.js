import React from 'react';
import ReactDOM from 'react-dom';
import LogRocket from 'logrocket';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import './firebase';
import './assets/style/scss/custom.scss';
import AuthenticationProvider from './AuthenticationProvider';

if (process.env.REACT_APP_FIREBASE_ENV === 'prod') {
  LogRocket.init('eenski/votacidades');
}

ReactDOM.render(
  <>
    <Router>
      <AuthenticationProvider>
        <App />
      </AuthenticationProvider>
    </Router>
  </>,
  document.getElementById('root'),
);
