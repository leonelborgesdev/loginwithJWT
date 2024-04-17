const express = require("express");
const sequelize = require("./db");
const User = require("./models/User");
const { hash } = require("bcrypt");
const { where } = require("sequelize");

const app = express();

sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch((err) => console.error("Error syncing database:", err));

app.use(express.json());

//User Registration
app.post("/register", async (req, res) => {
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
});

//User Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const isPasswordMatch = await bcrypt.compar(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: " Invalid Credentials " });
    }
    const token = jwt.sing({ userId: user.id }, "your_secret_key_here", {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server Error" });
  }
});
