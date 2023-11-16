// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MasterPieceToken is ERC721URIStorage {
    uint256 private _tokenIdTracker;
    address public musicPlatformInteractor;

    constructor() ERC721("MasterPieceToken", "MPT") {
        musicPlatformInteractor = msg.sender;
        _tokenIdTracker = 0;
    }

    function mintMasterpieceToken(address artist, string memory uri) external returns (uint256) {
        _tokenIdTracker += 1;
        uint256 newTokenId = _tokenIdTracker;
        _mint(artist, newTokenId);
        _setTokenURI(newTokenId, uri);
        return newTokenId;
    }

    function transferTokenOwnership(uint256 tokenId, address newOwner) external {
        // require(_exists(tokenId), "ERC721: operator query for nonexistent token");
        // require(ownerOf(tokenId) == msg.sender, "ERC721: transfer of token that is not own");
        _transfer(ownerOf(tokenId), newOwner, tokenId);
    }

    modifier onlyMusicPlatformInteractor() {
        require(msg.sender == musicPlatformInteractor, "Only the MusicPlatformInteractor can call this");
        _;
    }

    function setMusicPlatformInteractor(address _musicPlatformInteractor) external onlyMusicPlatformInteractor {
        require(musicPlatformInteractor == address(0), "MusicPlatformInteractor is already set");
        musicPlatformInteractor = _musicPlatformInteractor;
    }
}
