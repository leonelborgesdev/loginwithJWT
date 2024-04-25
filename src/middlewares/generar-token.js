const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
config();
const { SECRET_KEY } = process.env;

const generarToken = (user) => {
  const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
};

module.exports = generarToken;
