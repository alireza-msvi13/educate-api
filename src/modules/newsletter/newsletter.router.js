const express = require("express");

const controller = require("./newsletter.controller");

const router = express.Router();

router.route("/").get(controller.getAll).post(controller.create);

module.exports = router;
