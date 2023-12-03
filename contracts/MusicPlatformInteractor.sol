// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "./MasterPieceToken.sol";
import "./HarmonyToken.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MusicPlatformInteractor is ERC1155 {
    address owner;
       constructor(address _harmonyToken, address _masterpieceToken, string memory _uri) ERC1155(_uri) {
        owner = msg.sender;
        harmonyToken = IHarmonyToken(_harmonyToken);
        masterpieceToken = MasterPieceToken(_masterpieceToken);
    }
    
    IHarmonyToken public harmonyToken;
    // HarmonyToken private harmonyToken;
    MasterPieceToken private masterpieceToken;
    uint256[] private exclusiveAlbumIds;
    mapping(uint256 => address[]) public albumBuyers;
    event ExclusiveAlbumAdded(
        uint256 indexed tokenId,
        address indexed artist,
        string albumName,
        uint256 price
    );
    event AlbumAdded(
        uint256 indexed tokenId,
        address indexed artist,
        string albumName,
        uint256 price
    );
     modifier ownerOnly() {
        require(msg.sender == owner, "Caller is not the owner");
        _; 
    }
    modifier validPrice(uint256 price) {
    require(price > 0, "Price must be greater than zero");
    _;
    }
    modifier royaltyRange(uint256 royaltyPercentage) {
    require(royaltyPercentage >= 0 && royaltyPercentage <= 100, "Royalty percentage out of range");
    _;
}


    struct Album {
        uint256 id;
        address artist;
        string artistName;
        string name;
        uint256 price;
        string uri;
    }
    struct ExclusiveAlbum {
    uint256 tokenId;
    address artist;
    string artistName;
    string name;
    uint256 price; // price in HarmonyTokens
    uint256 royaltyPercentage; // e.g. 10 for 10%
    string uri;
    }

    mapping(uint256 => ExclusiveAlbum) public exclusiveAlbums;  // tokenId to ExclusiveAlbum details
    mapping(uint256 => Album) public albums;  // albumId to Album details
    uint256 public nextAlbumId = 1;

 
    // Artist adds a new album and sets its price
    function addNewAlbum(string memory albumName, string memory artistName, uint256 price, string memory uri) public validPrice(price){
        Album memory newAlbum = Album({
            id: nextAlbumId,
            artist: msg.sender,
            artistName: artistName,
            name: albumName,
            price: price,
            uri: uri
        });

        albums[nextAlbumId] = newAlbum;
        nextAlbumId++;
        emit AlbumAdded(nextAlbumId, msg.sender, albumName, price);
    }
   function decimals() public view virtual returns (uint8) {
        return 18;
    }
   
    // User buys an album
    function buyAlbum(uint256 albumId) external payable{
       require(albums[albumId].artist != address(0), "Album doesn't exist");

    // Get the album price in the smallest unit of the token
    uint256 priceInSmallestUnit = albums[albumId].price * (10 ** decimals());

    require(harmonyToken.balanceOf(msg.sender) >= priceInSmallestUnit, "Insufficient balance");

    harmonyToken.transferHarmonyTokens(msg.sender, albums[albumId].artist, priceInSmallestUnit);
    albumBuyers[albumId].push(msg.sender);
    }

    // Artist adds an exclusive album represented by a MasterPieceToken
    function addExclusiveAlbum(string memory albumName, string memory artistName, uint256 price, uint256 royaltyPercentage, string memory uri) external returns (uint256){
        uint256 tokenId = masterpieceToken.mintMasterpieceToken(msg.sender, uri);
        exclusiveAlbumIds.push(tokenId);
        ExclusiveAlbum memory newAlbum = ExclusiveAlbum({
            tokenId: tokenId,
            artist: msg.sender,
            name: albumName,
            artistName: artistName,
            price: price,
            royaltyPercentage: royaltyPercentage,
            uri: uri
        });
        
        exclusiveAlbums[tokenId] = newAlbum;
        emit ExclusiveAlbumAdded(tokenId, msg.sender, albumName, price);
        return tokenId;
    }

    // User buys exclusive album (transfers the NFT ownership)
    function buyExclusiveAlbum(uint256 tokenId) external payable {
        require(masterpieceToken.ownerOf(tokenId) != msg.sender, "You already own this album");
        require(exclusiveAlbums[tokenId].artist != address(0), "Album doesn't exist");
        require(harmonyToken.balanceOf(msg.sender) >= exclusiveAlbums[tokenId].price, "Insufficient balance");
        
        address previousOwner = masterpieceToken.ownerOf(tokenId);
        address artist = exclusiveAlbums[tokenId].artist;
        uint256 priceInSmallestUnit = exclusiveAlbums[tokenId].price * (10 ** decimals());
        uint256 royaltyAmount = (priceInSmallestUnite * exclusiveAlbums[tokenId].royaltyPercentage) / 100;
        
        harmonyToken.transferHarmonyTokens(msg.sender, artist, royaltyAmount);
        harmonyToken.transferHarmonyTokens(msg.sender, previousOwner, priceInSmallestUnit - royaltyAmount);
               
        masterpieceToken.transferTokenOwnership(tokenId, msg.sender);
    }

    function getExclusiveAlbumIds() public view returns (uint256[] memory) {
        return exclusiveAlbumIds;
    }
 // Function to get all non-exclusive album IDs
    function getAllAlbumIds() public view returns (uint256[] memory) {
        uint256[] memory ids = new uint256[](nextAlbumId - 1);
        for (uint256 i = 1; i < nextAlbumId; i++) {
            ids[i - 1] = i;
        }
        return ids;
    }

     function hasBoughtAlbum(uint256 albumId, address user) public view returns (bool) {
        for (uint256 i = 0; i < albumBuyers[albumId].length; i++) {
            if (albumBuyers[albumId][i] == user) {
                return true;
            }
        }
        return false;
    }


    function rewardFan(
        address fan,
        uint256[] memory tokenIds,
        uint256[] memory amounts,
        bytes memory data
    ) public ownerOnly {
        require(tokenIds.length == amounts.length, "TokenIds and amounts length mismatch");

        // Mint the tokens to the owner before transferring
        _mintBatch(msg.sender, tokenIds, amounts, data);

        // Transfer the tokens from the contract to the fan
        safeBatchTransferFrom(msg.sender, fan, tokenIds, amounts, "0x0");
    }


}