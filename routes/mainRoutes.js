const express = require("express");
const { Login,Register, ViewUserProfileDetails, UpdateUserDetails } = require("../controller/userController");
const { verifyToken, verifyTokenNew } = require("../middleware/authMiddleware");
const upload = require("../middleware/multerMiddleware");
const { AddHotelListingInfo } = require("../controller/hotelController");
const Router = express.Router();


//auth routes
Router.post('/login',Login);
Router.post('/register',Register);


//user routes
Router.post('/view-user-profile',verifyToken,ViewUserProfileDetails);
Router.post('/update-user-details',verifyTokenNew,UpdateUserDetails);
Router.post('/update-profile-img',upload.single("profileImage"),);

//hotel routes
Router.post('/add-hotel-info',verifyTokenNew,AddHotelListingInfo)

module.exports = Router;