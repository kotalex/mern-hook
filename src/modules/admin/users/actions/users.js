import Api from "./../../../../utils/api";
import AdminUsersActionTypes from "../types/users";

export const loadUser = async id => {
  const result = await Api.request("admin.users.single", id);
  return {
    type: AdminUsersActionTypes.SET_ADMIN_USERS_SINGLE,
    payload: result.data.user
  };
};

export const saveUser = async (userData, userId) => {
  const endpoint = `admin.users.${userId ? "update" : "create"}`;
  const result = await Api.request(endpoint, userId, userData);
  return {
    type: AdminUsersActionTypes.SET_ADMIN_USERS_UPDATED,
    payload: result.data.user
  };
};

export const deleteUser = async userId => {
  await Api.request("admin.users.delete", userId);
  return {
    type: AdminUsersActionTypes.SET_ADMIN_USERS_UPDATED
  };
};
