const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const verifyUser = require("../middleware/authMiddleware");

console.log('Auth router loaded');

// Sign up
router.post("/signup", async (req, res) => {
  try {
    console.log('Signup route hit with data:', req.body);
    
    const { name, email, password, gender } = req.body;
    
    // Validate required fields
    if (!name || !email || !password || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, gender });
    await user.save();
    
    console.log('User created successfully:', user.email);
    return res.status(201).json({ message: "User created successfully" });
    
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: "Server error during signup" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    console.log('Login route hit with email:', req.body.email);
    
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({
      userId: user._id,
      name: user.name
    }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    console.log("User logged in successfully:", user.email);
    return res.json({ 
      message: "Login successful",
      token, 
      user: { name: user.name, email: user.email } 
    });
    
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: "Server error during login" });
  }
});

module.exports = router;