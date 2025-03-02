const express = require("express");

const isAdminMiddleware = require("../../middlewares/isAdmin");
const authenticatedMiddleware = require("../../middlewares/authenticated");
const controller = require("./ticket.controller");

const router = express.Router();

router
  .route("/")
  .post(authenticatedMiddleware, controller.create)
  .get(authenticatedMiddleware, isAdminMiddleware, controller.getAll);

router.route("/user").get(authenticatedMiddleware, controller.userTickets);

router
  .route("/answer")
  .post(authenticatedMiddleware, isAdminMiddleware, controller.setAnswer);

router.route("/answer/:id").get(authenticatedMiddleware, controller.getAnswer);

module.exports = router;
