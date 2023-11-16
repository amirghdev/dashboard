const express = require("express");
const { auth } = require("../middleware/auth");
const financialController = require("../controller/financialController");

const router = express.Router();

// @desc : find all financial for a date
// @route : /Financial/findAllFinancial GET
router.post("/findAllFinancial", auth, financialController.findAllFinancial);

// @desc : find all financial category
// @route : /Financial/findAllCategories GET
router.post("/findAllCategories", auth, financialController.findAllCategory);

// @desc : create category
// @route : /Financial/createCategory POST
router.post("/createCategory", auth, financialController.createCategory);

// @desc : create financial
// @route : /Financial/createFinancial POST
router.post("/createFinancial", auth, financialController.createFinancial);

// @desc : delete financial
// @route : /Financial/deleteFinancial delete
router.delete("/deleteFinancial", auth, financialController.deleteFinancial);

// @desc : delete income
// @route : /Financial/deleteIncome delete
router.delete("/deleteIncome", auth, financialController.deleteIncome);

// @desc : delete financial category
// @route : /Financial/deleteCategory POST
router.delete("/deleteCategory", auth, financialController.deleteCategory);

// @desc : update user financial
// @route : /Financial/update PUT
router.put("/update", auth, financialController.setUserFinancial);

module.exports = router;
