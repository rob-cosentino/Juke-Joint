const mongoose = require('mongoose')

// Defines the schema for the 'Album' model using Mongoose
// This schema will be used to create and manage documents in the album collection 
// on MongoDB
const albumSchema = new mongoose.Schema({
    artistName: {
        type: String,
        required: true
    },
    albumName: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    yearReleased: {
        type: Number,
        required: true
    },
    numberOfSongs: {
        type: Number,
        required: true
    },
    trackList: [{
        type: String
    }],
    albumCover: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Album', albumSchema)