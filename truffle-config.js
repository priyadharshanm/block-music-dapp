require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

const mnemonic = process.env.MNEMONIC; // Your mnemonic
const infuraApiKey = process.env.INFURA_API_KEY; // Your Infura API Key

module.exports = {
  networks: {
    // Other network configurations...

    sepolia: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: mnemonic,
          providerOrUrl: `https://sepolia.infura.io/v3/${infuraApiKey}`,
          chainId: 11155111 // This is the chain ID for Sepolia
        }),
      network_id: 11155111, // Sepolia's network id
      gas: 4500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },

  // Compilers configuration...
  compilers: {
    solc: {
      version: "0.8.20", // or whatever your contract requires
      // other settings like optimizer...
    }
  }
};
