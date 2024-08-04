// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@api3/contracts/api3-server-v1/proxies/interfaces/IProxy.sol";
import "@openzeppelin/contracts/access/Ownable.sol";// 4.9.3 solo para remix

contract API3PriceFeedExtended is Ownable(msg.sender) {

    address public ethUsdProxyAddress;
    address public usdArsProxyAddress;

    constructor() {}

    function setEthUsdProxyAddress(address _ethUsdProxyAddress) onlyOwner public {
        ethUsdProxyAddress = _ethUsdProxyAddress;
    }

    function setUsdArsProxyAddress(address _usdArsProxyAddress) onlyOwner public {
        usdArsProxyAddress = _usdArsProxyAddress;
    }

    function readDataFeed() public view returns (uint256 ethPriceInUsd, uint256 ethPriceInArs, uint256 timestamp) {
        // Obtener el precio de ETH en USD
        (int224 ethUsdValue, uint256 ethUsdTimestamp) = IProxy(ethUsdProxyAddress).read();
        uint256 ethPriceUsd = uint224(ethUsdValue);

        // Obtener el tipo de cambio USD a ARS
        (int224 usdArsValue, uint256 usdArsTimestamp) = IProxy(usdArsProxyAddress).read();
        uint256 usdPriceArs = uint224(usdArsValue);

        // Calcular el precio de ETH en ARS
        uint256 ethPriceArs = ethPriceUsd * usdPriceArs;

        // Utilizar el timestamp más reciente entre los dos
        uint256 latestTimestamp = ethUsdTimestamp > usdArsTimestamp ? ethUsdTimestamp : usdArsTimestamp;

        return (ethPriceUsd, ethPriceArs, latestTimestamp);
    }
}
