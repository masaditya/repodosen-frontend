import React, { useState } from "react";
// import { RootContext } from "../../context/Context";
import { Login } from "../../context/actions/actions";

export const LoginPages = () => {
  // const context = useContext(RootContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    //
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

      <button type="submit">submit</button>
    </form>
  );
};
