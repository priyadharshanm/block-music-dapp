const MasterPieceToken = artifacts.require("MasterPieceToken");
const HarmonyToken = artifacts.require("HarmonyToken");
const MusicPlatformInteractor = artifacts.require("MusicPlatformInteractor");
const path = require('path');
// ...rest of your code

const fs = require('fs');

module.exports = async function(deployer, network, accounts) {

    await deployer.deploy(HarmonyToken);
 const harmonyTokenInstance = await HarmonyToken.deployed();

 // Deploy the MasterPieceToken and HarmonyToken contracts first if they're not already deployed.
 await deployer.deploy(MasterPieceToken);
 const masterpieceTokenInstance = await MasterPieceToken.deployed();


 

 // Now deploy the MusicPlatformInteractor contract with the addresses of the two deployed contracts.
 await deployer.deploy(MusicPlatformInteractor, harmonyTokenInstance.address, masterpieceTokenInstance.address, " ");
 const MusicPlatformInteractorInstance = await MusicPlatformInteractor.deployed();


 const config = {
    MasterPieceToken: masterpieceTokenInstance.address,
    HarmonyToken: harmonyTokenInstance.address,
    MusicPlatformInteractor: MusicPlatformInteractorInstance.address
  };
  const configPath = path.resolve(__dirname, '../my-music-dapp/src/config/contractsConfig.json'); // Adjust '../frontend/src/' to match your structure

  // Write the config object to the frontend directory
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');

  const configPath2 = path.resolve(__dirname, '../my-music-dapp/src/config/abi.json'); // Adjust '../frontend/src/' to match your structure

  // Write the config object to the frontend directory
  fs.writeFileSync(configPath2, JSON.stringify(MusicPlatformInteractor.abi, null, 2), 'utf-8');


  console.log('Contracts deployed and addresses written to contractsConfig.json');
};



