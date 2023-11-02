import React from 'react'

function AlbumCard({ album, onDelete }) {
    return (
        <div className="album-card">
            <img src={album.albumCover} alt={album.AlbumName} />
            <h3>{album.albumName}</h3>
            <p>{album.artistName}</p>
            <p>Genre: {album.genre}</p>
            <p>Released: {album.yearReleased}</p>
            <button onClick={() => onDelete(album._id)}>Delete</button>
        </div>
    )
}

export default AlbumCard