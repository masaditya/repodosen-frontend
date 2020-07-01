import jwt from "jsonwebtoken";

const getPayload = (token) => {
  let result = false;
  if (token != null) {
    const w = jwt.verify(token, process.env.REACT_APP_JWTSECRET);
    result = w.role === "admin";
  }
  return result;
};

export const getUsername = (token) => {
  let result = "";
  if (token != null) {
    const w = jwt.verify(token, process.env.REACT_APP_JWTSECRET);
    result = w.username
  }
  return result;
};

export const initialState = {
  isAuthenticated: localStorage.getItem("token") !== null,
  isAdmin: getPayload(localStorage.getItem("token")),
  token: localStorage.getItem("token"),
  username: getUsername(localStorage.getItem("token")),
  dosen: []
};