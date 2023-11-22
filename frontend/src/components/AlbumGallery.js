import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AlbumCard from './AlbumCard'

function AlbumGallery({ albums, setAlbums, onTrackSelect }) {
    // const [albums, setAlbums] = useState([])

    // useEffect(() => {
    //     const fetchAlbums = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:5002/api/albums')
    //             setAlbums(response.data)
    //         } catch (error) {
    //             console.error('Error fetching albums:', error)
    //         }
    //     };

    //     fetchAlbums()
    // }, []);

    const handleDelete = async (albumId) => {
        try {
            await axios.delete(`http://localhost:5002/api/albums/${albumId}`)
            setAlbums(albums.filter(album => album._id !== albumId))
        } catch (error) {
            console.error('Error deleting album:'. error)
        }
    };

    return (
        <div className="album-gallery">
            {albums.map(album => (
                <AlbumCard
                key={album._id} 
                album={album} 
                onDelete={handleDelete} 
                onTrackSelect={onTrackSelect}
            />
            ))}
        </div>
    )
}

export default AlbumGallery