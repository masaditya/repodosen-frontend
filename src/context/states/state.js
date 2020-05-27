import jwt from "jsonwebtoken";

const getPayload = (token) => {
  let result = false;
  if (token != null) {
    const w = jwt.verify(token, "({nD4$d0s})");
    result = w.role === "admin";
  }
  console.log(result);
  return result;
};

export const initialState = {
  isAuthenticated: localStorage.getItem("token") !== null,
  isAdmin: getPayload(localStorage.getItem("token")),
  token: localStorage.getItem("token"),
};
