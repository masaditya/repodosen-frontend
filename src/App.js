import React, { useContext } from "react";
import "./App.css";
import { RootContext } from "./context/Context";
import { LoginPages } from "./container/login/LoginPages";
import { MainContainer } from "./container";

export const App = () => {
  const { state } = useContext(RootContext);

  let main = <LoginPages />;
  if (!state.isAuthenticated) {
    main = <MainContainer />;
  }
  return main;
};

export default App;
