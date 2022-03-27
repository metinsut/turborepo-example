import '__mocks__';
import 'utils/i18n';
import * as serviceWorker from './serviceWorker';
import App from './App';
import ReactDOM from 'react-dom';
import Redirecting from 'views/Auth/Redirecting';
import React from 'react';

ReactDOM.render(
  <React.Suspense fallback={<Redirecting />}>
    <App />
  </React.Suspense>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
