import React, { useState, useContext } from "react";
import { RootContext } from "../../context/Context";
import { Login } from "../../context/actions/actions";
import { toast } from "react-toastify";
import { LOGIN_SUCCESS } from "../../context/actionTypes";

export const LoginPages = () => {
  const { dispatch } = useContext(RootContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    //

    const result = await Login(username, password);
    // console.log(result);
    if (result.type === LOGIN_SUCCESS) {
      toast.success("Hello, Welcome back !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(result);
    } else {
      toast.error("Invalid Credentials", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
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
