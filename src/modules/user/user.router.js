const express = require("express");

const userController = require("./user.controller");
const isAdminMiddleware = require("../../middlewares/isAdmin");
const isAuthenticated = require("../../middlewares/authenticated");

const router = express.Router();

router
  .route("/")
  .get(isAuthenticated, isAdminMiddleware, userController.getAll)
  .put(isAuthenticated, userController.updateUser);

router
  .route("/role")
  .put(isAuthenticated, isAdminMiddleware, userController.changeUserRole);

router
  .route("/:id")
  .delete(isAuthenticated, isAdminMiddleware, userController.removeUser)
  .put(isAuthenticated, isAdminMiddleware, userController.editUser);

router
  .route("/ban/:id")
  .put(isAuthenticated, isAdminMiddleware, userController.banUser);

router.route("/courses").get(isAuthenticated, userController.getUserCourses);

module.exports = router;
