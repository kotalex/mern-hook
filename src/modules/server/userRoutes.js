const express = require("express");
const router = express.Router();

const Validator = require("./../../middlewares/validator");
const Authorized = require("./../../middlewares/auth");
const AuthRoles = require("./../../constants/auth-roles");

const UserController = require("./../../controllers/admin/user");

// users list
router.post("/list", Authorized(AuthRoles.admin), UserController.list);

// get single user
router.get("/:id", Authorized(AuthRoles.admin), UserController.single);

// create user
router.post(
  "/",
  Authorized(AuthRoles.admin),
  Validator("users.create"),
  UserController.create
);

// update user
router.put(
  "/:id",
  Authorized(AuthRoles.admin),
  Validator("users.update"),
  UserController.update
);

// delete user
router.delete("/:id", Authorized(AuthRoles.admin), UserController.delete);

module.exports = router;
