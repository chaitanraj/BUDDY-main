const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const verifyUser = require("../middleware/authMiddleware");
console.log('Auth router loaded');


// Sign up
router.post("/signup", async (req, res) => {
  const { name, email, password, gender } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword, gender });
  await user.save();
  return res.status(201).json({ message: "User created" });
});

// Login
router.post("/login", async (req, res) => {
  console.log('Login route hit');
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({
    userId: user._id,
    name: user.name
  }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  });

  console.log("Token Done", token)
  return res.json({ token, user: { name: user.name, email: user.email } });
});

module.exports = router;