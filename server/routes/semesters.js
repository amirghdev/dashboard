const express = require("express");
const semesterController = require("../controller/semestersController");
const { auth } = require("../middleware/auth");

const router = express.Router();

// @desc : find user semesters
// @route : /Semesters/findAll GET
router.post("/findAll", auth, semesterController.findAll);

// @desc : find user university detail
// @route : /Semesters/findOne GET
router.post("/findOne", auth, semesterController.findSingle);

// @desc : create a new semester
// @route : /Semesters/create POST
router.post("/create", auth, semesterController.createSemester);

// @desc : delete a semester
// @route : /Semesters/delete DELETE
router.delete("/delete", auth, semesterController.deleteSemester);

// @desc : find semester and send semester details
// @route : /Semesters/findSemester GET
router.post("/findSemester", auth, semesterController.getSemesterData);

// @desc : set user semester
// @route : /Semesters/setUserSemester POST
router.post("/setUserSemester", auth, semesterController.setUserSemester);

module.exports = router;
