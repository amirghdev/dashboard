const express = require("express");
//-
const usersController = require("../controller/usersController");
const { auth } = require("../middleware/auth");

const router = express.Router();

// @desc : change user password
// @route : /Users/changePassword PUT
router.put("/changePassword", auth, usersController.changePassword);

// @desc : active user university
// @route : /Users/activeUniversity PUT
router.put("/activeUniversity", auth, usersController.activeUniversity);

// @desc : update user university
// @route : /Users/updateUniversity PUT
router.put("/updateUniversity", auth, usersController.updateUniversity);

// @desc : find user semesterId
// @route : /Users/findSemester POST
router.post("/findSemester", auth, usersController.findSemester);

// @desc : find user semesterId
// @route : /Users/findSemester POST
router.post("/upload-image", auth, usersController.uploadImage);

module.exports = router;
