import AuthActionTypes from "../types/auth";

const initialState = {
  user: null,
  isAuthenticated: false,
  resetTokenChecked: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AuthActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload
      };

    case AuthActionTypes.PASSWORD_RESET_TOKEN_CHECKED:
      return {
        ...state,
        resetTokenChecked: true
      };

    case AuthActionTypes.LOGOUT_USER:
      return initialState;

    default:
      return state;
  }
}
