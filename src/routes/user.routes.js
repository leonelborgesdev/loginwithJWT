const express = require("express");
const sequelize = require("../db");
const User = require("../models/User.js")(sequelize);
const bcrypt = require("bcrypt");
const { validarJWT } = require("../middlewares");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
const {
  userRegister,
  userLogin,
  userInfo,
} = require("../controllers/user.controllers.js");
config();

const router = express.Router();

//User Registration
router.post("/register", userRegister);

//User Login
router.post("/login", userLogin);

//Middleware to verify JWT token

//Protected route to get user info
router.get("/userinfo", validarJWT, userInfo);

module.exports = router;
