import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import View from './views';

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <View />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
