const hre = require("hardhat");

async function main() {
  try {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // //Deploying PATH token, with factory as a owner
    // const PathToken = await ethers.getContractFactory("PathToken");
    // const pathToken = await PathToken.deploy();
    // console.log("PathToken:", pathToken.address);

    // //Deploy challenge factory
    const ChallengeFactory = await ethers.getContractFactory("ChallengeFactory");
    const challengeFactory = await ChallengeFactory.deploy("0x7019Ddf4A14Caaf33babef107908F80E3EBd123F");
    console.log("ChallengeFactory:", challengeFactory.address)
  
    //Deploy PoolPrizeFactory
    // const PoolPrizeFactory = await ethers.getContractFactory("PoolPrizeFactory");
    // const poolPrizeFactory = await PoolPrizeFactory.deploy();
    // console.log("PoolPrizeFactory:", poolPrizeFactory.address);

    // // Deploy chainlink 
    // const PriceConsumerV3 = await ethers.getContractFactory("PriceConsumerV3");
    // const priceFeedAddress = ""; // Dire del oraculo de Chainlink a buscar hardcodeada
    // const priceConsumerV3 = await PriceConsumerV3.deploy(priceFeedAddress);
    // await priceConsumerV3.deployed();
    // console.log("PriceConsumerV3:", priceConsumerV3.address);

    // const API3PriceFeed = await ethers.getContractFactory("API3PriceFeed");
    // const api3PriceFeed = await API3PriceFeed.attach(contractAddress);

    // const [price, timestamp] = await api3PriceFeed.readDataFeed();
    // console.log("Price:", price.toString());
    // console.log("Timestamp:", timestamp.toString());

    // const ETHPriceFeed = await ethers.getContractFactory("ETHPriceFeed");
    // const ethPriceFeed = await ETHPriceFeed.deploy(
    //   "csdcsdcsd",  // dire de tu Airnode
    //   "csdcdscsdcds",     // mi Endpoint ID
    //   "csdcdsdscsd"   // dire de tu Sponsor Wallet
    // );
    
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
  