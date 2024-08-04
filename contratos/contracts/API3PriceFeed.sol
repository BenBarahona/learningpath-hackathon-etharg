// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@api3/contracts/api3-server-v1/proxies/interfaces/IProxy.sol";
import "@openzeppelin/contracts@4.9.3/access/Ownable.sol";// 4.9.3 solo para remix

contract API3PriceFeed is Ownable {

    address public proxyAddress;

    constructor() {}

    function setProxyAddress(address _proxyAddress) onlyOwner public {
        proxyAddress = _proxyAddress;
    }

    function readDataFeed() public view returns (uint256, uint256) {
        (int224 value, uint256 timestamp) = IProxy(proxyAddress).read();
        // convertir precio a uin256
        uint256 price = uint224(value);
        return (price, timestamp);
    }

}