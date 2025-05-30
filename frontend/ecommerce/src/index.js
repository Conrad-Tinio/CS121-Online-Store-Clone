import React from 'react';
import ReactDOM from 'react-dom/client';
import './fonts/VarelaRound-Regular.ttf';
import './index.css';
import './bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import { Provider } from 'react-redux'
import '@fortawesome/fontawesome-svg-core/styles.css';
// Import our API configuration
import './api';

const root= ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App/>
  </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
