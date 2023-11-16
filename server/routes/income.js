const express = require("express");

const { auth } = require("../middleware/auth");
const incomeController = require("../controller/incomeController");

const router = express.Router();

// @desc : find all income for a date
// @route : /Income/findAll POST
router.post("/findAll", auth, incomeController.findAll);

// @desc : create income
// @route : /Income/create POST
router.post("/create", auth, incomeController.createIncome);

// @desc : delete income
// @route : /Income/delete delete
router.delete("/delete", auth, incomeController.deleteIncome);

module.exports = router;
