import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './HomePage.css';
// import contractConfig from '../config/contractConfig';
import contractConfig from '../config/contractsConfig.json';
import MyContractABI from '../config/abi.json';


const web3 = new Web3(window.ethereum);


const HomePage = () => {
  const [albums, setAlbums] = useState([]);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const setupEventListener = async () => {
        try {
          const contract = new web3.eth.Contract(MyContractABI, contractConfig.MusicPlatformInteractor);
    
          // Real-time event listener for ExclusiveAlbumAdded events
          contract.events.AlbumAdded({
            fromBlock: 'latest'
          })
          .on('data', event => {
            console.log('New Album Added, Please refresh:', event.returnValues);
            alert(`New album added, Please refresh: ${event.returnValues.albumName} by ${event.returnValues.artist}`);
          })
          .on('error', console.error);
    
        } catch (error) {
          console.error('Error setting up event listener:', error);
        }
      };
    
      setupEventListener();
    
    const loadBlockchainData = async () => {
        const accounts = await web3.eth.getAccounts(); // Get list of accounts
        
        if (!accounts) throw new Error("No account is provided. Please connect to MetaMask.");
  
        if (accounts.length > 0) {
            console.log(accounts[0])
          setAccount(accounts[0]);
        } else {
          console.error("No account is provided. Please connect to MetaMask.");
        }
      };
    const fetchAlbums = async () => {
        try {
        await loadBlockchainData();
          const contract = new web3.eth.Contract(MyContractABI, contractConfig.MusicPlatformInteractor);
          // Use the newly added function name
          const albumIds = await contract.methods.getAllAlbumIds().call();
      
           const albumsData = await Promise.all(
          albumIds.map(async (id) => {
            const album = await contract.methods.albums(id).call();
            const accounts = await web3.eth.getAccounts(); // Get list of accounts
        
            if (!accounts) throw new Error("No account is provided. Please connect to MetaMask.");
      
            const bought = await contract.methods.hasBoughtAlbum(id, accounts[0]).call();
            return { id, ...album, bought };
          })
        );
      
          setAlbums(albumsData);
        } catch (error) {
          console.error('Error fetching albums:', error);
        }
      };
      

    fetchAlbums();
  }, []);
 

const handleBuyAlbum = async (tokenId, price) => {
    try {
      // Request account access if needed
      const priceInWei = web3.utils.toWei(price.toString(), 'ether');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      // Get list of accounts
      const accounts = await web3.eth.getAccounts();
      // Check if we have access to user's account
      if (!accounts) throw new Error("No account is provided. Please connect to MetaMask.");
  
      // Create a new contract instance with the ABI and address
      const contract = new web3.eth.Contract(MyContractABI, contractConfig.MusicPlatformInteractor);
      // Call the buyExclusiveAlbum method from the smart contract
      try {
        // Request account access if needed
        window.ethereum.enable().then(() => {
            // Account now exposed, can call contract methods
            const contract = new web3.eth.Contract(MyContractABI, contractConfig.MusicPlatformInteractor);
            contract.methods.buyAlbum(tokenId)
                .send({ from: accounts[0]})
                .then(result => {
                    console.log(result);
                })
                .catch(error => {
                    console.error(error);
                });
        });
    } catch (error) {
        console.error(error);
    }
  
    //   console.log('Transaction response:', response);
    } catch (error) {
      console.error('Error buying exclusive album:', error);
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
            <img src={album.uri || 'default_album_cover.jpg'} alt={album.name} />
            <p>{album.name} [Buy for {album.price} HT]</p>
            {album.bought ? (
              <button className="listen-button">Listen</button>
            ) : (
              <button onClick={() => handleBuyAlbum(album.id, album.price)} className="buy-button">
                Buy Album
              </button>
            )}
            
          </div>
        ))}
       
      </section>
      
      {/* ... other sections ... */}
    </div>
  );
};

export default HomePage;