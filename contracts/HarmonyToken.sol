// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

interface IHarmonyToken {
    // Since the interface only includes external functions

    // This function allows buying tokens with ETH
    function buyTokens() external payable;

    // Function to buy an album, paying with HarmonyToken
    function buyAlbum(address recipient, uint256 amount) external payable;

    // Function to transfer HarmonyTokens
    function transferTokens(address recipient, uint256 amount) external;

    // Function to transfer HarmonyTokens (seems duplicate, consider removing one)
    function transferHarmonyTokens(address recipient, uint256 amount) external;

    function balanceOf(address account) external view returns (uint256);
    // Declaration of the transferFrom function
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}
contract HarmonyToken is ERC20 {

    address public minter;
    uint256 public constant tokenPrice = 1000000000000000 wei; 


    constructor() ERC20("Harmony Token", "HMT") {
        minter = msg.sender;
        _mint(msg.sender, 10000000 * (10 ** uint256(decimals())));
    }
     // Buy tokens with ETH
    function buyTokens() external payable {
        require(msg.value > 0, "Ether value cannot be 0");
        uint256 amountToBuy = (msg.value / tokenPrice)* 10 ** decimals();
        require(balanceOf(minter) >= amountToBuy, "Insufficient balance");
        _transfer(minter, msg.sender, amountToBuy);
    }
    function buyAlbum(address recipient, uint256 amount) external payable  {
        require(amount > 0, "Amount must be greater than zero");
        require(balanceOf(msg.sender) >= amount, "Insufficient HT balance");

        // Transfer HT tokens from the buyer to the recipient (song creator).
        _transfer(msg.sender, recipient, amount);
    }

     function transferTokens(address recipient, uint256 amount) external {
        _transfer(msg.sender, recipient, amount);
    }
    receive() external payable {}

    function transferHarmonyTokens(address recipient, uint256 amount) external{
        _transfer(msg.sender, recipient,amount);
    }
     // Withdraw ETH from the contract (only owner)
    function withdrawETH() external {
        require(msg.sender == minter, "Only the owner can withdraw ETH");
        payable(minter).transfer(address(this).balance);
    }
}