// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//import "@api3/airnode-protocol/contracts/rrp/AirnodeRrpClient.sol";

contract ETHPriceFeed {//is AirnodeRrpClient {
    // address public airnode;
    // bytes32 public endpointId;
    // address public sponsorWallet;
    // uint256 public ethPrice;
    
    // event RequestedETHPrice(bytes32 indexed requestId);
    // event ReceivedETHPrice(bytes32 indexed requestId, uint256 ethPrice);

    // constructor(address _airnodeRrp, address _airnode, bytes32 _endpointId, address _sponsorWallet) 
    //     AirnodeRrpClient(_airnodeRrp) 
    // {
    //     airnode = _airnode;
    //     endpointId = _endpointId;
    //     sponsorWallet = _sponsorWallet;
    // }

    // function requestETHPrice() public {
    //     bytes32 requestId = airnodeRrp.makeFullRequest(
    //         airnode,
    //         endpointId,
    //         address(this),
    //         this.fulfill.selector,
    //         sponsorWallet,
    //         "",
    //         ""
    //     );
    //     emit RequestedETHPrice(requestId);
    // }

    // function fulfill(bytes32 requestId, bytes calldata data) external onlyAirnodeRrp {
    //     ethPrice = abi.decode(data, (uint256));
    //     emit ReceivedETHPrice(requestId, ethPrice);
    // }
}
