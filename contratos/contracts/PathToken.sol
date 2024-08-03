// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// contract PathToken is ERC20 {
//     constructor(uint256 initialSupply) ERC20("PathToken", "PATH") {
//         _mint(msg.sender, initialSupply);
//     }
// }


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LearningToken is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("PathToken", "PTH") {
        _mint(msg.sender, initialSupply);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) public onlyOwner {
        _burn(from, amount);
    }
}

