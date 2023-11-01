import React, { useState } from 'react'
import axios from 'axios'

function AddAlbumForm() {
    const [artistName, setArtistName] = useState('')
    const [albumName, setAlbumName] = useState('')

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
                <input
                    type="text"
                    placeholder="Album Name"
                    value={albumName}
                    onChange={(e) => setAlbumName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Artist Name"
                    value={artistName}
                    onChange={(e) => setArtistName(e.target.value)}
                />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default AddAlbumForm;