// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "./MasterPieceToken.sol";
import "./HarmonyToken.sol";

contract MusicPlatformInteractor {
    HarmonyToken private harmonyToken;
    MasterPieceToken private masterpieceToken;

    struct Album {
        address artist;
        string name;
        uint256 price;
    }
    struct ExclusiveAlbum {
    address artist;
    string name;
    uint256 price; // price in HarmonyTokens
    uint256 royaltyPercentage; // e.g. 10 for 10%
    }

    mapping(uint256 => ExclusiveAlbum) public exclusiveAlbums;  // tokenId to ExclusiveAlbum details
    mapping(uint256 => Album) public albums;  // albumId to Album details
    uint256 public nextAlbumId = 1;

    constructor(address _harmonyToken, address _masterpieceToken) {
        harmonyToken = HarmonyToken(_harmonyToken);
        masterpieceToken = MasterPieceToken(_masterpieceToken);
    }

    // Artist adds a new album and sets its price
    function addNewAlbum(string memory albumName, uint256 price) external {
        Album memory newAlbum = Album({
            artist: msg.sender,
            name: albumName,
            price: price
        });

        albums[nextAlbumId] = newAlbum;
        nextAlbumId++;
    }

   
    // User buys an album
    function buyAlbum(uint256 albumId) external {
        require(albums[albumId].artist != address(0), "Album doesn't exist");
        require(harmonyToken.balanceOf(msg.sender) >= albums[albumId].price, "Insufficient balance");

        harmonyToken.transferFrom(msg.sender, albums[albumId].artist, albums[albumId].price);
    }

    // Artist adds an exclusive album represented by a MasterPieceToken
    function addExclusiveAlbum(string memory albumName, uint256 price, uint256 royaltyPercentage, string memory uri) external returns (uint256) {
        uint256 tokenId = masterpieceToken.mintMasterpieceToken(msg.sender, uri);
        
        ExclusiveAlbum memory newAlbum = ExclusiveAlbum({
            artist: msg.sender,
            name: albumName,
            price: price,
            royaltyPercentage: royaltyPercentage
        });
        
        exclusiveAlbums[tokenId] = newAlbum;
        return tokenId;
    }

    // User buys exclusive album (transfers the NFT ownership)
    function buyExclusiveAlbum(uint256 tokenId) external payable {
        require(masterpieceToken.ownerOf(tokenId) != msg.sender, "You already own this album");
        require(exclusiveAlbums[tokenId].artist != address(0), "Album doesn't exist");
        require(harmonyToken.balanceOf(msg.sender) >= exclusiveAlbums[tokenId].price, "Insufficient balance");
        
        address previousOwner = masterpieceToken.ownerOf(tokenId);
        address artist = exclusiveAlbums[tokenId].artist;
        uint256 royaltyAmount = (exclusiveAlbums[tokenId].price * exclusiveAlbums[tokenId].royaltyPercentage) / 100;

        harmonyToken.transferFrom(msg.sender, artist, royaltyAmount);
        harmonyToken.transferFrom(msg.sender, previousOwner, exclusiveAlbums[tokenId].price - royaltyAmount);
        
        masterpieceToken.transferTokenOwnership(tokenId, msg.sender);
    }

    
}
