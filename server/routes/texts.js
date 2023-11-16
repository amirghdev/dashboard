const express = require("express");
const textsController = require("../controller/textsController");
const { auth } = require("../middleware/auth");

const router = express.Router();

// @desc : get all texts
// @route : /Texts/findAll GET
router.post("/findAll", auth, textsController.findAll);

// @desc : create a new text
// @route : /Texts/create POST
router.post("/create", auth, textsController.createText);

// @desc : delete a text
// @route : /Texts/delete delete
router.delete("/delete", auth, textsController.deleteText);

// @desc : find a text
// @route : /Texts/findOne GET
router.post("/findOne", auth, textsController.findSingle);

// @desc : update a text
// @route : /Texts/findAll PUT
router.put("/update", auth, textsController.updateText);

// @desc : count all texts for a month
// @route : /Texts/count GET
router.post("/count", auth, textsController.count);

module.exports = router;
