import React, { useState, useEffect } from 'react'
import axios from 'axios'

function AddAlbumForm({ onAdd }) {
    const [artistName, setArtistName] = useState('')
    const [albumName, setAlbumName] = useState('')
    const [artistSuggestions, setArtistSuggestions] = useState([])
    const [albumSuggestions, setAlbumSuggestions] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:5002/api/albums', { artistName, albumName })
            onAdd(response.data)
            // clear input fields after successful addition
            setArtistName('')
            setAlbumName('')
            setArtistSuggestions([])
            setAlbumSuggestions([])
            console.log(response.data)
        } catch (error) {
            console.error('Error adding album:', error)
        }
    }

    useEffect(() => {
        if (!artistName.trim()) {
            setArtistSuggestions([]);
        } else {
            fetchAndSetSuggestions(artistName, "artist", setArtistSuggestions);
        }
    }, [artistName]);

    useEffect(() => {
        if (!albumName.trim()) {
            setAlbumSuggestions([]);
        } else {
            fetchAndSetSuggestions(albumName, "album", setAlbumSuggestions);
        }
    }, [albumName]);

    const handleArtistInputChange = (e) => {
        setArtistName(e.target.value);
    }

    const handleAlbumInputChange = (e) => {
        setAlbumName(e.target.value)
    }

    const CancelToken = axios.CancelToken
    let cancel

    
    const fetchAndSetSuggestions = async (query, type, setterFunction) => {
        if (query.length < 2) {
            setterFunction([])
            return
        }
        const data = await fetchSuggestions(query, type);
        if (type === "artist" && data && data.artists && data.artists.items) {
            setterFunction(data.artists.items);
        }
        if (type === "album" && data && data.albums && data.albums.items) {
            setterFunction(data.albums.items);
        }
    }

    const fetchSuggestions = async (query, type) => {
        try {
            const response = await axios.get(`http://localhost:5002/api/albums/search?query=${query}&type=${type}`)
            console.log('Received suggestions:', response.data)
            return response.data
        } catch (error) {
            console.error('Error fetching suggestions:', error)
        }
        return []
    }

    return (
    <div className="album-form">
        <h2 id="album-form-header">Add Album</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Album Name:</label>
                <input
                    type="text"
                    placeholder="Enter album name..."
                    value={albumName}
                    onChange={(e) => setAlbumName(e.target.value)}           // {handleAlbumInputChange}
                />
                <ul>
                {albumSuggestions.map(suggestion => (
                    <li key={suggestion.id} onClick={() => {
                        setAlbumName(suggestion.name);
                        setArtistName(suggestion.artists[0].name);
                    }}>
                        {suggestion.name} by {suggestion.artists[0].name}
                    </li>
                ))}
                </ul>
            </div>

            <div>
                <label>Artist Name:</label>
                <input
                    type="text"
                    placeholder="Artist Name"
                    value={artistName}
                    onChange={(e) => setArtistName(e.target.value)}        // {handleArtistInputChange}
                />
               <ul>
                {artistSuggestions.map(suggestion => (
                    <li key={suggestion.id} onClick={() => setArtistName(suggestion.name)}>
                        {suggestion.name}
                    </li>
                ))}
                </ul>
            </div>
    
            <button type="submit">Add Album</button>
        </form>
    </div>
    );
}



export default AddAlbumForm;