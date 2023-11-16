const express = require("express");
const informationController = require("../controller/informationController");

const router = express.Router();

// @desc : send information from information tabel in database
// @route : /information POST
router.post("/information", informationController.findAll);

module.exports = router;
