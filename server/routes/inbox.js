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
    // First, get messages without populate to see raw data
    const messages = await Inbox.find({
      $or: [{ from: userId }, { to: userId }],
    }).sort({ timestamp: -1 });
    
    console.log("🔍 Found messages (raw):", messages.length);
    console.log("🔍 Raw message data:", messages.map(m => ({
      id: m._id,
      from: m.from,
      to: m.to,
      message: m.message
    })));
    
    // Now populate with better error handling
    const populatedMessages = await Inbox.find({
      $or: [{ from: userId }, { to: userId }],
    })
    .populate({
      path: "from",
      select: "name email username",
      // Don't fail if user doesn't exist
      options: { strictPopulate: false }
    })
    .populate({
      path: "to", 
      select: "name email username",
      options: { strictPopulate: false }
    })
    .sort({ timestamp: -1 });

    console.log("🔍 Populated messages:", populatedMessages.length);
    console.log("🔍 Populated message data:", populatedMessages.map(m => ({
      id: m._id,
      from: m.from,
      to: m.to,
      message: m.message
    })));
    
    //
    const conversations = {};
    
    populatedMessages.forEach((msg, index) => {
      console.log(`Processing message ${index}:`, {
        id: msg._id,
        fromExists: !!msg.from,
        toExists: !!msg.to,
        fromId: msg.from?._id,
        toId: msg.to?._id,
        message: msg.message
      });
      
      let partner = null;
      let partnerId = null;
      let partnerName = null;
      let isCurrentUserSender = false;
      
      // Determine who the conversation partner is
      if (msg.from && msg.from._id.toString() === userIdString) {
        // Current user sent this message
        isCurrentUserSender = true;
        if (msg.to) {
          partner = msg.to;
          partnerId = partner._id.toString();
          partnerName = partner.name || partner.username || partner.email || 'Unknown User';
        } else {
          // Recipient user was deleted
          partnerId = 'deleted-to-user';
          partnerName = 'Deleted User';
        }
      } else if (msg.to && msg.to._id.toString() === userIdString) {
        // Current user received this message
        isCurrentUserSender = false;
        if (msg.from) {
          partner = msg.from;
          partnerId = partner._id.toString();
          partnerName = partner.name || partner.username || partner.email || 'Unknown User';
        } else {
          // Sender user was deleted
          partnerId = 'deleted-from-user';
          partnerName = 'Deleted User';
        }
      } else {
        console.log("⚠️ Message doesn't involve current user, skipping");
        return;
      }
      
      // Initialize conversation if it doesn't exist
      if (!conversations[partnerId]) {
        conversations[partnerId] = {
          partnerId: partnerId,
          username: partnerName,
          messages: [],
          latestTimestamp: msg.timestamp,
          // Add these for better UI handling
          isPartnerDeleted: partnerId.startsWith('deleted-'),
          partnerData: partner // Keep original partner data if exists
        };
      }
      
      // Add message to conversation
      conversations[partnerId].messages.push({
        id: msg._id,
        message: msg.message,
        timestamp: msg.timestamp,
        sender: isCurrentUserSender ? 'you' : 'them',
        from: {
          id: msg.from?._id || 'deleted',
          username: msg.from ? (msg.from.name || msg.from.username || msg.from.email) : 'Deleted User'
        },
        to: {
          id: msg.to?._id || 'deleted', 
          username: msg.to ? (msg.to.name || msg.to.username || msg.to.email) : 'Deleted User'
        }
      });
      
      // Update latest timestamp
      if (msg.timestamp > conversations[partnerId].latestTimestamp) {
        conversations[partnerId].latestTimestamp = msg.timestamp;
      }
    });
    
    // Sort conversations by latest message timestamp (newest first)
    const conversationArray = Object.values(conversations)
      .sort((a, b) => new Date(b.latestTimestamp) - new Date(a.latestTimestamp));
    
    // Sort messages within each conversation (oldest first for chat display)
    conversationArray.forEach(conversation => {
      conversation.messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    });
    
    console.log("🔍 Final conversations:", conversationArray.length);
    console.log("🔍 Conversation summary:", conversationArray.map(c => ({
      partnerId: c.partnerId,
      username: c.username,
      messageCount: c.messages.length,
      isDeleted: c.isPartnerDeleted
    })));
    
    res.json(conversationArray);
    
  } catch (err) {
    console.error("❌ Inbox fetch error:", err);
    res.status(500).json({ error: "Could not fetch inbox." });
  }
});

module.exports = router;