const express = require('express')
const router = express.Router()

const {uploadCertificate, verifyCertificate} = require('../controller/certificateController')

router.post('/upload',uploadCertificate)
router.post('/verify',verifyCertificate)

module.exports=router