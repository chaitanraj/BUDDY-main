const mongoose=require('mongoose')

const inboxSchema=new mongoose.Schema({
    from:{type:String,required:true},
    to:{type:String,required:true},
    message:{type:String,required:true}
},{ timestamps: true })

const Inbox=mongoose.model('Inbox',inboxSchema)

module.exports=Inbox;
