// Utility functions for interacting with the SPotofy API
// Includes authentification and data fetching 

const axios = require('axios')
const btoa = require('btoa')

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

// Fetches search suggestions for albums/artists from Spotify API based
// on query and type (artist or album)
const searchSuggestions = async (query, type) => {
    if (!query.trim()) {
        return {}
    }

    try {
        const token = await getSpotifyToken()

        const endpoint = `https://api.spotify.com/v1/search?q=${query}&type=${type}&limit=5`
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }

        const response = await axios.get(endpoint, { headers })
        return response.data
    } catch (error) {
        console.error("Error searching for suggestions:", error)
        return null
    }
}

// Authenticates with Spotify API and retrieves an access token 
const getSpotifyToken = async () => {
    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
            }
        });
        return response.data.access_token
    } catch (error) {
        console.error("Error fetching Spotify token:", error)
    }
};

// Searches for a specific album on Spotify using artist name and album name
// Returns detailed album data including tracklist
const searchForAlbum = async (artistName, albumName) => {
    const token = await getSpotifyToken()
    console.log('Fetched Token:', token)

    try {
        const response = await axios.get(`https://api.spotify.com/v1/search?q=album:${albumName}%20artist:${artistName}&type=album&limit=1`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        console.log('Spotify Album Search Response:', response.data)

        if (!response.data.albums.items.length) {
            throw new Error('No albums found with the specified criteria'); /////
        }

        const album = response.data.albums.items[0]

        // additional checks
        if (!album || !album.id || !album.images || !album.images[0]) {
            throw new Error('Incomplete album data retrieved')
        }

        const trackList = await getAlbumTracklist(album.id)

        return {
            artistName: album.artists[0].name,
            albumName: album.name,
            genre: (album.genres && album.genres[0]) ? album.genres[0] : "Not Available",
            yearReleased: new Date(album.release_date).getFullYear(),
            numberOfSongs: album.total_tracks,
            trackList: trackList,
            albumCover: album.images[0].url
        };
    } catch (error) {
        console.error("Error fetching album data:", error)
        throw error
    }
}

// Retreives the tracklist of a specific album from Spotify 
const getAlbumTracklist = async (albumId) => {
    const token = await getSpotifyToken()

    try {
        const response = await axios.get(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        // Extract track names from the response and return them
        const trackNames = response.data.items.map(track => track.name)
        return trackNames 

    } catch (error) {
        console.error("Error fetching album tracklist:", error)
    }
}

module.exports = {
    getSpotifyToken,
    searchForAlbum,
    searchSuggestions,
    getAlbumTracklist
}