require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const verifyUser = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cookieParser());
app.options("*", cors());
app.use(
  cors({
    origin: [
      "https://buddy-ride.vercel.app",  
      "http://localhost:5173",        
      "http://localhost:3000",         
      "http://127.0.0.1:5173"        
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type', 
      'Authorization', 
      'X-Requested-With',
      'Accept',
      'Origin'
    ]
  })
);

app.use(express.json());

// Routes
const authRouter = require("./routes/auth");
const rideRouter = require("./routes/ride");
const InboxRouter = require('./routes/inbox');
const feedbackRouter = require('./routes/feedback');

app.use("/", authRouter);
app.use("/api/rides", rideRouter);
app.use("/inbox", InboxRouter);
app.use("/feedback", feedbackRouter);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Verify user route
app.get("/verify-user", verifyUser, (req, res) => {
  console.log("Cookies:", req.cookies);
  res.json({ message: "User verified", name: req.user.name });
});

// Logout route
app.get("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None" // Changed from "lax" to "None" for cross-origin
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});