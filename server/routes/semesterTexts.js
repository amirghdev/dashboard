const express = require("express");
const semesterTextsController = require("../controller/semesterTextsController");
const { auth } = require("../middleware/auth");

const router = express.Router();

// @desc : select all semester texts
// @route : /Semester/Texts/findAll POST
router.post("/findAll", auth, semesterTextsController.findAll);

// @desc : select single semester text
// @route : /Semester/Texts/findOne POST
router.post("/findOne", auth, semesterTextsController.findSingle);

// @desc : create semester text
// @route : /Semester/Texts/create POST
router.post("/create", auth, semesterTextsController.createText);

// @desc : update semester text
// @route : /Semester/Texts/update put
router.put("/update", auth, semesterTextsController.updateText);

// @desc : delete semester text
// @route : /Semester/Texts/delete delete
router.delete("/delete", auth, semesterTextsController.deleteText);

module.exports = router;
