import React from 'react';
import Header from './components/Header';
import AddSong from './components/AddSong';
import SongList from './components/SongList';
import SongPlayer from './components/SongPlayer';

function App() {
  return (
    <>
    <Header />
    <AddSong />
    <SongList />
    <SongPlayer />
    </>
  );
}

export default App;
