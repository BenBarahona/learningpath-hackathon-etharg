// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ChallengeConfig.sol";
import "./RewardConfig.sol";

contract GameManager {
    ChallengeConfig public challengeConfig;
    RewardConfig public rewardConfig;

    mapping(address => uint256) public userPoints;

    constructor(address _challengeConfig, address _rewardConfig) {
        challengeConfig = ChallengeConfig(_challengeConfig);
        rewardConfig = RewardConfig(_rewardConfig);
    }

    // Permite a un usuario participar en un desafío y ganar puntos si responde correctamente
    function participateInChallenge(uint256 _challengeId, uint256 _selectedOption) public {
        (, , uint256 correctOptionIndex) = challengeConfig.getChallenge(_challengeId);

        if (_selectedOption == correctOptionIndex) {
            userPoints[msg.sender] += 10; // Award points
        }
    }

    // Permite a un usuario reclamar sus recompensas usando puntos
    function claimReward(uint256 _pointsToClaim) public {
        require(userPoints[msg.sender] >= _pointsToClaim, "Insufficient points");

        userPoints[msg.sender] -= _pointsToClaim;
        rewardConfig.claimReward(msg.sender, _pointsToClaim);
    }
}
