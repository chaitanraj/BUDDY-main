require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const verifyUser = require("./middleware/authMiddleware");

const app = express();
const PORT = 5000;


app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = ["http://localhost:5173"];
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

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const authRouter = require("./routes/auth");
const rideRouter = require("./routes/ride");
const InboxRouter=require('./routes/inbox');

app.get("/verify-user", verifyUser, (req, res) => {
   console.log("Cookies:", req.cookies); 
  res.json({ message: "User verified", name: req.user.name });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,         // only over HTTPS
    sameSite: "lax"       // or 'none' if using cross-origin
  });
  res.status(200).json({ message: "Logged out successfully" });
});

app.use("/", authRouter);
app.use("/api/rides", rideRouter);
app.use("/inbox", InboxRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});