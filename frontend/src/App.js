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
      const response = await axios.post('http://54.188.27.139/youtube/search', {
        songName: trackName,
        artistName: artistName
      });
      console.log('Microservice response:', response.data)
      setSelectedVideoUrl(response.data.url)
    } catch (error) {
      console.error('Error fetching YouTube URL:', error)
    }
  }

  return (
    <div className="App">
      {/* <h1>Juke Joint</h1> */}
      <header>
        <p>Welcome to the Juke Joint! While you're here, you can create your own custom jukebox - it's hooked up with Spotify, so you should be able to fetch just about any album out there! Simply fill out the input fields and click 'Add Album' to get started. Removing an album from your jukebox is as easy as clicking 'Delete' underneath the album information.</p>
      </header>
      <AddAlbumForm onAdd={handleAddAlbum}/>
      <AlbumGallery
          albums={albums} 
          setAlbums={setAlbums}
          onTrackSelect={onTrackSelect}
      />
      {selectedVideoUrl && (
        <iframe
            id="ytplayer"
            type="text/html"
            width="640"
            height="360"
            src={selectedVideoUrl}
            frameBorder="0"
        ></iframe>
      )}
    </div>
  );
}

export default App;
