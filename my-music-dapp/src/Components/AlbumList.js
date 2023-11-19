import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './AlbumList.css';

const web3 = new Web3(window.ethereum);
const contractAddress = '0xa245A5Ad681eA0A9Fc3ef95c3eDdf9882F03F5c4'; 

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const contract = new web3.eth.Contract(contractABI, contractAddress);
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

const contractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "albumName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "artistName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "royaltyPercentage",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "uri",
				"type": "string"
			}
		],
		"name": "addExclusiveAlbum",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "albumName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "artistName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "addNewAlbum",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "albumId",
				"type": "uint256"
			}
		],
		"name": "buyAlbum",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "buyExclusiveAlbum",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_harmonyToken",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_masterpieceToken",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "albums",
		"outputs": [
			{
				"internalType": "address",
				"name": "artist",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "artistName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "exclusiveAlbums",
		"outputs": [
			{
				"internalType": "address",
				"name": "artist",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "artistName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "royaltyPercentage",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getExclusiveAlbumIds",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nextAlbumId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
export default AlbumList;
