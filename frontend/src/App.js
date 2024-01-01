import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddAlbumForm from './components/AddAlbumForm'
import AlbumGallery from './components/AlbumGallery'
import './App.css';

function App() {
  const [albums, setAlbums] = useState([]);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState('')

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/albums');
        setAlbums(response.data);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchAlbums();
  }, []);

  const handleAddAlbum = (album) => {
    setAlbums([...albums, album]);
  };

  const onTrackSelect = async (trackName, artistName) => {
    console.log(`Track selected: ${trackName} by ${artistName}`)
    try {
      const response = await axios.post('http://localhost:5002/proxy/youtube/search', {
        songName: trackName,
        artistName: artistName
      });
      const videoUrl = response.data.url;
      const videoId = new URL(videoUrl).searchParams.get('v')
      console.log('Microservice response:', response.data)
      setSelectedVideoUrl(`https://www.youtube.com/embed/${videoId}`)
    } catch (error) {
      console.error('Error fetching YouTube URL:', error)
    }
  }

  return (
    <div className="App">
      {/* <h1>Juke Joint</h1> */}
      <header>
        <p>Hello and welcome to the Juke Joint! If you like music, you are in the right place! While you're here, you can curate your own personal album collection and jukebox for viewing and listening purposes. Begin by simply typing in an album and artist name and hitting the 'Add Album' button. To listen to any particular track, simply click on it and utilize the pop-up youtube player. You can delete an album from the jukebox by simply clicing the 'Delete' button at the bottom of the album card. Enjoy!</p>
      </header>
      {/* <h1 id="addAlbum">Add Album</h1> */}
      <AddAlbumForm onAdd={handleAddAlbum}/>
      {selectedVideoUrl && (
        <iframe
            id="ytplayer"
            type="text/html"
            width="400"
            height="240"
            src={selectedVideoUrl}
            frameBorder="0"
        ></iframe>
      )}
      <AlbumGallery
          albums={albums} 
          setAlbums={setAlbums}
          onTrackSelect={onTrackSelect}
      />
    </div>
  );
}

export default App;
