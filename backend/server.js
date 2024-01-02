const express = require('express')
const mongoose = require('mongoose')
const app = express()
const albumRoutes = require('./routes/albums')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Routes
app.use('/api/albums', albumRoutes)


// Proxy endpoint
app.post('/proxy/youtube/search', async (req, res) => {
    try {
        const response = await axios.post(process.env.YOUTUBE_API_URL, req.body);
        res.json(response.data)
    } catch (error) {
        console.error('Error in proxy request:', error);
        res.status(500).json({ message: 'Internl server error' })
    }
})

// MongoDB connection and server start
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.get('/', (req, res) => {
    res.send('Hello from the Juke-Joint server!')
})

const PORT = process.env.PORT || 5002
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})