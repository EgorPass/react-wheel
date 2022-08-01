import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from "./redux/store"
import App from "./App.jsx"
import domForWheel from "./domForWheel.json"
import './wheel.css';
import reportWebVitals from './reportWebVitals';

  ReactDOM.render((
    <Provider store = {store}>
      <App domForWheel = {domForWheel} />
    </Provider>
  ), document.getElementById("root")  );

reportWebVitals();



