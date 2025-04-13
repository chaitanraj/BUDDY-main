require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

  const rideRoutes = require('./routes/ride');
  
// Sample route for testing
app.use("/api", require("./routes/auth"));
app.use("/api/rides", require("./routes/ride"));

// Start server
app.listen(PORT, () => {
  console.log(' Server running on http:localhost:${PORT}');
});
