import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/css/index.css';

const Root = () => {
  return <App />;
};

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
