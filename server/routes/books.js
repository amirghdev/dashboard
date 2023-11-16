const express = require("express");
const booksController = require("../controller/booksController");
const { auth } = require("../middleware/auth");

const router = express.Router();

// @desc : get all books
// @route : /Books/findAll POST
router.post("/findAll", auth, booksController.findAll);

// @desc : create a new book
// @route : /Books/create POST
router.post("/create", auth, booksController.createBook);

// @desc : delete a book
// @route : /Books/delete delete
router.delete("/delete", auth, booksController.deleteBook);

// @desc : find a book
// @route : /Books/findOne post
router.post("/findOne", auth, booksController.findSingle);

// @desc : update a book
// @route : /Books/findAll PUT
router.put("/update", auth, booksController.updateBook);

// @desc : count all Books for a month
// @route : /Books/count GET
router.post("/count", auth, booksController.count);

// @desc : count all Books for a month
// @route : /Books/image PUT
router.put("/image", auth, booksController.uploadImage);

// @desc : confirm book image
// @route : /Books/confirm POST
router.post("/confirm", auth, booksController.confirm);

// @desc : handle confirm book image
// @route : /Books/handle-confirm POST
router.post("/handle-confirm", auth, booksController.handleConfirm);

module.exports = router;
