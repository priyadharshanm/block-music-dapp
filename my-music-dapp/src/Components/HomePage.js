import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './HomePage.css';
import contractConfig from '../config/contractConfig';


const web3 = new Web3(window.ethereum);


const HomePage = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
        try {
          const contract = new web3.eth.Contract(contractConfig.contractABI, contractConfig.contractAddress);
          // Use the newly added function name
          const albumIds = await contract.methods.getAllAlbumIds().call();
      
          const albumsData = await Promise.all(
            albumIds.map(async (id) => {
              const album = await contract.methods.albums(id).call();
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
  const handleBuyAlbum = async (albumId, price) => {
    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        if (!accounts) throw new Error("No account is provided. Please connect to MetaMask.");

        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const priceInWei = web3.utils.toWei(price.toString(), 'ether');

        await contract.methods.buyAlbum(albumId).send({ from: accounts[0], value: priceInWei });
        console.log('Album purchased:', albumId);
    } catch (error) {
        console.error('Error purchasing album:', error);
    }
};

  // Add other functionality as needed

  return (
    <div className="home">
      <header className="home-header">
        {/* Add navigation and header content here */}
      </header>
<section className="background">
<div style={{ backgroundImage: `url('bg1.png')` }}>
{/* The background image is set via inline styles */}
</div>
</section>
      {/* ... other sections ... */}

      <section className="latest-albums">
        <h2>Latest Albums</h2>
        {albums.map((album, index) => (
          <div key={index} className="album">
            {/* Replace with actual path to album cover */}
            <img src={album.coverUrl || 'default_album_cover.jpg'} alt={album.name} />
            <p>{album.name} [Buy for {album.price} HT]</p>
            <button onClick={() => handleBuyAlbum(album.id, album.price)} className="buy-button">
                            Buy Album
                        </button>
          </div>
        ))}
       
      </section>
      
      {/* ... other sections ... */}
    </div>
  );
};

export default HomePage;
