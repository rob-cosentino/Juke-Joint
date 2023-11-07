import React from 'react'

function AlbumCard({ album, onDelete }) {
    return (
        <div className="album-card">
            <img src={album.albumCover} alt={album.albumName} className="album-cover" />
            <div className="album-info">
                <div className="album-details">
                    <h3>{album.albumName}</h3>
                    <p>{album.artistName}</p>
                    <p>Genre: {album.genre}</p>
                    <p>Released: {album.yearReleased}</p>
                </div>
            <div className="album-tracks">
                <ul>
                    {album.trackList.map((trackName, index) => (
                        <li key={index}>{trackName}</li>
                    ))}
                </ul>
            </div>
        </div>
        <button onClick={() => onDelete(album._id)} className="delete-button">Delete</button>
    </div>
    );
}

export default AlbumCard