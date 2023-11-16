// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract HarmonyToken is ERC20 {
    constructor() ERC20("Harmony Token", "HMT") {
        _mint(msg.sender, 10000000 * (10 ** uint256(decimals())));
    }

    function buyAlbum(address recipient, uint256 amount) external payable  {
        require(amount > 0, "Amount must be greater than zero");
        require(balanceOf(msg.sender) >= amount, "Insufficient HT balance");

        // Transfer HT tokens from the buyer to the recipient (song creator).
        _transfer(msg.sender, recipient, amount);
    }
}