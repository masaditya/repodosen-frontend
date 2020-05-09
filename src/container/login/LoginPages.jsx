import React, { useState, useContext } from "react";
import { RootContext } from "../../context/Context";
import { Login } from "../../context/actions/actions";
import { ToastContainer, toast } from "react-toastify";

export const LoginPages = () => {
  const { dispatch } = useContext(RootContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    //
    toast.success("Hello, Welcome back !", {
      position: toast.POSITION.TOP_RIGHT,
    });

    const result = await Login(username, password);
    // const toHome = dispatch(result);
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        type="text"
        name="username"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        name="password"
      />
      <button type="submit">Login</button>
    </form>
  );
};
