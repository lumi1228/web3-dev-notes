# Tech Stack

## Smart Contracts (Solidity)

- Language: Solidity (0.8.22 – 0.8.28)
- Frameworks:
  - Hardhat 2 (L0 projects) — CommonJS, JavaScript config
  - Hardhat 3 (Part3-1-Solidity/demo-hardhat3) — ESM, TypeScript config
- Testing: Mocha + Chai (Hardhat 2), Mocha + Chai + ethers.js (Hardhat 3)
- Libraries: OpenZeppelin Contracts & Contracts-Upgradeable, Chainlink Contracts
- Deployment: hardhat-deploy plugin (L0), Hardhat Ignition (Hardhat 3)
- Upgrade Patterns: Transparent Proxy, UUPS (via @openzeppelin/hardhat-upgrades)
- Forge-std included in Hardhat 3 project for Foundry-style tests

## Frontend — Next.js

- Framework: Next.js 16 with App Router
- Language: TypeScript
- Styling: Tailwind CSS 4, PostCSS
- Linting: ESLint with eslint-config-next
- React: v19

## Frontend — React

- Bootstrapped with Create React App (react-scripts 5)
- Language: JavaScript
- React: v19
- Testing: Jest + React Testing Library

## Common Commands

### Hardhat 2 projects (L0/demoAuction, L0/nft, L0/projectDir)
```bash
npx hardhat compile          # Compile contracts
npx hardhat test             # Run tests
npx hardhat deploy           # Deploy via hardhat-deploy
npx hardhat node             # Start local node
```

### Hardhat 3 project (Part3-1-Solidity/demo-hardhat3)
```bash
npx hardhat compile          # Compile contracts
npx hardhat test             # Run Mocha tests
```

### Next.js (Part3-2-Next/next-demo)
```bash
npm run dev                  # Start dev server
npm run build                # Production build
npm run start                # Start production server
npm run lint                 # Run ESLint
```

### React (Part3-3-React/react-demo)
```bash
npm start                    # Start dev server
npm run build                # Production build
npm test                     # Run Jest tests
```
