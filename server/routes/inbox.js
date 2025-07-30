const express = require('express')
const router = express.Router()
const Inbox = require("../models/inbox")
const verifyUser = require("../middleware/authMiddleware");

router.post("/", verifyUser, async (req, res) => {
  console.log("📨 POST /inbox route hit");
  console.log("req.user:", req.user);
  console.log("BODY:", req.body);
   
  const { to, message } = req.body;
  const from = req.user._id || req.user.id;
   
  console.log("📨 Message details:", {
    from: from,
    to: to,
    message: message
  });

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
    console.log("✅ Message saved:", newMessage);
    res.status(201).json({ message: "Message sent." });
  } catch (err) {
    console.error("❌ Error sending message:", err);
    res.status(500).json({ error: "Server error." });
  }
});

router.get("/", verifyUser, async (req, res) => {
  console.log("📥 Inbox GET route hit");
  
  const userId = req.user._id || req.user.id;
  const userIdString = userId.toString();
  console.log("🔍 Current user ID:", userIdString);

  try {
   
    const messages = await Inbox.find({
      $or: [{ from: userId }, { to: userId }],
    }).populate("from to", "name email username")
      .sort({ timestamp: -1 }); 

    console.log("🔍 Found messages:", messages.length);

    
    const conversations = {};

    messages.forEach((msg) => {
     
      if (!msg.from || !msg.to) {
        console.log("⚠️ Skipping message with missing user data: from=" + !!msg.from + ", to=" + !!msg.to);
        return;
      }

      const partner = msg.from._id.toString() === userIdString ? msg.to : msg.from;
      const partnerId = partner._id.toString();

      if (!conversations[partnerId]) {
        conversations[partnerId] = {
          partnerId: partnerId,
          username: partner.name || partner.username || partner.email || 'Unknown User',
          messages: [], 
          latestTimestamp: msg.timestamp,
        };
      }

      conversations[partnerId].messages.push({
        id: msg._id,
        message: msg.message,
        timestamp: msg.timestamp,
        fromMe: msg.from._id.toString() === userIdString, 
        from: {
          id: msg.from._id,
          username: msg.from.name || msg.from.username || msg.from.email
        },
        to: {
          id: msg.to._id,
          username: msg.to.name || msg.to.username || msg.to.email
        }
      });

      if (msg.timestamp > conversations[partnerId].latestTimestamp) {
        conversations[partnerId].latestTimestamp = msg.timestamp;
      }
    });

    Object.values(conversations).forEach(conversation => {
      conversation.messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    });

    const conversationArray = Object.values(conversations);
    console.log("🔍 Final conversations:", conversationArray.length);
    console.log("🔍 Conversation partners:", conversationArray.map(c => `${c.username} (${c.messages.length} messages)`));

    res.json(conversationArray);
  } catch (err) {
    console.error("❌ Inbox fetch error:", err);
    res.status(500).json({ error: "Could not fetch inbox." });
  }
});

module.exports=router;