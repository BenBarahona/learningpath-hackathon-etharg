// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./PathToken.sol";

contract RewardConfig {
    LearningToken public token;

    struct RewardPool {
        uint256 totalTokens;
        uint256 claimedTokens;
    }

    RewardPool public rewardPool;

    constructor(address tokenAddress) {
        token = LearningToken(tokenAddress);
    }

    // Configura el pool de recompensas con un total de tokens
    function setRewardPool(uint256 _totalTokens) public {
        rewardPool.totalTokens = _totalTokens;
        rewardPool.claimedTokens = 0;
        token.mint(address(this), _totalTokens);
    }

    // Permite a los usuarios reclamar recompensas
    function claimReward(address _claimer, uint256 _amount) public {
        require(rewardPool.claimedTokens + _amount <= rewardPool.totalTokens, "Insufficient reward pool");
        rewardPool.claimedTokens += _amount;
        token.transfer(_claimer, _amount);
    }
}
