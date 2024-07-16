const express = require("express");
const { Login } = require("../controller/userController");
const Router = express.Router();

Router.post('/login',Login);

module.exports = Router;