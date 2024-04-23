const express = require("express");
const sequelize = require("../db");
const User = require("../models/User.js")(sequelize);
const bcrypt = require("bcrypt");
const { validarJWT } = require("../middlewares");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
const {
  registerUser,
  loginUser,
} = require("../controllers/user.controllers.js");
config();

const router = express.Router();

//User Registration
router.post("/register", registerUser);

//User Login
router.post("/login", loginUser);

//Middleware to verify JWT token

//Protected route to get user info
router.get("/userinfo", validarJWT, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ user });
  } catch (error) {
    console.error("Error fetching user info:", error);
    return res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
