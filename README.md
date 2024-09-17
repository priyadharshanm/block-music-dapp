# block-music-dapp
Repository for Block Music DAPP 

# Overview
This project addresses key issues in the music industry, such as piracy, unfair royalty distribution, and reliance on intermediaries, by building a decentralized music platform using blockchain technology. Artists can tokenize their music as NFTs, receive automatic royalties, and manage their content directly. The platform utilizes ERC20, ERC721, and ERC1155 token standards to facilitate payments, ownership transfers, and fan rewards.

Features
HarmonyToken (ERC20): A fungible token used for purchasing music albums.
MasterPiece Token (ERC721): Non-fungible tokens (NFTs) representing exclusive music albums, enabling ownership tracking and royalty distribution for artists.
Fan Rewards (ERC1155): Batch transferable tokens for concert passes and backstage passes, enabling cost-efficient rewards for fans.
Transparent and automated royalty payments to artists using smart contracts.
Decentralized storage of music metadata on IPFS with off-chain storage for large media files.
Technology Stack
Blockchain: Ethereum
Smart Contracts: Solidity
Token Standards: ERC20, ERC721, ERC1155
Development Tools: Truffle, Ganache, Infura, MetaMask
Frontend: React.js, Web3.js
Storage: IPFS for off-chain data
Deployment: Sepolia Testnet
Smart Contracts
HarmonyToken (ERC20):

Used for purchasing music albums and other platform-related transactions.
Functions: buyTokens(), transferTokens(), withdrawETH()
MasterPieceToken (ERC721):

Represents exclusive music albums as NFTs.
Functions: mintMasterpieceToken(), transferTokenOwnership()
MusicPlatformInteractor (ERC1155):

Manages the creation of regular albums, exclusive albums, and fan rewards.
Functions: addNewAlbum(), buyAlbum(), rewardFan()
How It Works
Artists: Upload their albums to the platform, which can either be regular albums (using HarmonyToken) or exclusive albums (minted as ERC721 NFTs). Every time an exclusive album (NFT) is resold, the artist receives royalties automatically.
Fans: Purchase albums using HarmonyTokens. Fans can also be rewarded with concert passes and backstage passes (ERC1155 tokens) for their engagement.
Music Labels: Can purchase and resell exclusive albums, with ownership tracked via the blockchain, ensuring transparency and proper royalty distribution.
Architecture
The project is split into three key layers:

Frontend: Built with React.js and Web3.js, allowing users to interact with the Ethereum blockchain directly through their web browser.
Smart Contracts: Written in Solidity and deployed to the Sepolia testnet via Infura. Smart contracts handle the core functionalities like album uploads, sales, royalties, and rewards.
Storage: Album metadata is stored on-chain, while large media files (music) are stored off-chain using IPFS.
