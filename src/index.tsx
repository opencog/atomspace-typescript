import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Flow from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Flow />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// import * as React from "react";
// import { render } from "react-dom";
//
// import Flow from "./App";
//
//
// const rootElement = document.getElementById("root");
// render(
//     <Flow />, rootElement
// );
