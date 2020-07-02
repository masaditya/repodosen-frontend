import {
  LOGIN_SUCCESS,
  LOGOUT_START,

} from "../actionTypes";
import {
  initialState
} from "../states/state";

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
          isAdmin: action.payload.isAdmin,
          token: action.payload.token,
          username: action.payload.username
      };
    case LOGOUT_START:
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
          token: null,
          isAdmin: false
      };

    case "SET_DOSEN":
      return {
        ...state,
        dosen: action.payload.dosen
      }
      default:
        return state;
  }
};