const express = require('express')
const router = express.Router()
const feedback=require('../models/feedback')

router.post("/",async (req,res)=>{
    console.log("Feedback Route Hit");
    const{message}=req.body;
    if(!message)
        return res.status(400).json({error:"Feedback route not working"})

    try{
        const data=new feedback({
            message,
        });
    
    await data.save();
    console.log("Feedback Saved")
    res.status(201).json({ message: "Feedback sent." });
    }catch(err)
    {
        res.status(500).json({error:"Feedback not saved"})
    }
})

module.exports=router;