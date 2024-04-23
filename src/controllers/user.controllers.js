const express = require("express");
const sequelize = require("../db");
const User = require("../models/User.js")(sequelize);
const bcrypt = require("bcrypt");
const { validarJWT } = require("../middlewares");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
config();

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { registerUser };
