require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const verifyUser = require("./middleware/authMiddleware");

const app = express();
const PORT = 5000;

// app.options("*", cors());

app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = ["https://buddy-ride.vercel.app"];
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use((req, res, next) => {
  console.log("Origin: ", req.headers.origin);
  next();
});

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.get("/test", (req, res) => {
  res.send("Working");
});

const authRouter = require("./routes/auth");
const rideRouter = require("./routes/ride");

app.get("/verify-user", verifyUser, (req, res) => {
   console.log("Cookies:", req.cookies); 
  res.json({ message: "User verified", name: req.user.name });
});

app.use("/", authRouter);
app.use("/api/rides", rideRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});