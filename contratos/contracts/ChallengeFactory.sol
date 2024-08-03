// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ChallengeFactory {
    
    struct Challenge {
        uint256 challengeID;
        uint256 tokenAmountRequired;
        uint256 totalReward;
        uint256 totalAnswers;
        address[] usersCompleted;
    }

    //Map that saves which users completed challenges
    mapping (uint256 => address[]) usersCompleted;
    mapping (uint256 => Challenge) challenges;
    ERC20 public pathToken;

    event ChallengeCreated (uint256 indexed _challengeID, address indexed _challengeCreator);
    event ChallengeCompleted (uint256 indexed _challengeID, address indexed _user);

    address public owner; // Factory creator

    constructor (address _pathToken) {
        owner = msg.sender;
        pathToken = ERC20(_pathToken);
    }

    function CreateMultipleChoiceChallenge(uint256 firebaseId, uint256 tokenAmountRequired, uint256 totalReward, uint256 totalQuestions) public {
        challenges[firebaseId].challengeId = firebaseId;
        challenges[firebaseId].tokenAmountRequired = tokenAmountRequired;
        challenges[firebaseId].totalReward = totalReward;
        challenges[firebaseId].totalQuestions = totalQuestions;

        emit ChallengeCreated ( firebaseId, msg.sender );
    }

    function userCompletedChallenge(address user, uint256 challengeId, uint256 correctAnswers){
        Challenge challenge = challenge[challengeId];

        uint256 tokensPerAnswer = challenge.totalAnswers / challenge.totalReward;
        uint256 amountToReward = tokensPerAnswer * correctAnswers;
        pathToken.mint(user, amountToReward);

        usersCompleted[challengeId].push(user);

        emit ChallengeCompleted(challengeId, user);
    }

    function userHasCompletedChallenge(address user, uint256 challengeId) public view returns bool {

    }
}