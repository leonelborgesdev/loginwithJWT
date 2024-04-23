const userRoute = require("./user.routes.js");
const express = require("express");
const router = express.Router();

router.use("/user", userRoute);

module.exports = router;
