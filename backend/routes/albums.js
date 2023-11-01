const express = require('express')
const router = express.Router()
const Album = require('../models/album')
const { searchForAlbum } = require('../utils/spotify')
// const { searchSuggestions } = require('../utils/spotify')

// Get all albums /
router.get('/', async (req, res) => {
    try {
        const albums = await Album.find()
        res.json(albums)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const album = await Album.findById(req.params.id)
        if (!album) return res.status(404).json({ message: 'Album not found' })

        await album.remove()
        res.json({ message: 'Album deleted successfully '})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});


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

// autofill
// router.get('/search', async (req, res) => {
//     const { query, type } = req.query
//     if (!query || !type) {
//         return res.status(400).send("Query and type are required.")
//     }

//     const results = await searchSuggestions(query, type)
//     res.json(results)
// })

module.exports = router