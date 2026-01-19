require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const verifyUser = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = ["http://localhost:5173","https://buddy-ride.vercel.app"];
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());


const authRouter = require("./routes/auth");
const rideRouter = require("./routes/ride");
const InboxRouter = require('./routes/inbox');
const feedbackRouter = require('./routes/feedback');

app.post("/logout", (req, res) => {
  console.log("🔥 Logout route hit!");
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None" 
  });
  res.status(200).json({ message: "Logged out successfully" });
});

app.use("/", authRouter);
app.use("/api/rides", rideRouter);
app.use("/inbox", InboxRouter);
app.use("/feedback", feedbackRouter);

app.get("/health",(req,res)=>{
  res.send("Port 5000 is healthy")
})


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Verify user route
app.get("/verify-user", verifyUser, (req, res) => {
  console.log("Cookies:", req.cookies);
  res.json({ message: "User verified", name: req.user.name });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});