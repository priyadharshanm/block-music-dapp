require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { INFURA_API_KEY, MNEMONIC } = process.env;


module.exports = {
 networks: {
   development: {
     host: "127.0.0.1",
     port: 8545,
     network_id: "*",
   },
   sepolia: {
     provider: () => new HDWalletProvider(MNEMONIC, INFURA_API_KEY),
     network_id: "11155111",
     gas: 6465030,
   },
 },


 compilers: {
   solc: {
     version: "0.8.20", // or whatever your contract requires
     // other settings like optimizer...
   }
 }
};
