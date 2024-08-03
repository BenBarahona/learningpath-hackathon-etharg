// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PrizePool {
    ERC20 public pathToken;
    address public admin;
    mapping(address => bool) public hasClaimed;

    constructor(address _pathToken) {
        admin = msg.sender;
        pathToken = ERC20(_pathToken);
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    function distributePrize(address[] memory winners, uint256 amount) public onlyAdmin {
        for (uint i = 0; i < winners.length; i++) {
            if (!hasClaimed[winners[i]]) {
                pathToken.transfer(winners[i], amount);
                hasClaimed[winners[i]] = true;
            }
        }
    }
}

