# Learning Path: Gamified Blockchain Education 🚀

## Description

Learning Path is a gamified learning platform designed to address the challenge of identifying and rewarding builders for their contributions in blockchain protocols. It leverages blockchain technology to provide transparent, immutable records of user achievements and quest metrics, ensuring open and verifiable progress tracking.

The platform incentivizes users to learn about blockchain technologies through interactive challenges, including multiple-choice quizzes, real-time oracle-validated responses, and timed competitions. Administrators can configure various challenge types and reward pools, allowing protocols to identify talented builders while fostering an ecosystem where learning, contribution, and rewards are interconnected.

By offering tangible incentives and community recognition, Learning Path delivers engaging education to users, helps protocols discover and nurture talent, and promotes their technology. This innovative approach contributes to expanding knowledge and aligning incentives within the blockchain ecosystem, all while maintaining a transparent and decentralized record of user accomplishments and quest performance.

## Project Structure

The project is divided into two main components:

1. Frontend
2. Contracts

### Frontend

The frontend is built using Next.js and contains the following key files and directories:

- `app/`: Application components and pages
- `public/`: Static assets
- `src/`: Source code
- `contract-abi/`: ABI files for smart contract interaction
- Configuration files: `next.config.mjs`, `postcss.config.mjs`, `tailwind.config.ts`, `tsconfig.json`

### Contracts

The `contracts/` directory contains the following smart contracts:

1. `ChallengeFactory.sol`: Manages the creation and completion of challenges
2. `PathToken.sol`: ERC20 token implementation for the platform
3. `PrizePool.sol`: Handles prize distribution to winners

## Key Features

- 🎮 Gamified learning experiences
- 🔗 Blockchain-based achievement tracking
- 🧠 Multiple challenge types (quizzes, timed competitions, etc.)
- 🪙 Token-based reward system
- ⚙️ Admin configuration for challenges and reward pools

## Getting Started

### Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/)
- [Docker](https://www.docker.com/products/docker-desktop)
- [DevContainer extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) by Microsoft (ms-vscode-remote.remote-containers)

### Running the Project

1. Clone the repository:
   ```
   git clone https://github.com/BenBarahona/learningpath-hackathon-etharg.git
   ```

2. Open the project folder in Visual Studio Code

3. Ensure Docker is running on your system

4. Open the Command Palette (Ctrl+Shift+P or Cmd+Shift+P) and select "Remote-Containers: Reopen in Container"

5. Wait for the container to build and start

> **Note:** For more information on DevContainers, check out this [article on development environments](https://blog.theredguild.org/where-do-you-run-your-code/).

### Development Environment

The project uses a custom DevContainer setup with the following tools and frameworks:

- Solidity development tools (solc-select, Slither, Medusa)
- Foundry framework
- Node.js, npm, yarn, and pnpm
- Rust and Go programming languages
- ZSH shell with Oh-My-ZSH

## Smart Contracts

### ChallengeFactory.sol

Manages the creation and completion of challenges. Key functions:

- `CreateMultipleChoiceChallenge`: Create a new challenge
- `userCompletedChallenge`: Mark a challenge as completed by a user
- `userHasCompletedChallenge`: Check if a user has completed a challenge

### PathToken.sol

ERC20 token implementation for the platform. Features:

- Minting and burning functions
- Historical token tracking

### PrizePool.sol

Handles prize distribution to winners. Main function:

- `distributePrize`: Distribute prizes to winners

## Design and Workflows

- [Admin Onboarding Flow](https://www.figma.com/design/4Rg80bsDQazHn8cIOsDTZI/Learning-Path---ETH-Argentina-Hackathon?node-id=48-6949&t=g7z58GYowBp6vt1W-11)
- [Admin Multiple-Choice Challenge Setup](https://www.figma.com/design/4Rg80bsDQazHn8cIOsDTZI/Learning-Path---ETH-Argentina-Hackathon?node-id=56-8882&t=g7z58GYowBp6vt1W-11)
- [Admin Pool Prize Setup](https://www.figma.com/design/4Rg80bsDQazHn8cIOsDTZI/Learning-Path---ETH-Argentina-Hackathon?node-id=77-1734&t=g7z58GYowBp6vt1W-11)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Links

- [GitHub Repository](https://github.com/BenBarahona/learningpath-hackathon-etharg)