const express = require('express');
const router = express.Router();
const Ride = require('../models/ride');
const verifyUser = require('../middleware/authMiddleware');

router.post('/submit-ride', verifyUser, async (req, res) => {
  try {
    console.log("🚀 Reached backend route");
    
    const { name, gender, location, datetime, searchOnly = false } = req.body;
    const userId = req.user.id.toString();
    
    if (!name || !gender || !location || !datetime || !userId) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    
    const rideDate = new Date(datetime);
    if (isNaN(rideDate.getTime())) {
      return res.status(400).json({ error: "Invalid datetime format" });
    }
    
    if (!searchOnly) {
      const existingRide = await Ride.findOne({
        userId,
        location,
        datetime: {
          $gte: new Date(rideDate.getTime() - 1000),
          $lte: new Date(rideDate.getTime() + 1000)
        }
      });
      
      if (!existingRide) {
        await Ride.create({
          name,
          gender,
          location,
          datetime: rideDate,
          userId,
        });
        console.log("✅ New ride saved");
      } else {
        console.log("ℹ️ Ride already exists, skipping save");
      }
    } else {
      console.log("🔍 Search-only request, not saving");
    }
    
    const potentialMatches = await Ride.find({
      userId: { $ne: userId },
      location: location,
      datetime: {
        $gte: new Date(rideDate.getTime() - 30 * 60000),
        $lte: new Date(rideDate.getTime() + 30 * 60000)
      },
    });
    
    if (potentialMatches && potentialMatches.length > 0) {
      const userData = {
        _id: userId,
        name: name,
        location: location,
        date: rideDate.toLocaleDateString(),
        time: rideDate.toLocaleTimeString(),
        gender: gender
      };
      
      const matches = potentialMatches.map(match => ({
        _id: match.userId,
        name: match.name,
        location: match.location,
        date: new Date(match.datetime).toLocaleDateString(),
        time: new Date(match.datetime).toLocaleTimeString(),
        gender: match.gender
      }));
      
      return res.status(200).json({
        userData,
        matches,
        matched: true
      });
    }
    
    res.status(200).json({
      msg: "Ride created successfully",
      matched: false
    });
    
  } catch (err) {
    console.error("❌ Error in POST /submit-ride:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get('/get-ride', verifyUser, async (req, res) => {
  const userId = req.user._id;
  try {
    const rides = await Ride.find({ userId });
    if (!rides.length) {
      return res.json([]);
    }
    else{
    console.log(`Ride found for ${userId}`)
    console.log("Your rides", rides);
    return res.json(rides);
    }
  }
  catch (error) {
    console.error(error);
  }
})

module.exports = router;
