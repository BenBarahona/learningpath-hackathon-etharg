// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
//import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./PathToken.sol";

contract ChallengeFactory {
    
    struct Challenge {
        string challengeId;
        uint256 tokenAmountRequired;
        uint256 totalReward;
        uint256 totalQuestions;
        mapping(address => bool) users;
    }

    //Map that saves which users completed challenges
    mapping (bytes32 => Challenge) challenges;
    PathToken public pathToken;

    event ChallengeCreated (bytes32 indexed _challengeID, address indexed _challengeCreator);
    event ChallengeCompleted (bytes32 indexed _challengeID, address indexed _user);

    address public owner; // Factory creator

    constructor (address _pathToken) {
        owner = msg.sender;
        pathToken = PathToken(_pathToken);
    }

    function CreateMultipleChoiceChallenge(string memory firebaseId, uint256 tokenAmountRequired, uint256 totalReward, uint256 totalQuestions) public {
        
        bytes32 firebaseKey = keccak256(bytes(firebaseId));
        challenges[firebaseKey].challengeId = firebaseId;
        challenges[firebaseKey].tokenAmountRequired = tokenAmountRequired;
        challenges[firebaseKey].totalReward = totalReward;
        challenges[firebaseKey].totalQuestions = totalQuestions;

        emit ChallengeCreated ( firebaseKey, msg.sender );
    }

    function userCompletedChallenge(address user, string memory challengeId, uint256 correctAnswers) public {
        bytes32 challengeKey = keccak256(bytes(challengeId));
        uint256 userHistoric = pathToken.getHistorical(user);

        //require user has not completed challenge before
        require(challenges[challengeKey].users[user] == false, "USER_ALREADY_COMPLETED_CHALLENGE");
        //Require user have at least required token
        require(challenges[challengeKey].tokenAmountRequired <= userHistoric, "USER_DOES_NOT_HAVE_REQUIRED_TOKENS");

        
        challenges[challengeKey].users[user] = true;
        uint256 tokensPerAnswer = challenges[challengeKey].totalReward / challenges[challengeKey].totalQuestions;
        uint256 amountToReward = tokensPerAnswer * correctAnswers;
        pathToken.mint(user, amountToReward);

        emit ChallengeCompleted(challengeKey, user);
    }

    function userHasCompletedChallenge(address user, string memory challengeId) public view returns (bool hasCompleted) {
        bytes32 challengeKey = keccak256(bytes(challengeId));
        return challenges[challengeKey].users[user];
    }

    function getChallengeReward(string memory challengeId) public view returns (uint256 challenge){
        bytes32 challengeKey = keccak256(bytes(challengeId));
        return challenges[challengeKey].totalReward;
    }

    function getRequiredTokensForChallenge(string memory challengeId) public view returns (uint256 requiredTokens){
        bytes32 challengeKey = keccak256(bytes(challengeId));
        return challenges[challengeKey].tokenAmountRequired;
    }
}