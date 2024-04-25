const jwt = require("jsonwebtoken");

const generarToken = (user) => {
  const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
};

module.exports = generarToken;
