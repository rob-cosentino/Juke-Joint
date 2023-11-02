import React from 'react'
import AddAlbumForm from './components/AddAlbumForm'
import AlbumGallery from './components/AlbumGallery'
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Juke Joint</h1>
      <AddAlbumForm />
      <AlbumGallery />
       {/* TODO: ADD a component to display albums */}
    </div>
  );
}

export default App;
