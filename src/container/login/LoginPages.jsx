import React, { useContext } from "react";
import login_illustraion from "../../assets/undraw_authentication_fsn5.svg";
import { Route, Switch, Redirect } from "react-router-dom";
import { LoginForm } from "../auth/login/login";
import { RegisterForm } from "../auth/register/register";
import { RootContext } from "../../context/Context";

export const LoginPages = () => {
  const { state } = useContext(RootContext);

  return (
    <div className="login-screen">
      <div className="illustration-container">
        <img className="login-illustration" src={login_illustraion} alt="" />
      </div>
      <div className="login-container">
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          {!state.isAuthenticated && (
            <Route
              path="/"
              exac
              render={(props) => <Redirect {...props} to="/login" />}
            />
          )}
        </Switch>
      </div>
    </div>
  );
};
