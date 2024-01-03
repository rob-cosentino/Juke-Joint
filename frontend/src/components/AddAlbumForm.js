import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import useOutsideClick from '../useOutsideClick'

function AddAlbumForm({ onAdd }) {
    // state declarations
    const [artistName, setArtistName] = useState('')
    const [albumName, setAlbumName] = useState('')
    const [artistSuggestions, setArtistSuggestions] = useState([])
    const [albumSuggestions, setAlbumSuggestions] = useState([])
    const [isUserTypingAlbum, setIsUserTypingALbum] = useState(false)
    const [isUserTypingArtist, setIsUserTypingArtist] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/albums`, { artistName, albumName })
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
        if (!albumName.trim() || !isUserTypingAlbum) {
            setAlbumSuggestions([]);
        } else {
            fetchAndSetSuggestions(albumName, "album", setAlbumSuggestions);
        }
    }, [albumName, isUserTypingAlbum]);

    useEffect(() => {
        if (!artistName.trim() || !isUserTypingArtist) {
            setArtistSuggestions([]);
        } else {
            fetchAndSetSuggestions(artistName, "artist", setArtistSuggestions);
        }
    }, [artistName, isUserTypingArtist]);

    const handleAlbumInputChange = (e) => {
        setAlbumName(e.target.value)
        setIsUserTypingALbum(true)
    }

    const handleArtistInputChange = (e) => {
        setArtistName(e.target.value);
        setIsUserTypingArtist(true)
    }

    const onSuggestionClick = (album, artist) => {
        setAlbumName(album)
        setArtistName(artist)
        setIsUserTypingALbum(false)
        setIsUserTypingArtist(false)
        hideSuggestions()
    }

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
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/albums/search?query=${query}&type=${type}`)
            console.log('Received suggestions:', response.data)
            return response.data
        } catch (error) {
            console.error('Error fetching suggestions:', error)
        }
        return []
    }

    const hideSuggestions = () => {
        setArtistSuggestions([]);
        setAlbumSuggestions([]);
    };

    const ref = useRef();
    useOutsideClick(ref, hideSuggestions)

    return (
    <div className="album-form" ref={ref}>
        {/* <h2 id="album-form-header">Add Album</h2> */}
        <form onSubmit={handleSubmit}>
        <div className="input-container">
            <label className="input-album-label">Album Name:</label>
            <input
                type="text"
                placeholder="Enter album name..."
                value={albumName}
                onChange={handleAlbumInputChange}
            />
            {albumSuggestions.length > 0 && (
                <ul className="suggestions-list">
                    {albumSuggestions.slice(0, 4).map(suggestion => ( // Limit to 4 suggestions
                        <li key={suggestion.id} onClick={() => onSuggestionClick(suggestion.name, suggestion.artists[0].name)}>
                            {suggestion.name} by {suggestion.artists[0].name}
                        </li>
                    ))}
                </ul>
            )}
        </div>

        <div className="input-container">
            <label className="input-artist-label">Artist Name:</label>
            <input
                type="text"
                placeholder="Enter artist name..."
                value={artistName}
                onChange={handleArtistInputChange}
            />
            {artistSuggestions.length > 0 && (
                <ul className="suggestions-list">
                    {artistSuggestions.slice(0, 4).map(suggestion => (
                        <li key={suggestion.id} onClick={() => onSuggestionClick(albumName, suggestion.name)}>
                            {suggestion.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>

        <button type="submit">Add Album</button>
        </form>
    </div>
    );
}

export default AddAlbumForm;

