const express = require("express");
const sequelize = require("./db");
const User = require("./models/User")(sequelize);

const app = express();

sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
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

//Middleware to verify JWT token
function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }
  try {
    const decoded = jwt.verify(token.split(" ")[1], "your_secret_key_here");
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ message: "Invalid Token" });
  }
}
//Protected route to get user info
app.get("/userinfo", verifyToken, async (req, res) => {
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

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
