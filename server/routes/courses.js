const express = require("express");
const coursesController = require("../controller/coursesController");
const { auth } = require("../middleware/auth");

const router = express.Router();

// @desc : find all courses for a semester
// @route : /Courses/findAll GET
router.post("/findAll", auth, coursesController.findAll);

// @desc : create a new course
// @route : /Courses/create POST
router.post("/create", auth, coursesController.createCourse);

// @desc : delete course and update semester total
// @route : /Courses/delete delete
router.delete("/delete", auth, coursesController.deleteCourse);

// @desc : find course
// @route : /Courses/findOne GET
router.post("/findOne", auth, coursesController.findSingle);

// @desc : update course
// @route : /Courses/update PUT
router.put("/update", auth, coursesController.updateCourse);

module.exports = router;
