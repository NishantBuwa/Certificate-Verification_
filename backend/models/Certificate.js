const mongoose = require('mongoose')

const cerSchema = new mongoose.Schema({
    studentName:{
        type:String,
        required:true
    }, 
    course:{
        type:String,
        required:true
    },
    issueDate:{
        type:Date,
        required:true,
        default:Date.now
    },
    certificateID:{
        type:String,    
        required:true
    }, 
    issuedBy: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true,
    },
    certHash:{
        type:String,
        required:true
    },
    txId:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('Certificate',cerSchema)