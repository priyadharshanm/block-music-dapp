import React from 'react';
import Web3Initializer from './Components/Web3Initializer';
import LaunchMusicPage from './Components/LaunchMusicPage'; // Import the component

function App() {
  return (
    <div className="App">
      <Web3Initializer />
      <LaunchMusicPage /> {/* Add the component to your app */}
      {/* ... other components ... */}
    </div>
  );
}

export default App;
