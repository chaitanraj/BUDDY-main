const express = require('express');
const router = express.Router();
const Ride = require('../models/Ride');

router.post('/submit-ride', async (req, res) => {
  try {
    const { name, gender, location, datetime, userId } = req.body;

    const rideDate = new Date(datetime);
    const oneHourBefore = new Date(rideDate);
    oneHourBefore.setHours(oneHourBefore.getHours() - 1);
    const oneHourAfter = new Date(rideDate);
    oneHourAfter.setHours(oneHourAfter.getHours() + 1);

    const newRide = new Ride({ name, gender, location, datetime: rideDate, userId });
    await newRide.save();

    const match = await Ride.findOne({
      location,
      datetime: { $gte: oneHourBefore, $lte: oneHourAfter },
      userId: { $ne: userId }
    });

    if (match) {
      res.status(200).json({
        matchFound: true,
        yourRide: {
          name, gender, location,
          date: rideDate.toISOString().split("T")[0],
          time: rideDate.toTimeString().slice(0, 5)
        },
        matchedRide: {
          name: match.name,
          gender: match.gender,
          location: match.location,
          date: match.datetime.toISOString().split("T")[0],
          time: match.datetime.toTimeString().slice(0, 5)
        }
      });
    } else {
      res.status(200).json({ matchFound: false });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
