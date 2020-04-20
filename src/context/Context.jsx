import React from "react";
import { createContext } from "react";
import { reducer } from "./reducers/reducer";
import { initialState } from "./states/state";

export const RootContext = createContext();

export const RootProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <RootContext.Provider value={{ state, dispatch }}>
      {children}
    </RootContext.Provider>
  );
};
