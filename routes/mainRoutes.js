const express = require("express");
const { Login,Register, ViewUserProfileDetails, UpdateUserDetails } = require("../controller/userController");
const { verifyToken, verifyTokenNew } = require("../middleware/authMiddleware");
const upload = require("../middleware/multerMiddleware");
const Router = express.Router();

Router.post('/login',Login);
Router.post('/register',Register);

Router.post('/view-user-profile',verifyToken,ViewUserProfileDetails);
Router.post('/update-user-details',verifyTokenNew,UpdateUserDetails);
Router.post('/update-profile-img',upload.single("profileImage"),)

module.exports = Router;