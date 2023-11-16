import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Web3Initializer from './Components/Web3Initializer';
import LaunchMusicPage from './Components/LaunchMusicPage';
import AlbumList from './Components/AlbumList';

function App() {
  return (
    <Router>
      <div className="App">
        <Web3Initializer />
        <nav>
          <Link to="/launch">Launch Music</Link>
          <Link to="/albums">View Albums</Link>
        </nav>
        <Routes>
          <Route path="/launch" element={<LaunchMusicPage />} />
          <Route path="/albums" element={<AlbumList />} />
          {/* Add more Route components as needed for additional URLs */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
