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
            return { id, ...album };
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

  return (
    <div className="album-list">
      {albums.map(album => (
        <div key={album.id} className="album-card">
          <img src={album.cover} alt={album.title} className="album-cover" />
          <div className="album-info">
            <h2>{album.title}</h2>
            <p>Artist Name: {album.artistName}</p>
            <p>Artist Address: {album.artist}</p>
            <p>Album: {album.name}</p>
            <p>Price: {album.price}</p>
            <p>Royalty: {album.royaltyPercentage}</p>

            <button onClick={() => handleBuyClick(album.id)} className="buy-button">
              Own for {album.royalty}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlbumList;
