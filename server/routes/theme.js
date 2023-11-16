const express = require("express");

const router = express.Router();

const themeController = require("../controller/theme");
const { auth } = require("../middleware/auth");

// @desc : for user theme change
// @route : /theme POST
router.post("/theme", auth, themeController.change);

module.exports = router;
