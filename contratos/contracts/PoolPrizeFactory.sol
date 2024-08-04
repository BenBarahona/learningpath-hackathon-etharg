// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./PoolPrize.sol";

contract PoolPrizeFactory {

    address public owner; // Factory creator
    //mapping (address => address) public poolPrices;
    address[] poolPrizes;

    event PoolPrizeCreated (address indexed _poolPrizeAddress, address indexed _poolPrizeCreator);

    constructor () {
        owner = msg.sender;
    }

    function createPoolPrize(address _pathToken, string memory _poolFirebaseId, uint256 _tokenRequired, uint256 _prizePerUser, uint256 _tokenToBurn) public payable {
        address pool = (address)(new PoolPrize(_pathToken, _poolFirebaseId, _tokenRequired, _prizePerUser, _tokenToBurn));
        
        (bool success, ) = pool.call{value: msg.value}("");
        require(success, "Payment failed.");
        poolPrizes.push(pool);
        emit PoolPrizeCreated( pool, msg.sender);
    }

    function getPoolPrizes() public view returns (address[] memory)
    {
        return poolPrizes;
    }
}