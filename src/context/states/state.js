export const initialState = {
  isAuthenticated: false,
  isAdmin: true,
  user: null,
  token: localStorage.getItem("token"),
};
