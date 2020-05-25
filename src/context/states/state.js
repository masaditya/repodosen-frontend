import jwt from "jsonwebtoken";

const getPayload = async (token) => {
  if (token) {
    await jwt.verify(token, "({nD4$d0s})", (err, cdc) => {
      const { role } = cdc;
      const tmp = role === "admin";
      console.log(tmp);
      return tmp;
    });
  } else {
    return false;
  }
};

export const initialState = {
  isAuthenticated: localStorage.getItem("token") !== null,
  isAdmin: getPayload(localStorage.getItem("token")),
  token: localStorage.getItem("token"),
};
