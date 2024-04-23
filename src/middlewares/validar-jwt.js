const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
config();
const { SECRET_KEY } = process.env;

const validarJWT = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }
  try {
    const decoded = jwt.verify(token.split(" ")[1], SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = validarJWT;
