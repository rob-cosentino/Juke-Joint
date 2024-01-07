// Album route definitions using Express Router 
// This module handles requests related to album operations like CRUD
const express = require('express')
const router = express.Router()
const Album = require('../models/album')
const { searchForAlbum } = require('../utils/spotify')
const { searchSuggestions } = require('../utils/spotify')


// Retrieves all albums from the database
// GET /api/albums
router.get('/', async (req, res) => {
    try {
        const albums = await Album.find()
        res.json(albums)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// Deletes a specific album by ID from the database 
// DELETE /api/albums/:id
router.delete('/:id', async (req, res) => {
    try {
        const result = await Album.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).json({ message: 'Album not found' });
        }
        
        res.json({ message: 'Album deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// Adds a new album to the database after fetching details from Spotify API
// Calls searchForAlbum from spotify.js utility 
// POST /api/albums 
router.post('/', async (req, res) => {
    console.log("Inside /app/albums POST route")
    const { artistName, albumName } = req.body

    const albumDetails = await searchForAlbum(artistName, albumName)

    if (!albumDetails) {
        return res.status(400).json({ message: 'Could not find the specified album on Spotify '})
    }

    const album = new Album(albumDetails)

    try {
        const savedAlbum = await album.save()
        res.json(savedAlbum)
    } catch (err) {
        res.status(400).json({ message: err.message })
        console.error('Error adding albums:', err)
        console.error('Error details:', err.response.data)
    }
})

// Autofill suggestions for album and artist names 
// Provides search suggestions by querying the Spotify API
// Calls searchSuggestions from spotify.js utility 
// GET /api/albums/search
router.get('/search', async (req, res) => {
    
    const { query, type } = req.query

    if (!query || !type) {
        return res.status(400).send("Query and type are required.")
    }

    if (!query.trim()) {
        return res.json({ artists: { items: [] }, albums: { items: [] } })
    }

    try {
        const results = await searchSuggestions(query, type)
    res.json(results)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
    
})

module.exports = router