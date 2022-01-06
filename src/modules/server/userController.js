const Api = require("./../../services/common/api");
const ApiError = require("./../../handlers/error");
const UserService = require("./../../services/user");

module.exports = {
  async list(req, res, next) {
    try {
      return Api.send(res, await UserService.list(req.body));
    } catch (err) {
      next(err);
    }
  },

  async single(req, res, next) {
    try {
      const user = await UserService.getSingleUserByID(req.params.id);
      return Api.send(res, { user });
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const user = await UserService.saveUser(req.body, req.user);
      return Api.send(res, { user }, "User created successfully");
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const user = await UserService.saveUser(
        req.body,
        req.user,
        req.params.id
      );
      return Api.send(res, { user }, "User updated successfully");
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const user = await UserService.getSingleUserByID(req.params.id, false);
      await user.delete();
      return Api.send(res, "User deleted successfully");
    } catch (err) {
      next(err);
    }
  }
};
