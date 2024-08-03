const hre = require("hardhat");

async function main() {
  try {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    //Deploy challenge factory
    const ChallengeFactory = await ethers.getContractFactory("ChallengeFactory");
    const challengeFactory = await ChallengeFactory.deploy(deployer);
    console.log("ChallengeFactory deployed to:", challengeFactory.address)
    
    //Deploying PATH token, with factory as a owner
    const PathToken = await ethers.getContractFactory("PathToken");
    const pathToken = await PathToken.deploy(challengeFactory.address);
    console.log("PathToken deployed to:", pathToken.address);

    
    const ETHPriceFeed = await ethers.getContractFactory("ETHPriceFeed");
    const ethPriceFeed = await ETHPriceFeed.deploy(
      "csdcsdcsd",  // dire de tu Airnode
      "csdcdscsdcds",     // mi Endpoint ID
      "csdcdsdscsd"   // dire de tu Sponsor Wallet
    );
    console.log("Deploying contracts with the account:", deployer.address);
    
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();

// async function main() {
//     const [deployer] = await ethers.getSigners();
  
//     console.log("Deploying contracts with the account:", deployer.address);
  
//     const initialSupply = ethers.utils.parseUnits("1000000", 18); // 1 millón de tokennnnn???? jaja los que sean

//     const PathToken = await ethers.getContractFactory("PathToken");
//     const pathToken = await PathToken.deploy(initialSupply);
//     console.log("PathToken deployed to:", pathToken.address);

//     // const LearningToken = await ethers.getContractFactory("LearningToken");
//     // const learningToken = await LearningToken.deploy(initialSupply);
//     // console.log("LearningToken deployed to:", learningToken.address);
  
//     // const ChallengeConfig = await ethers.getContractFactory("ChallengeConfig");
//     // const challengeConfig = await ChallengeConfig.deploy();
//     // console.log("ChallengeConfig deployed to:", challengeConfig.address);
  
//     // const RewardConfig = await ethers.getContractFactory("RewardConfig");
//     // const rewardConfig = await RewardConfig.deploy(learningToken.address);
//     // console.log("RewardConfig deployed to:", rewardConfig.address);
  
//     // const GameManager = await ethers.getContractFactory("GameManager");
//     // const gameManager = await GameManager.deploy(challengeConfig.address, rewardConfig.address);
//     // console.log("GameManager deployed to:", gameManager.address);
//   }
  
//   main()
//     .then(() => process.exit(0))
//     .catch(error => {
//       console.error(error);
//       process.exit(1);
//     });
  