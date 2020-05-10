export const initialState = {
  isAuthenticated: localStorage.getItem("token") !== null,
  isAdmin: false,
  token: localStorage.getItem("token"),
};