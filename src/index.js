import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BootstrapNavBar from './BootstrapNavBar';
import ProductWrapper from './ProductWrapper';


ReactDOM.render(
  <React.StrictMode>
    <BootstrapNavBar />
    <ProductWrapper />
  </React.StrictMode>,
  document.getElementById('root')
);
