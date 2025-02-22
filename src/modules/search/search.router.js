const express = require("express");
const controller = require("./search.controller");

const router = express.Router();

router.route("/:value").get(controller.get);

module.exports = router;
