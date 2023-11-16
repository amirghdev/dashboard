const express = require("express");
const messagesController = require("../controller/messagesController");
const { auth } = require("../middleware/auth");

const router = express.Router();

// @desc : get user messages
// @route : /Messages/findAll GET
router.get("/findAll", auth, messagesController.findAll);

// @desc : delete message
// @route : /Messages/delete delete
router.delete("/delete", auth, messagesController.deleteMessage);

module.exports = router;
