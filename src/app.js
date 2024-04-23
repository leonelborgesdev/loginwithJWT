const express = require("express");
const sequelize = require("./db");
const routes = require("./routes");
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
app.use(routes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
