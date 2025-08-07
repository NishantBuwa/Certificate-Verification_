const express = require('express')
const router = express.Router()
const razorpay=require('../utils/razorpay_integration')

router.post('/order',razorpay)

module.exports=router