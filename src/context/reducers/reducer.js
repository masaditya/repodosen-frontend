import {
  LOGIN_SUCCESS
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
          user: action.payload.user,
          token: action.payload.token,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
          user: null,
      };
    default:
      return state;
  }
};