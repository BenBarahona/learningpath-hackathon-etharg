# Learning Path : Eth Argentina 2024

Learning Path is a gamified learning platform designed to address the challenge of identifying and rewarding builders for their contributions in blockchain protocols. It leverages blockchain technology to provide transparent, immutable records of user achievements and quest metrics, ensuring open and verifiable progress tracking. 

The platform incentivizes users to learn about blockchain technologies through interactive challenges, including multiple-choice quizzes, real-time oracle-validated responses, and timed competitions.

Administrators can configure various challenge types and reward pools, allowing protocols to identify talented builders while fostering an ecosystem where learning, contribution, and rewards are interconnected. By offering tangible incentives and community recognition, Learning Path delivers engaging education to users, helps protocols discover and nurture talent, and promotes their technology. 

This innovative approach contributes to expanding knowledge and aligning incentives within the blockchain ecosystem, all while maintaining a transparent and decentralized record of user accomplishments and quest performance.

- Devrels authenticate using [Zupass](https://github.com/proofcarryingdata/zupass) and it's ZK Proof Verifier
- ERC20 Token named PATH as a contribution metric for contributors
- Challenge system to reward users with ETH for burning PATH earned in challenges
- Different types of challenges that award users with ETH in different ways

## How it works
Users will first connect their existing wallets to the platform, where afterwards there will be options available to enter as a contributor, and play challenges in exchange for rewards in PATH, or Devrels in charge of the setup will authenticate with a verified Zupass Proof.

DevRels will be assigned a Zupass Ticket, which they will require to authenticate with to enter.  Only those with a valid ticket will provide the proof that will be verified via the frontend using Zupass's authenticate package [ZuAuth](https://www.npmjs.com/package/@pcd/zuauth).  This package verifies using ZK that the proof provided is actually from Zupass and has a valid Ticket ID, which was issued to the DevRel / Admin.

Once authenticated, DevRels/Admins will be able to create challenges so users can collect PATH.  Along with these challenges, they will create and fund Pools that will serve as bounties for users to burn earned PATH.  These challenges and bounties are created on a [Firebase](https://firebase.google.com/?gad_source=1&gclid=Cj0KCQjwzby1BhCQARIsAJ_0t5O__fYNyCoSykZQTNw-Df3atjA8nZaehHc_DvAH7GbSS-lquPHAy5caAva9EALw_wcB&gclsrc=aw.ds) database and on chain using Smart Contracts written in Solidity and deployed on the desired network, in this case Scroll Sepolia test network.

Regular users will be able to play these challenges that will consist on different types of modules, such as on chain Multiple Choice trivia, a voting scheme using MACI, and more.

## Tech Stacks
Frontend uses the following tech stacks:
- [NextJS](https://nextjs.org/)
- [Wagmi](https://wagmi.sh/)
- [ReactQuery](https://github.com/TanStack/query#readme)
- [ChakraUI](https://v2.chakra-ui.com/)
- [Zupass](https://github.com/proofcarryingdata/zupass)
- [Firebase](https://firebase.google.com/?gad_source=1&gclid=Cj0KCQjwzby1BhCQARIsAJ_0t5O__fYNyCoSykZQTNw-Df3atjA8nZaehHc_DvAH7GbSS-lquPHAy5caAva9EALw_wcB&gclsrc=aw.ds)

Smart Contracts are built with:
- Hardhat for contract deployment & contract verification
  

## Implementation Details

For Zupass Tickets, a Pipeline was created on [Zupass' PodBox](https://podbox.dev/#/pipelines/) for ticket issuance to DevRels / Admins that will create platform content.

The following smart contracts were created:
- ChallengeFactory: Factory contract that creates new challenges, based on different configuration types set by the admin.
- PathToken: ERC20 Token that will serve as platform currency.  PathToken also keeps track of the historic amount of PATH a user obtained, even after burning of PATH.
- PoolPrizeFactory: Factory contract that creates different types of pool prizes.
- PoolPrize: A Pool funded by the deployer, which can have different types of reward logics.  At the moment, only a Pool Prize (set amount per claim) is available, but the idea is to include different types of Pools such as a Quadratic or Pre-Determined types.
- API3PriceFeed: Oracle using API3 to consult current ETH value in USD
- API3PriceFeedExtended: Extension of Price Feed above, serving as a conversion contract for other currencies, such as Argentinian Pesos.
- PriceConsumerV3: Oracle using Chainlink to consult current ETH value in USD

Unfortunately the API3 and Chainlink cound not be used as we experienced problems when calling readDataFeed function calls.  For some reason the contract transaction got held up on confirmation.

## Verified Smart Contracts
[ChallengeFactory](https://sepolia.scrollscan.com/address/0x06Ec7986362De53Ab9DF64de9b20db22561634AE#code)
[PathToken](https://sepolia.scrollscan.com/address/0x5ff5A1286BE4040419285C15DDC2f2DB8313bF8F#code)
[PoolPrizeFactory](https://sepolia.scrollscan.com/address/0xe8B1361802F8caD3620F2f552b311Cb8f7529CfA#code)
[PoolPrize]()

## Quickstart

To get started, follow the steps below:

[Learning Path Github](https://github.com/BenBarahona/learningpath-hackathon-etharg/)

### Frontend
1. Navigate to frontend and install dependencies

```
cd frontend/
npm install
```

2. Start NextJS app:

```
npm run dev
```

App will run on localhost:3000

### Smart Contracts
1. Navigate to contracts folder and install dependencies

```
cd contracts/
```

2. Install Dependencies

```
npm install
```

3. Copy the .env.example file and name it .env   Make sure to fill in the values for each var on the created env file

```
cp .env.example .env
```

4. To deploy smart contracts, run

```
npm run deploy:network
```

Network sent must be configured in hardhat.config.js file on contracts folder


## Product Design

Design System:

[Design System](https://www.figma.com/design/4Rg80bsDQazHn8cIOsDTZI/Learning-Path---ETH-Argentina-Hackathon?node-id=0-1)

---

Userflows:

[Figjam with Userflows](https://www.figma.com/board/dPwrivH2zdyAk70P2LwChe/Learning-Path---ETH-Argentina-Hackathon?node-id=0-1&t=jIJk3FrLNIz128sr-1)

---

UI Design:

[Admin Onboarding UI](https://www.figma.com/design/4Rg80bsDQazHn8cIOsDTZI/Learning-Path---ETH-Argentina-Hackathon?node-id=139-13339&t=sTGRPpwn1WesAV2o-11)

[Admin Multiple-Choice Challenge Setup](https://www.figma.com/design/4Rg80bsDQazHn8cIOsDTZI/Learning-Path---ETH-Argentina-Hackathon?node-id=56-8882&t=sTGRPpwn1WesAV2o-11)

[Admin Pool Prize Setup UI](https://www.figma.com/design/4Rg80bsDQazHn8cIOsDTZI/Learning-Path---ETH-Argentina-Hackathon?node-id=77-1734&t=sTGRPpwn1WesAV2o-11)

[Player Onboarding UI](https://www.figma.com/design/4Rg80bsDQazHn8cIOsDTZI/Learning-Path---ETH-Argentina-Hackathon?node-id=77-1760&t=sTGRPpwn1WesAV2o-11)

[Player Multiple-Choice Game UI](https://www.figma.com/design/4Rg80bsDQazHn8cIOsDTZI/Learning-Path---ETH-Argentina-Hackathon?node-id=86-9032&t=sTGRPpwn1WesAV2o-11)

[Player Prize Pool Claiming UI](https://www.figma.com/design/4Rg80bsDQazHn8cIOsDTZI/Learning-Path---ETH-Argentina-Hackathon?node-id=86-9928&t=sTGRPpwn1WesAV2o-11)

---

Prototypes:

[Admin Onboarding Prototype](https://www.figma.com/proto/4Rg80bsDQazHn8cIOsDTZI/Learning-Path---ETH-Argentina-Hackathon?page-id=135%3A10052&node-id=135-10185&viewport=591%2C104%2C0.07&t=G7tq3RTPdCKVvHbk-9&scaling=scale-down&content-scaling=fixed&starting-point-node-id=135%3A10185&show-proto-sidebar=1)

[Admin Create Multiple-Choice Challenge Prototype](https://www.figma.com/proto/4Rg80bsDQazHn8cIOsDTZI/Learning-Path---ETH-Argentina-Hackathon?page-id=135%3A10052&node-id=135-10211&viewport=591%2C104%2C0.07&t=G7tq3RTPdCKVvHbk-9&scaling=scale-down&content-scaling=fixed&starting-point-node-id=135%3A10211&show-proto-sidebar=1)

[Admin Create Prize Pool Prototype](https://www.figma.com/proto/4Rg80bsDQazHn8cIOsDTZI/Learning-Path---ETH-Argentina-Hackathon?page-id=135%3A10052&node-id=135-11635&viewport=591%2C104%2C0.07&t=G7tq3RTPdCKVvHbk-9&scaling=scale-down&content-scaling=fixed&starting-point-node-id=135%3A11635&show-proto-sidebar=1)

[Player Onboarding Prototype](https://www.figma.com/proto/4Rg80bsDQazHn8cIOsDTZI/Learning-Path---ETH-Argentina-Hackathon?page-id=139%3A13557&node-id=139-15936&viewport=693%2C107%2C0.07&t=vFTWZEjIcuiwdl2P-9&scaling=scale-down&content-scaling=fixed&starting-point-node-id=139%3A15936&show-proto-sidebar=1)

[Player Multiple-Choice Game Prototype](https://www.figma.com/proto/4Rg80bsDQazHn8cIOsDTZI/Learning-Path---ETH-Argentina-Hackathon?page-id=139%3A13557&node-id=139-16268&viewport=693%2C107%2C0.07&t=vFTWZEjIcuiwdl2P-9&scaling=scale-down&content-scaling=fixed&starting-point-node-id=139%3A16268&show-proto-sidebar=1)

[Player Claim Pool Prize Prototype](https://www.figma.com/proto/4Rg80bsDQazHn8cIOsDTZI/Learning-Path---ETH-Argentina-Hackathon?page-id=139%3A13557&node-id=139-17364&viewport=693%2C107%2C0.07&t=vFTWZEjIcuiwdl2P-9&scaling=scale-down&content-scaling=fixed&starting-point-node-id=139%3A17364&show-proto-sidebar=1)

---

Pitch Decks:

[Pitch Deck Spanish](https://www.figma.com/deck/e5BSYu9Le4UWf2IvRp9gvL/ETH-Argentina-2024-Pitch---ES?node-id=1-32&viewport=-1452%2C-491%2C0.39&t=aRCiA0Zb8CW5za7G-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1)

[Pitch Deck English](https://www.figma.com/deck/3kWz9gn6qCPkW8BV86EBtW/ETH-Argentina-2024-Pitch---EN?node-id=1-32&viewport=232%2C19%2C0.41&t=u7aUFjsanm6VDbZy-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1)

## Video Demo

[Watch the video](https://www.loom.com/share/773c164e0e174d22a70ee61513680592?sid=1d9c17ec-0cf2-41b7-a771-0098443c0ac7)
[Pitch Video](https://www.loom.com/share/469c76dead0342e4ac864abec97ac7f8?sid=b666cbb3-ca2a-44a4-9e4a-5be12494111f)
