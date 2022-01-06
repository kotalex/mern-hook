import AdminUsersActionTypes from "./../types/users";
import InitTableState from "../../../../constants/init-table-state";

const schema = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: ""
};

const initialState = { ...InitTableState };
initialState.single = { ...schema };

export default function(state = initialState, action) {
  switch (action.type) {
    case AdminUsersActionTypes.SET_ADMIN_USERS_DATA:
      return {
        ...state,
        data: action.payload.items,
        total: action.payload.total,
        totalPages: action.payload.totalPages,
        loaded: true
      };

    case AdminUsersActionTypes.SET_ADMIN_USERS_PARAMS:
      return {
        ...state,
        params: { ...state.params, ...action.payload },
        loaded: false
      };

    case AdminUsersActionTypes.SET_ADMIN_USERS_SINGLE:
      return {
        ...state,
        single: { ...state.single, ...action.payload }
      };

    case AdminUsersActionTypes.SET_ADMIN_USERS_SINGLE_EMPTY:
      return {
        ...state,
        single: { ...schema }
      };

    case AdminUsersActionTypes.SET_ADMIN_USERS_UPDATED:
      return {
        ...state,
        single: action.payload
          ? { ...state.single, ...action.payload }
          : state.single,
        loaded: false
      };

    default:
      return state;
  }
}
