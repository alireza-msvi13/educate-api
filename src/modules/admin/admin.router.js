const express = require("express");

const isAdminMiddleware = require("../../middlewares/isAdmin");
const authenticatedMiddleware = require("../../middlewares/authenticated");
const controller = require("./admin.controller");

const router = express.Router();
router
  .route("/p-admin")
  .get(authenticatedMiddleware, isAdminMiddleware, controller.getPAdmin);

module.exports = router;
