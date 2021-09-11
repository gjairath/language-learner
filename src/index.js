// Index.js

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import './styles/index.css';
import './styles/navbar.css'; 
import './styles/overview.css'; 

import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);