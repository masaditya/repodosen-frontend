import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { RootProvider } from "./context/Context";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <RootProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RootProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
