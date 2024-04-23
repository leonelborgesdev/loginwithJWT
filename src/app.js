const express = require("express");
const sequelize = require("./db");
const User = require("./models/User")(sequelize);
const bcrypt = require("bcrypt");
const { validarJWT } = require("../src/middlewares");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
config();

const app = express();

sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => console.error("Error syncing database:", err));

app.use(express.json());

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
