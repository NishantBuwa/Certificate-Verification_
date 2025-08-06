const express=require('express')
const router = express.Router()
const {dashboard, search}=require('../controller/dashboardController')

router.post('/data',dashboard)
router.post('/search',search)

module.exports = router