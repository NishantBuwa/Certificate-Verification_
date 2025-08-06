const express = require('express')
const router = express.Router()

const {registerAdmin, loginAdmin} = require('../controller/authController')

router.post('/signup', registerAdmin)
router.post('/login', loginAdmin)

module.exports=router