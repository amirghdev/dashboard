const express = require("express");

const appStartController = require("../controller/appStartController");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.post("/getData", auth, appStartController.sendData);

module.exports = router;
