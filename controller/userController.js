const { validationResult } = require("express-validator");
const httpStatusCode = require("../constants/httpStatusCode");
const User = require("../models/userModel");
const { getToken } = require("../middleware/authMiddleware");
const { SendEmail } = require("../services/emailServices");
const Admin = require("../models/adminModel");
const bcrypt= require('bcrypt')
const Login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(httpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = await getToken(user);

    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Successfully logged in!",
      data: { user, token, role: user.role },
    });
  } catch (error) {
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong!!",
      error: error.message,
    });
  }
};

const Register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { username, email, password, role } = req.body;
    if (!username || !email || !password || !role) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        message: "Please provide all the required fields",
      });
    }

    let user;
    if (role === "user") {
      user = await User.findOne({ email });
      if (user) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "User already exists",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      user = await User.create({
        username,
        email,
        password: hashedPassword,
        role,
      });
    } else if (role === "admin") {
      user = await Admin.findOne({ email });
      if (user) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Admin already exists",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      user = await Admin.create({
        username,
        email,
        password: hashedPassword,
        role,
      });
    }

    // Send a congratulatory email to the user
    SendEmail(email, user.username);
    return res.status(httpStatusCode.CREATED).json({
      success: true,
      message: "User registered successfully!",
      data: user,
    });
  } catch (error) {
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong!!",
      error: error.message,
    });
  }
};

module.exports = {
  Login,
  Register,
};
