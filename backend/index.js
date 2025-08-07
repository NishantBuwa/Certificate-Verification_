require('dotenv').config();
const express = require('express')
const cors = require('cors')
const authRoute = require('./routes/authRoute')
const certificateRoute = require('./routes/certificateRoute')
const dashboardRoute = require('./routes/dashboardRoute')
const orderRoute = require('./routes/order')
const db = require('./db')
const PORT = 5000

const app = express()

db()

app.use(cors({
    origin: 'https://blockchain-certificate-verification.netlify.app',
    methods:['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}))

app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/certificate', certificateRoute)
app.use('/api/dashboard', dashboardRoute)
app.use('/api/payment', orderRoute)

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})