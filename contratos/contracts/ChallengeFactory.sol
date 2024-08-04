// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
//import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./PathToken.sol";

contract ChallengeFactory {
    
    struct Challenge {
        uint256 challengeId;
        uint256 tokenAmountRequired;
        uint256 totalReward;
        uint256 totalQuestions;
        mapping(address => bool) users;
    }

    //Map that saves which users completed challenges
    mapping (uint256 => Challenge) challenges;
    PathToken public pathToken;

    event ChallengeCreated (uint256 indexed _challengeID, address indexed _challengeCreator);
    event ChallengeCompleted (uint256 indexed _challengeID, address indexed _user);

    address public owner; // Factory creator

    constructor (address _pathToken) {
        owner = msg.sender;
        pathToken = PathToken(_pathToken);
    }

    function CreateMultipleChoiceChallenge(uint256 firebaseId, uint256 tokenAmountRequired, uint256 totalReward, uint256 totalQuestions) public {
        challenges[firebaseId].challengeId = firebaseId;
        challenges[firebaseId].tokenAmountRequired = tokenAmountRequired;
        challenges[firebaseId].totalReward = totalReward;
        challenges[firebaseId].totalQuestions = totalQuestions;

        emit ChallengeCreated ( firebaseId, msg.sender );
    }

    function userCompletedChallenge(address user, uint256 challengeId, uint256 correctAnswers) public {

        challenges[challengeId].users[user] = true;
        uint256 tokensPerAnswer = challenges[challengeId].totalReward / challenges[challengeId].totalQuestions;
        uint256 amountToReward = tokensPerAnswer * correctAnswers;
        pathToken.mint(user, amountToReward);

        emit ChallengeCompleted(challengeId, user);
    }

    function userHasCompletedChallenge(address user, uint256 challengeId) public view returns (bool hasCompleted) {
        return challenges[challengeId].users[user];
    }

    function getChallengeReward(uint256 challengeId) public view returns (uint256 challenge){
        return challenges[challengeId].totalReward;
    }
}