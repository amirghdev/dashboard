const express = require("express");
const bookmarksController = require("../controller/bookmarksController");
const { auth } = require("../middleware/auth");
// const { findOne } = require("../utils/findOne");

const router = express.Router();

// @desc : find all bookmarks
// @route : /Bookmarks/findBookmarks POST
router.post("/findAll", auth, bookmarksController.findAll);

// @desc : find all categories
// @route : /Bookmarks/findCategories POST
router.post("/findCategories", auth, bookmarksController.findCategories);

// @desc : find single bookmark
// @route : /Bookmarks/findBookmark POST
router.post("/findBookmark", auth, bookmarksController.findSingle);

// @desc : find category items
// @route : /Bookmarks/findItems POST
router.post("/findItems", auth, bookmarksController.findCategoryItems);

// @desc : find no categories bookmarks
// @route : /Bookmarks/findForInsert POST
router.post("/find-insert", auth, bookmarksController.findForInsert);

// @desc : insert bookmark in category
// @route : /Bookmarks/insert PUT
router.put("/insert", auth, bookmarksController.insert);

// @desc : create bookmark
// @route : /Bookmarks/createBookmark POST
router.post("/createBookmark", auth, bookmarksController.createBookmark);

// @desc : create category
// @route : /Bookmarks/createCategory POST
router.post("/createCategory", auth, bookmarksController.createCategory);

// @desc : delete bookmark
// @route : /Bookmarks/deleteBookmark delete
router.delete("/deleteBookmark", auth, bookmarksController.deleteBookmark);

// @desc : delete category
// @route : /Bookmarks/deleteCategory delete
router.delete("/deleteCategory", auth, bookmarksController.deleteCategory);

// @desc : update bookmark
// @route : /Bookmarks/updateBookmark put
router.put("/updateBookmark", auth, bookmarksController.updateBookmark);

// @desc : update category
// @route : /Bookmarks/updateCategory put
// router.put("/updateCategory", auth, bookmarksController.updateCategory);

module.exports = router;
