// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PathToken is ERC20, Ownable(msg.sender) {

    mapping(address => address) private owners;
    mapping (address => uint256) private historicalTokens;

    constructor() ERC20("PathToken", "PATH") {
        // for (uint256 i = 0; i < _owners.length; ++i) {
        //     owners[_owners[i]] = _owners[i];
        // }
    }

    function addOwner(address _owner) public {
        owners[_owner] = _owner;
    }

    function mint(address to, uint256 amount) public {
        require(owners[msg.sender] == msg.sender, "DOES_NOT_HAVE_OWNER_ROLE");
        _mint(to, amount);
        historicalTokens[to] += amount;
    }

    function burn(address from, uint256 amount) public {
        _burn(from, amount);
    }

    function getHistorical(address user) public view returns (uint256 amount){
        return historicalTokens[user];
    }
}

