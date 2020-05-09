export const initialState = {
  isAuthenticated: localStorage.getItem("token") !== null,
  isAdmin: true,
  user: null,
  token: localStorage.getItem("token"),
};