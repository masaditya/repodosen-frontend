import React from "react";
import { Switch, Route } from "react-router-dom";
import { LoginPages } from "../login/LoginPages";

export const Auth = () => {
  return (
    <div>
      <Switch>
        <Route path="/login" component={LoginPages} />
        <Route path="/register" component />
      </Switch>
    </div>
  );
};
