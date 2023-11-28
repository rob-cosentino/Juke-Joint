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
        <p>Welcome to the Juke Joint! While you're here, you can create your own custom jukebox filled with your favorite tunes - and listen to them! The jukebox is hooked up to Spotify, so you should be able to fetch just about any album out there! To begin listening to your favorite audio and building your collection, simply fill out the input fields and click 'Add Album' to get started. Accuracy is crucial when sending the album rquest to Spotify, so I recommend utilizing the auto-fill feature by directly clicking on your desired album from the list of suggestions that will appear after you start typing. Removing an album from your jukebox is as easy as clicking 'Delete' underneath the album information.</p>
      </header>
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
