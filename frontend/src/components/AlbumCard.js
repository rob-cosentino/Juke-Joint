import React from 'react';

// AlbumCard component displays individual album details and track list
function AlbumCard({ album, onDelete, onTrackSelect }) {
    return (
        <div className="album-card">
            {/* Album Cover Image */}
            <img src={album.albumCover} alt={album.albumName} className="album-cover" />

            {/* Album Information Section */}
            <div className="album-info">
                <div className="album-details">
                    <h3>{album.albumName}</h3>
                    <p>{album.artistName}</p>
                    <p>Released: {album.yearReleased}</p>
                </div>

                {/* Track List */}
                <div className="album-tracks">
                    <ul>
                        {album.trackList.map((trackName, index) => (
                            <li key={index} className="track-item" onClick={() => onTrackSelect(trackName, album.artistName)}>
                                {trackName}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Delete Button */}
            <button onClick={() => onDelete(album._id)} className="delete-button">Delete</button>
        </div>
    );
}

export default AlbumCard;


// import React from 'react'

// // AlbumCard component displays individual album details and track list 
// function AlbumCard({ album, onDelete, onTrackSelect }) {
//     return (
//         <div className="album-card">
//             <img src={album.albumCover} alt={album.albumName} className="album-cover" />
//             <div className="album-info">
//                 <div className="album-details">
//                     <h3>{album.albumName}</h3>
//                     <p>{album.artistName}</p>
//                     {/* <p>Genre: {album.genre}</p> */}
//                     <p>Released: {album.yearReleased}</p>
//                 </div>
//             <div className="album-tracks">
//                 <ul>
//                     {album.trackList.map((trackName, index) => (
//                         <li key={index} className="track-item" onClick={() => {
//                             console.log(`Clicked on track: ${trackName}`);
//                             onTrackSelect(trackName, album.artistName)
//                         }}>
//                             {trackName}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//         <button onClick={() => onDelete(album._id)} className="delete-button">Delete</button>
//     </div>
//     );
// }

// export default AlbumCard