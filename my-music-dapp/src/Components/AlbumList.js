import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './AlbumList.css';
import contractConfig from '../config/contractConfig';

const web3 = new Web3(window.ethereum);
// const contractAddress = '0xd44f06be272A392b4f5b59F442b20CA0146f3d19'; 

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const contract = new web3.eth.Contract(contractConfig.contractABI, contractConfig.contractAddress);
        // Assuming your contract has a method to get all albums or a range of album IDs
        const albumIds = await contract.methods.getExclusiveAlbumIds().call();
        console.log(albumIds)
        const albumsData = await Promise.all(
          albumIds.map(async (id) => {
            const album = await contract.methods.exclusiveAlbums(id).call();
            console.log(album)
            return {
                id,
                artist: album[1],
                artistName: album[2],
                name: album[3],
                // Convert BigInt to string for rendering
                price: web3.utils.fromWei(album[4].toString(), 'ether'),
                royaltyPercentage: album[5].toString(),
                uri: album[6]
              };
          })
        );

        setAlbums(albumsData);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchAlbums();
  }, []);

  const handleBuyClick = (albumId) => {
    console.log(`Buy album with ID: ${albumId}`);
    // Implement the purchase logic here
  };
  const handleBuyExclusiveAlbum = async (tokenId, price) => {
    try {
      // Request account access if needed
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      // Get list of accounts
      const accounts = await web3.eth.getAccounts();
      // Check if we have access to user's account
      if (!accounts) throw new Error("No account is provided. Please connect to MetaMask.");
  
      // Create a new contract instance with the ABI and address
      const contract = new web3.eth.Contract(contractConfig.contractABI, contractConfig.contractAddress);
  
      // Call the buyExclusiveAlbum method from the smart contract
      const response = await contract.methods.buyExclusiveAlbum(7)
        .send({ from: accounts[0] });
  
      console.log('Transaction response:', response);
    } catch (error) {
      console.error('Error buying exclusive album:', error);
    }
  };
  

  return (
    <div className="album-list">
      {albums.map(album => (
        <div key={album.id} className="album-card">
          <img src={album.uri} alt={album.title} className="album-cover" />
          <div className="album-info">
            <h2>{album.title}</h2>
            <p>Artist Name: {album.artistName}</p>
            <p>Artist Address: {album.artist}</p>
            <p>Album: {album.name}</p>
            <p>Price: {album.price} HT</p>
            <p>Royalty: {album.royaltyPercentage}</p>

            <button onClick={() => handleBuyExclusiveAlbum(album.id, album.price)} className="buy-button">
            Own for {album.price}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default AlbumList;
