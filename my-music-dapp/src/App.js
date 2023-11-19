import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Web3Initializer from './Components/Web3Initializer';
import LaunchMusicPage from './Components/LaunchMusicPage';
import AlbumList from './Components/AlbumList';
import HomePage from './Components/HomePage';
import './App.css'; // Import your main stylesheet here

function App() {
  return (
    <Router>
      <div className="App">
        <Web3Initializer />
        <nav className="nav">
          <div className="nav-container">
            <NavLink to="/home" className="nav-link" activeClassName="active">Home</NavLink>
            <NavLink to="/launch" className="nav-link" activeClassName="active">Launch Music</NavLink>
            <NavLink to="/albums" className="nav-link" activeClassName="active">View Albums</NavLink>
          </div>
        </nav>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/launch" element={<LaunchMusicPage />} />
          <Route path="/albums" element={<AlbumList />} />
          {/* Add more Route components as needed for additional URLs */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
