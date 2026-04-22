# Project Structure

This is a monorepo-style learning workspace. Each top-level folder represents a learning phase or topic area. Sub-projects are self-contained with their own `package.json` and `node_modules`.

```
.
├── L0/                              # Phase 0: Blockchain fundamentals
│   ├── assignment/                  # Written assignments & Solidity exercises
│   │   └── 2.Solidity经典用例作业/    # Basic Solidity contracts (HelloWorld, Counter, etc.)
│   ├── demoAuction/                 # Hardhat 2 — NFT Auction (Transparent Proxy upgrade)
│   │   ├── contracts/               # Solidity sources + test helpers
│   │   ├── deploy/                  # hardhat-deploy scripts
│   │   └── test/                    # JS test files
│   ├── nft/                         # Hardhat 2 — NFT Auction (UUPS + Transparent Proxy)
│   │   ├── contracts/               # Solidity sources (ERC20, Auction, UUPS)
│   │   ├── deploy/                  # hardhat-deploy scripts
│   │   └── test/                    # JS test files
│   └── projectDir/                  # Hardhat 2 — Token contracts (RccToken, MyFirstToken)
│       ├── contracts/               # Solidity sources
│       └── ignition/                # Hardhat Ignition deployment modules
│
├── L1/                              # Phase 1: Advanced topics (in progress)
│   └── assignment/
│
├── Part1-业务了解/                    # Business domain learning notes
├── Part2-概念扫盲/                    # Blockchain concept primers
│
├── Part3-1-Solidity/                # Solidity deep-dive
│   ├── *.md                         # Lecture notes (EVM, data types, etc.)
│   └── demo-hardhat3/               # Hardhat 3 (ESM + TypeScript)
│       ├── contracts/               # Counter.sol, Counter.t.sol
│       ├── test/                    # TypeScript tests
│       └── scripts/                 # Deployment/interaction scripts
│
├── Part3-2-Next/                    # Next.js learning
│   ├── *.md                         # Lecture notes (routing, RSC, CSR, layouts)
│   └── next-demo/                   # Next.js 16 App Router project
│       ├── app/                     # App Router pages & layouts
│       ├── components/              # Shared React components
│       └── pages/                   # Pages Router (legacy/comparison)
│
├── Part3-3-React/                   # React fundamentals
│   └── react-demo/                  # Create React App project
│       ├── src/                     # App source (JS)
│       └── public/                  # Static assets
│
├── P3.md                            # Phase 3 curriculum overview & task list
└── README.md                        # Repo title
```

## Conventions

- Each sub-project is independent — always `cd` into the project directory before running commands
- Hardhat 2 projects use CommonJS (`require`) and `.js` config files
- Hardhat 3 project uses ESM (`import`) and `.ts` config
- Smart contract test helpers (e.g., TestERC721.sol) live in `contracts/test/`
- Deploy scripts are numbered sequentially (01_, 02_, 03_)
- Documentation files use Chinese filenames with numbered prefixes
