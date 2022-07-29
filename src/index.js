import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Routes from 'routes';

ReactDOM.render(
  <React.StrictMode>
    <style>@import url(&quot;http://fonts.cdnfonts.com/css/roboto&quot;)</style>
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
