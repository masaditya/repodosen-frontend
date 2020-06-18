import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import { RootContext } from "./context/Context";
import { LoginPages } from "./container/login/LoginPages";
import { MainContainer } from "./container";
import { ToastContainer } from "react-toastify";

export const App = () => {
  const { state } = useContext(RootContext);

  const [main, setMain] = useState(<LoginPages />);

  useEffect(() => {
    if (state.isAuthenticated) {
      setMain(<MainContainer />);
    }
    return () => {
      setMain(<LoginPages />);
    };
  }, [state.isAuthenticated, state.isAdmin]);

  return (
    <>
      {main}
      <ToastContainer />
    </>
  );
};

export default App;
