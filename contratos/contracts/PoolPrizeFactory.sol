// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./PoolPrize.sol";

contract PoolPrizeFactory {

    address public owner; // Factory creator

    event PoolPrizeCreated (address indexed _poolPrizeAddress, address indexed _poolPrizeCreator);

    constructor () {
        owner = msg.sender;
    }

    function createPoolPrize(address _pathToken, string memory _poolFirebaseId, uint256 _tokenRequired, uint256 _prizePerUser, uint256 _tokenToBurn) public {
        emit PoolPrizeCreated( (address)(new PoolPrize(_pathToken, _poolFirebaseId, _tokenRequired, _prizePerUser, _tokenToBurn)), msg.sender);
    }
}