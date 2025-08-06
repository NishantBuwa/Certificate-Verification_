require('dotenv').config();
const express = require('express')
const cors = require('cors')
const authRoute = require('./routes/authRoute')
const certificateRoute = require('./routes/certificateRoute')
const dashboardRoute = require('./routes/dashboardRoute')
const db = require('./db')
const PORT = 4000

const app = express()

db()

app.use(cors)
app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/certificate', certificateRoute)
app.use('/api/dashboard', dashboardRoute)

// app.get('/',(req,res)=>{
//     res.send("Backend is running smoothly");
// })

app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
})
