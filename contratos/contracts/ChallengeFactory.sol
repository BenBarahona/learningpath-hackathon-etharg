// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './MultipleChoice.sol';

contract ChallengeFactory {
    
    address public owner; // Factory creator

    constructor (address factoryOwner) {
        owner = factoryOwner;
    }

}