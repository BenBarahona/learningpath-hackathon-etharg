// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./PathToken.sol";

contract PoolPrize {

    PathToken public pathToken;
    address public admin;
    
    bytes32 poolId;
    uint256 tokenAmountRequired;
    mapping(address => bool) public hasClaimed;
    uint256 prizePerUser;
    uint256 usersClaimed;
    uint256 totalClaimableUsers;
    uint256 tokenToBurn;

    event Received(address, uint);

    constructor(address _pathToken, string memory _poolFirebaseId, uint256 _tokenRequired, uint256 _prizePerUser, uint256 _tokenToBurn) payable {
        admin = msg.sender;
        poolId = keccak256(bytes(_poolFirebaseId));
        pathToken = PathToken(_pathToken);
        tokenAmountRequired = _tokenRequired;
        prizePerUser = _prizePerUser;
        //totalClaimableUsers = msg.value / prizePerUser;
        tokenToBurn = _tokenToBurn;

        //emit PoolCreated( address(this), keccak256(bytes(_poolFirebaseId)), msg.value);
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    function setPathToken(address _pathToken) {
        require(msg.sender == admin, "NOT OWNER");
        pathToken = _pathToken;
    }

    receive() external payable {
        totalClaimableUsers = msg.value / prizePerUser;
        emit Received(msg.sender, msg.value);
    }

    function claimPrize(address user) public
    {
        require(canClaimPrize(user), "INSUFICIENT_PATH_OR_USER_ALREADY_CLAIMED");
        usersClaimed++;
        hasClaimed[user] = true;
        pathToken.burn(user, tokenToBurn);
        (bool sent, bytes memory data) = address(user).call{ value: prizePerUser }("");
        data;

        require(sent, "Failed to claim funds");
    }

    function canClaimPrize(address user) public view returns (bool canClaim)
    {
        uint256 historicalPath = pathToken.getHistorical(user);
        return historicalPath >= tokenAmountRequired && hasClaimed[user] == false;
    }

    function withdraw() payable public {
        require(msg.sender == admin, "Must be deployer");
        (bool sent, bytes memory data) = address(this).call{ value: address(this).balance }("");
        data;

        require(sent, "Failed to withdraw funds");
    }
}