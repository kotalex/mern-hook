import { combineReducers } from "redux";

import authReducer from "./../modules/auth/reducers/auth";
import adminUsersReducer from "./../modules/admin/users/reducers/users";

export default combineReducers({
  auth: authReducer,
  adminUsers: adminUsersReducer
});
