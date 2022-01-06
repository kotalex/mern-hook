import Api from "../../../utils/api";
import Token from "../../../utils/token";
import AuthActionTypes from "../types/auth";

/**
 * Dispatch user to store from JWT token.
 *
 * @param {string} token
 * @param {function} dispatch
 */
export const storeUserDataFromToken = (token, dispatch) => {
  Token.setToken(token);

  Api.setAuthToken(token);

  dispatch({
    type: AuthActionTypes.SET_CURRENT_USER,
    payload: Token.getUserFromToken()
  });
};

/**
 * Check and authorize stored JWT token.
 *
 * @param {function} dispatch
 */
export const authorizeUser = dispatch => {
  return new Promise((resolve, reject) => {
    const token = Token.getToken();

    if (!token) {
      resolve(null);
    }

    if (Token.tokenExpired()) {
      logoutUser(dispatch);
      resolve(null);
    }

    Api.setAuthToken(token);

    Api.request("auth.user", null, null, true)
      .then(() => {
        storeUserDataFromToken(token, dispatch);
        resolve(true);
      })
      .catch(() => resolve(false));
  });
};

export const userHasRole = roles => {
  if (!roles || !roles.length) return true;
  const user = Token.getUserFromToken();
  if (!user) return false;

  if (Array.isArray(roles)) {
    return roles.indexOf(user.role) > -1;
  } else {
    return roles === user.role;
  }
};

/**
 * Remove user data from store.
 *
 * @param {function} dispatch
 */
export const logoutUser = dispatch => {
  Token.removeToken();

  dispatch({
    type: AuthActionTypes.LOGOUT_USER,
    payload: null
  });
};
