const express = require("express");
const { validarJWT } = require("../middlewares");
const {
  userRegister,
  userLogin,
  userInfo,
} = require("../controllers/user.controllers.js");

const router = express.Router();

//User Registration
router.post("/register", userRegister);

//User Login
router.post("/login", userLogin);

//Protected route to get user info
router.get("/userinfo", validarJWT, userInfo);

module.exports = router;
