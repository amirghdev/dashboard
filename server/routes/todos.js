const express = require("express");

const { auth } = require("../middleware/auth");

const router = express.Router();

const todosController = require("../controller/todosController.js");

// @desc : send all users todos for this year and month and day
// @route : /Tdoso/findAll POST
router.post("/findAll", auth, todosController.findAll);

// @desc : send all undone users todos for this year and month and day
// @route : /Todos/findUndone POST
router.post("/findUndone", auth, todosController.findUndone);

// @desc : create a new todo
// @route : /Todos/create POST
router.post("/create", auth, todosController.createTodo);

// @desc : redo a todo
// @route : Todos/redo POST
// router.post("/redo", todosController.redo);

// @desc : change a todo status
// @route : Todos/done PUT
router.put("/change", auth, todosController.change);

// @desc : update todo time
// @route : Todos/time PUT
router.put("/time", todosController.updateTime);

// @desc : delete todo
// @route : Todos/delete delete
router.delete("/delete", auth, todosController.deleteTodo);

// @desc : count todos for a month
// @route : Todos/count POST
router.get("/count", auth, todosController.count);

// @desc : add current todo to next day
// @route : Todos/tomorrow PUT
router.put("/tomorrow", auth, todosController.addToTomorrow);

// @desc : move todo to current day and month and year
// @route : Todos/move PUT
router.put("/move", auth, todosController.move);

module.exports = router;
