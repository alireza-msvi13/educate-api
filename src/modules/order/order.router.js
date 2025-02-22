const express = require("express");

const isAdminMiddleware = require("../../middlewares/isAdmin");
const authenticatedMiddleware = require("../../middlewares/authenticated");
const controller = require("./order.controller");

const router = express.Router();

router.route("/").get(authenticatedMiddleware, controller.getAll);

router.route("/:id").get(authenticatedMiddleware, controller.getOne);

module.exports = router;
