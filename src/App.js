import React, { useContext } from "react";
import "./App.css";
import { RootContext } from "./context/Context";
import { LoginPages } from "./container/login/LoginPages";
import { MainContainer } from "./container";
import { ToastContainer } from "react-toastify";

export const App = () => {
  const { state } = useContext(RootContext);

  let main = <LoginPages />;
  if (state.isAuthenticated) {
    main = <MainContainer />;
  }
  return (
    <>
      {main}
      <ToastContainer />
    </>
  );
};

export default App;
