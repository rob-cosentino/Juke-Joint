import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddAlbumForm from './components/AddAlbumForm'
import AlbumGallery from './components/AlbumGallery'
import './App.css';

function App() {
  const [albums, setAlbums] = useState([]);

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


  return (
    <div className="App">
      <h1>Juke Joint</h1>
      <AddAlbumForm onAdd={handleAddAlbum}/>
      <AlbumGallery albums={albums} setAlbums={setAlbums}/>
       {/* TODO: ADD a component to display albums */}
    </div>
  );
}

export default App;
