import React, { useState } from 'react';
import './LaunchMusicPage.css'; // Make sure to create a corresponding CSS file.
import Web3 from 'web3';
import contractConfig from '../config/contractConfig';

const web3 = new Web3(window.ethereum);
 // Your contract ABI
const contractAddress = '0xa245A5Ad681eA0A9Fc3ef95c3eDdf9882F03F5c4'; // Your contract address


  const LaunchMusicPage = () => {
    const [artist, setArtist] = useState('');
    const [albumName, setAlbumName] = useState('');
    const [royaltyPercentage, setRoyaltyPercentage] = useState('');
    const [metadataUri, setMetadataUri] = useState(''); // URI to the metadata of the album  
    const [isExclusive, setIsExclusive] = useState(false);
    const [priceInHarmonyTokens, setPriceInHarmonyTokens] = useState('');
    const [image, setImage] = useState(null);
    const [artistAddress, setArtistAddress] = useState(''); // The artist's Ethereum address
    const [tokenURI, setTokenURI] = useState(''); // The metadata URI for the token
    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      setImage(file);
      // Further file handling logic goes here
    };
    const handleCreateExclusiveAlbum = async () => {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' }); // Request account access if needed
        const accounts = await web3.eth.getAccounts(); // Get list of accounts
        
        if (!accounts) throw new Error("No account is provided. Please connect to MetaMask.");
  
        const contract = new web3.eth.Contract(contractConfig.contractABI, contractConfig.contractAddress);
        const priceInWei = web3.utils.toWei(priceInHarmonyTokens, 'ether'); // Convert price to Wei, if entering price in Ether
  
        const response = await contract.methods
          .addExclusiveAlbum(albumName, artist, priceInWei, royaltyPercentage, metadataUri)
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
	  
		  const contract = new web3.eth.Contract(contractConfig.contractABI, contractConfig.contractAddress);
		  const priceInWei = web3.utils.toWei(priceInHarmonyTokens, 'ether'); // Convert price to Wei
	 
		  // Include artist in the function call
		  const response = await contract.methods
			.addNewAlbum(albumName, artist, priceInWei) // Use the first account to send the transaction
      .send({ from: accounts[0] });
		  console.log('Album added:', response);
		} catch (error) {
		  console.error('Error creating album:', error);
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
        <label htmlFor="artist-address">Artist Address:</label>
        <input
          id="artist-address"
          type="text"
          value={artistAddress}
          onChange={(e) => setArtistAddress(e.target.value)}
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

        {isExclusive && ( // This line conditionally renders the button if isExclusive is true
          <button onClick={handleCreateExclusiveAlbum} className="generate-token-button">
            Click here to generate Unique Masterpiece token!
          </button>
        )}



{!isExclusive && ( 
  <button onClick={handleCreateAlbum} className="launch-album-button">
    Launch Album!
  </button>
)}
        
        
        
        <div className="upload-section">
          <span>Add cover image here:</span>
          <input type="file" onChange={handleImageUpload} />
          <button>Upload Image</button>
        </div>
      </div>
    </div>
  );
};
export default LaunchMusicPage;
