async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    const initialSupply = ethers.utils.parseUnits("1000000", 18); // 1 millón de tokennnnn???? jaja los que sean
  
    const LearningToken = await ethers.getContractFactory("LearningToken");
    const learningToken = await LearningToken.deploy(initialSupply);
    console.log("LearningToken deployed to:", learningToken.address);
  
    const ChallengeConfig = await ethers.getContractFactory("ChallengeConfig");
    const challengeConfig = await ChallengeConfig.deploy();
    console.log("ChallengeConfig deployed to:", challengeConfig.address);
  
    const RewardConfig = await ethers.getContractFactory("RewardConfig");
    const rewardConfig = await RewardConfig.deploy(learningToken.address);
    console.log("RewardConfig deployed to:", rewardConfig.address);
  
    const GameManager = await ethers.getContractFactory("GameManager");
    const gameManager = await GameManager.deploy(challengeConfig.address, rewardConfig.address);
    console.log("GameManager deployed to:", gameManager.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  