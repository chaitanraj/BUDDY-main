const express = require('express');
const router = express.Router();
const Ride = require('../models/ride');

router.post('/submit-ride', async (req, res) => {
  try {
    console.log("🚀 Reached backend route");

    const { name, gender, location, datetime, userId } = req.body;

    if (!name || !gender || !location || !datetime || !userId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const rideDate = new Date(datetime);
    if (isNaN(rideDate.getTime())) {
      return res.status(400).json({ error: "Invalid datetime format" });
    }

    await Ride.create({
      name,
      gender,
      location,
      datetime: rideDate,
      userId
    });

    res.status(200).json({
      msg: "Ride created successfully"
    });

  } catch (err) {
    console.error("❌ Error in POST /submit-ride:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
