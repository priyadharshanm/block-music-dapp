import React, { useState } from 'react';
import './LaunchMusicPage.css'; // Make sure to create a corresponding CSS file.
import Web3 from 'web3';
import contractConfig from '../config/contractsConfig.json';
import MyContractABI from '../config/abi.json';

import axios from 'axios'; // Import axios for HTTP requests

const web3 = new Web3(window.ethereum);
 // Your contract ABI

  const LaunchMusicPage = () => {
    const [uploadStatus, setUploadStatus] = useState(''); // To track the upload status
    const [artist, setArtist] = useState('');
    const [albumName, setAlbumName] = useState('');
    const [royaltyPercentage, setRoyaltyPercentage] = useState('');
    const [metadataUri, setMetadataUri] = useState(''); // URI to the metadata of the album  
    const [isExclusive, setIsExclusive] = useState(false);
    const [priceInHarmonyTokens, setPriceInHarmonyTokens] = useState('');
    const [image, setImage] = useState(null);
    const [tokenURI, setTokenURI] = useState(''); // The metadata URI for the token

    const handleCreateExclusiveAlbum = async () => {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' }); // Request account access if needed
        const accounts = await web3.eth.getAccounts(); // Get list of accounts
        
        if (!accounts) throw new Error("No account is provided. Please connect to MetaMask.");
  
        const contract = new web3.eth.Contract(MyContractABI, contractConfig.MusicPlatformInteractor);
        // const priceInWei = web3.utils.toWei(priceInHarmonyTokens, 'ether'); // Convert price to Wei, if entering price in Ether
  
        const response = await contract.methods
          .addExclusiveAlbum(albumName, artist, priceInHarmonyTokens, royaltyPercentage, metadataUri)
          .send({ from: accounts[0] }); // Use the first account to send the transaction
  
        console.log('Exclusive album added:', response);
      } catch (error) {
        console.error('Error creating exclusive album:', error);
      }
    };
  

    const handleCreateAlbum = async () => {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' }); // Request account access if needed
        const accounts = await web3.eth.getAccounts(); // Get list of accounts
        
        if (!accounts) throw new Error("No account is provided. Please connect to MetaMask.");
  
        const contract = new web3.eth.Contract(MyContractABI, contractConfig.MusicPlatformInteractor);
        // const priceInWei = web3.utils.toWei(priceInHarmonyTokens, 'ether'); // Convert price to Wei, if entering price in Ether
        // console.log("HT", priceInHarmonyTokens)
        // console.log("wei", priceInWei)
        const response = await contract.methods
          .addNewAlbum(albumName, artist, priceInHarmonyTokens, metadataUri)
          .send({ from: accounts[0] }); // Use the first account to send the transaction
  
        console.log('Exclusive album added:', response);
      } catch (error) {
        console.error('Error creating exclusive album:', error);
      }
    };
	  
	  
	  const handleImageUpload = async (event) => {
      const file = event.target.files[0];
      if (!file) return;
  
      // FormData to handle file upload
      const formData = new FormData();
      formData.append('image', file);
  
      try {
        setUploadStatus('Uploading...');
        // Replace 'your-backend-endpoint' with your actual backend endpoint
        const response = await axios.post('http://localhost:3001/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        setUploadStatus('Upload successful');
        console.log(response);
        let fileUrl = response.data.url;

        console.log(fileUrl);
        // You can then set the URL received from your backend to your state
        setMetadataUri(response.data.url); // Assuming the backend returns the URL
      } catch (error) {
        console.error('Error uploading file:', error);
        setUploadStatus('Upload failed');
      }
    };

  // Add other handlers and logic as necessary

  return (
    <div className="launch-music-container">
      <div className="launch-music-content">
        <label htmlFor="artist">Artist:</label>
        <input
          id="artist"
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />

        <label htmlFor="album-name">Album Name:</label>
        <input
          id="album-name"
          type="text"
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)}
        />
        
        <label htmlFor="harmony-tokens">Price in Harmony Tokens:</label>
        <input
          id="harmony-tokens"
          type="text"
          value={priceInHarmonyTokens}
          onChange={(e) => setPriceInHarmonyTokens(e.target.value)}
        />
         <div className="exclusive-toggle">
           Is it an Exclusive?:
          <button onClick={() => setIsExclusive(true)} className={isExclusive ? 'active' : ''}>Yes</button>
          <button onClick={() => setIsExclusive(false)} className={!isExclusive ? 'active' : ''}>No</button>
        </div>
        {isExclusive && (
            <>
              <label htmlFor="royalty-percentage">Royalty %:</label>
              <input
                id="royalty-percentage"
                type="text"
                value={royaltyPercentage}
                onChange={(e) => setRoyaltyPercentage(e.target.value)}
              />
            </>
          )}
      <div className="upload-section">
          <span>Add cover image here:</span>
          <input type="file" onChange={handleImageUpload} />
        {uploadStatus && <p>{uploadStatus}</p>}
        </div>
        {isExclusive && ( // This line conditionally renders the button if isExclusive is true
          <button onClick={handleCreateExclusiveAlbum} className="generate-token-button">
           Launch Exclusive Album (MasterpieceToken)! 
          </button>
        )}



{!isExclusive && ( 
  <button onClick={handleCreateAlbum} className="launch-album-button">
    Launch Album!
  </button>
)}
        
        
        
       
      </div>
    </div>
  );
};
export default LaunchMusicPage;