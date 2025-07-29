const express=require('express')
const router=express.Router()
const Inbox=require("../models/inbox")

router.post('/',async(req,res)=>{
  console.log("Required Body: ",req.body);
    try{
    const{from,to,message}=req.body;
    const inbox=new Inbox({from,to,message});

    await inbox.save();
    return res.status(201).json({ message: "Inbox created" });
    } catch (err) {
    console.error('Error saving inbox message:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
})



router.get('/:user', async (req, res) => {
  const currentUser = req.params.user;

  try {
    const messages = await Inbox.find({
      $or: [{ from: currentUser }, { to: currentUser }]
    }).sort({ createdAt: -1 });

    const conversationMap = new Map();

    for (const msg of messages) {
      const otherUser = msg.from === currentUser ? msg.to : msg.from;

      if (!conversationMap.has(otherUser)) {
        conversationMap.set(otherUser, {
          username: otherUser,
          latestMessage: msg.message,
          latestTimestamp: msg.createdAt
        });
      }
    }
    const conversations = Array.from(conversationMap.values());
    res.json(conversations);

  } catch (err) {
    console.error("Error fetching inbox contacts:", err);
    res.status(500).json({ error: "Failed to fetch inbox contacts" });
  }
});
