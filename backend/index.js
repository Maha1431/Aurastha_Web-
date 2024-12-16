require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const cors = require("cors");

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

// Enable CORS for all routes
app.use(cors());

// Register route
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();
  res.status(201).send("User registered");
});

// Login route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(404).send("User not found");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send("Invalid credentials");
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// Profile Update route
// Profile Update route
app.put("/profile", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]; // Get the token from the Authorization header
    if (!token) return res.status(401).send("No token provided");
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
      const userId = decoded.id; // Extract the user ID from the token
  
      const { username, email } = req.body;
      await User.findByIdAndUpdate(userId, { username, email });
      res.status(200).send("Profile updated");
    } catch (error) {
      res.status(400).send("Invalid token");
    }
  });
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
