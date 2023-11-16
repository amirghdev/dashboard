const express = require("express");
const { auth } = require("../middleware/auth");

const router = express.Router();

const authController = require("../controller/auth");

// @desc : register actions
// @route : /register POST
router.post("/register", authController.register);

// @desc : login actions
// @route : /login POST
router.post("/login", authController.login);

// @desc : active user
// @route : /active-user POST
router.post("/active-user", authController.activeUser);

// @desc : auth and send user data actions
// @route : /auth POST
router.post("/auth", authController.auth);

// @desc : clear users session in database
// @route : /clear-sessions POST
router.post("/clear-sessions", authController.clearSessions);

// @desc : logout and remove current session in database
// @route : /logout POST
router.post("/logout", authController.logout);

// @desc : forgot password and send email
// @route : /forgot-password POST
router.post("/forgot-password", authController.forgotPassword);

// @desc : get user id for reset password
// @route : /getUserData POST
router.post("/getUserData", authController.getUserData);

// @desc : reset password
// @route : /reset-password POST
router.post("/reset-password", authController.resetPassword);

// @desc : upload profile image
// @route : /profile-image POST
router.post("/profile-image", auth, authController.uploadImage);

module.exports = router;
