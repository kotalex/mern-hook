const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const ApiError = require("./../handlers/api-error");

const Roles = require("./../constants/roles");
const User = require("./../models/User");

const TableService = require("./common/table");

const _ = require("lodash");

module.exports = UserService = {
  async list(params) {
    return await TableService.generate(params, User);
  },

  pruneUserData(user) {
    const { id, firstName, lastName, email, role, avatar } = user;
    return { id, firstName, lastName, email, role: role.name, avatar };
  },

  async getSingleUserByID(id, prune = true) {
    const user = await User.findById(id);

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    if (!prune) {
      return user;
    }

    return this.pruneUserData(user);
  },

  async saveUser(data, currentUser, userId) {
    let user = userId
      ? await this.getSingleUserByID(userId, false)
      : new User();

    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.email = data.email;

    // hash password if new user
    if (data.password) {
      user.password = await bcrypt.hash(data.password, 10);
    }

    // get avatar from email
    if (!user || !user.avatar) {
      user.avatar = gravatar.url(data.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
    }

    // check if role is set for user
    if (data.role) {
      if (!currentUser || currentUser.role.isAdmin !== true) {
        throw new ApiError(Lang.get("errors.generic.unauthorized"), 403);
      } else {
        user.role = Roles[_.findKey(Roles, role => role.name === data.role)];
      }
    } else {
      user.role = Roles.USER;
    }

    // save user
    await user.save();
    return this.pruneUserData(user);
  }
};
