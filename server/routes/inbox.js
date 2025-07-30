const express = require('express')
const router = express.Router()
const Inbox = require("../models/inbox")
const verifyUser = require("../middleware/authMiddleware");

router.post("/", verifyUser, async (req, res) => {
  const { to, message } = req.body;
  const from = req.user._id; // comes from verifyUser JWT middleware

  if (!to || !message) {
    return res.status(400).json({ error: "Recipient and message are required." });
  }

  try {
    const newMessage = new Inbox({
      from,
      to,
      message,
    });

    await newMessage.save();
    res.status(201).json({ message: "Message sent." });
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({ error: "Server error." });
  }
});



// router.get("/",verifyUser, async (req, res) => {    console.log("📥 Inbox GET route hit");
//   console.log("User from middleware:", req.user);

//   const userId = req.user._id;

//   try {
//     const messages = await Inbox.find({
//       $or: [{ from: userId }, { to: userId }],
//     }).populate("from to", "name email"); // populate name/email of both sides

//     // Group by unique users the current user talked to
//     const conversations = {};

//     messages.forEach((msg) => {
//       const partner =
//         msg.from._id.toString() === userId.toString()
//           ? msg.to
//           : msg.from;

//       // Always update if this message is newer
//       if (!conversations[partner._id] || msg.timestamp > conversations[partner._id].latestTimestamp) {
//         conversations[partner._id] = {
//           partnerId: partner._id,
//           username: partner.name,
//           latestMessage: msg.message,
//           latestTimestamp: msg.timestamp,
//         };
//       }
//     });

//     res.json(Object.values(conversations));
//   } catch (err) {
//     console.error("Inbox fetch error:", err);
//     res.status(500).json({ error: "Could not fetch inbox." });
//   }
// });


router.get("/", (req, res) => {
  console.log("📥 SIMPLE INBOX GET HIT - NO MIDDLEWARE");
  res.json({ test: "inbox get working", timestamp: new Date() });
});

module.exports = router;

