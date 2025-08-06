const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    iname: {
        type: String,
        required: true
    },
    iemail: {
        type: String,
        required: true
    },
    employeeid: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    plan: {
        type: String,
        required: true,
    }
})

module.exports=mongoose.model('Admin',adminSchema)