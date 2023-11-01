import React, { useState, useEffect } from 'react'
import axios from 'axios'

function AddAlbumForm(props) {
    const [artistName, setArtistName] = useState('')
    const [albumName, setAlbumName] = useState('')
    const [artistSuggestions, setArtistSuggestions] = useState([])
    const [albumSuggestions, setAlbumSuggestions] = useState([])

    // useEffect(() => {
    //     console.log("Artist Name:", artistName)
    //     console.log("Artist Suggestions:", artistSuggestions)
    //     console.log("Album name:", albumName)
    //     console.log("Album Suggestions:", albumSuggestions)
    // }, [artistName, artistSuggestions, albumName, albumSuggestions])

    // const handleArtistInputChange = async (e) => {
    //     const inputValue = e.target.value
    //     setArtistName(inputValue);

    //     if (!inputValue.trim()) {
    //         setArtistSuggestions([])
    //         return
    //     }

    //     const data = await fetchSuggestions(inputValue, "artist")
    //     setArtistSuggestions(data.artists.items)
    // }

    // const handleAlbumInputChange = async (e) => {
    //     const inputValue = e.target.value
    //     setAlbumName(inputValue)

    //     if (!inputValue.trim()) {
    //         setAlbumSuggestions([])
    //         return
    //     }
    //     const data = await fetchSuggestions(inputValue, "album")
    //     setAlbumSuggestions(data.albums.items)
    // }

    // const fetchSuggestions = async (query, type) => {
    //     try {
    //         const response = await axios.get(`http://localhost:5002/api/albums/search?query=${query}&type=${type}`)
    //         console.log('Received suggestions:', response.data)
    //         return response.data
    //     } catch (error) {
    //         console.error('Error fetching suggestions:', error)
    //     }
    //     return []
    // }

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

    // const fetchAndSetSuggestions = async (query, type, setterFunction) => {
    //     if (query.length < 2) {
    //         setterFunction([])
    //         return
    //     }

    //     if (cancel !== undefined) {
    //         cancel()
    //     }

    //     const data = await fetchSuggestions(query, type);
    //     if (type === "artist" && data && data.artists && data.artists.items) {
    //         setterFunction(data.artists.items);
    //     }
    //     if (type === "album" && data && data.albums && data.albums.items) {
    //         setterFunction(data.albums.items);
    //     }
    // }

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

    // const fetchSuggestions = async (query, type) => {
    //     try {
    //         const response = await axios.get(
    //             `http://localhost:5002/api/albums/search?query=${query}&type=${type}`,
    //             { 
    //                 cancelToken: new CancelToken(function executor(c) {
    //                     // An executor function receives a cancel function as a parameter
    //                     cancel = c;
    //                 })
    //             }
    //         );
    //         console.log('Received suggestions:', response.data);
    //         return response.data;
    //     } catch (error) {
    //         if (axios.isCancel(error)) {
    //             console.log('Request canceled', error.message);
    //         } else {
    //             console.error('Error fetching suggestions:', error);
    //         }
    //     }
    //     return [];
    // }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:5002/api/albums', { artistName, albumName })
            console.log(response.data)
            // TODO: Update the frontend's state to display the new album
        } catch (error) {
            console.error('Error adding album:', error.response ? error.response.data : error)
        }
    }

    return (
    <div>
        <h2>Add Album</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Album Name:</label>
                <input
                    type="text"
                    placeholder="Enter album name..."
                    value={albumName}
                    onChange={handleAlbumInputChange}
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
                    onChange={handleArtistInputChange}
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