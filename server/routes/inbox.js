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

module.exports=router;