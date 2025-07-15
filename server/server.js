require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const router = express.Router();
const app = express();
const PORT = process.env.PORT || 5000;
const verifyUser =require("./middleware/authMiddleware");

app.use(cors({
  origin:'https://buddy-ride.vercel.app',
  credentials:true
}));
app.use(express.json());

mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const authRouter = require("./routes/auth");
const rideRouter = require("./routes/ride");

router.get("/api/verify-user",verifyUser,(req,res)=>{
  res.json({message:"User verified",name:req.user.name})
})

app.use("/", authRouter);
app.use("/api/rides", rideRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
