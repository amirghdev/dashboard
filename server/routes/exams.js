const express = require("express");
const examsController = require("../controller/examsController");
const { auth } = require("../middleware/auth");

const router = express.Router();

// @desc : select all exams for current semester_unit
// @route : /Exams/findAll GET
router.post("/findAll", auth, examsController.findAll);

// @desc : find single exam
// @route : /Exams/findOne GET
router.post("/findOne", auth, examsController.findSingle);

// @desc : find all courses for this semester for create a new exam
// @route : /Exams/findCourses GET
router.post("/findCourses", auth, examsController.findCourses);

// @desc : create a new exam
// @route : /Exams/create POST
router.post("/create", auth, examsController.createExams);

// @desc : delete exam
// @route : /Exams/delete delete
router.delete("/delete", auth, examsController.deleteExam);

// @desc : update exam
// @route : /Exams/update put
router.put("/update", auth, examsController.updateExam);

module.exports = router;
