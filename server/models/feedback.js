const mongoose=require('mongoose')

const feedbackSchema=new mongoose.Schema({
    message:{
        type:String,
    }

})

const feedback=mongoose.model('Feedback',feedbackSchema)

module.exports=feedback;