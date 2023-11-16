import Web3 from 'web3';

let web3;

const getWeb3 = () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      window.ethereum.enable().then(() => {
        console.log('Ethereum enabled');
        // Account has been allowed
      });
    } catch (error) {
      console.error('User denied account access...');
    }
  }
  // Legacy DApp browsers...
  else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider);
  }
  // If no injected web3 instance is detected, fall back to Ganache
  else {
    const provider = new Web3.providers.HttpProvider(
      'http://localhost:7545'
    );
    web3 = new Web3(provider);
    console.log('No web3 instance injected, using Local web3.');
  }

  return web3;
};

export default getWeb3;
