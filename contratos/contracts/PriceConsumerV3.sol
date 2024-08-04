// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {
    AggregatorV3Interface internal priceFeed;

    constructor(address _priceFeed) {  // la dire del contrato de chainlink 
        priceFeed = AggregatorV3Interface(_priceFeed);
    }

    function getLatestPrice() public view returns (int) {
        (, int price,,,) = priceFeed.latestRoundData(); // devuelve una tupla de valores, roundId, answer, etc
        return price;
    }

    function convertEthToUsd(int256 ethAmount) public view returns (int256) {
        int256 ethToUsdPrice = getLatestPrice();
        return (ethAmount * ethToUsdPrice) / (10 ** 8); 
    }

    function convertEthToArs(int256 ethAmount, int256 usdToArsRate) public view returns (int256) {
        int256 ethToUsd = convertEthToUsd(ethAmount);
        return (ethToUsd * usdToArsRate) / (10 ** 8); 
    }
}
