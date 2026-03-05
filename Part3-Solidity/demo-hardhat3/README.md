# Hardhat 3 示例项目 (`mocha` 和 `ethers`)

本项目展示了一个使用 `mocha` 进行测试和 `ethers` 库进行以太坊交互的 Hardhat 3 Beta 项目。

要了解更多关于 Hardhat 3 Beta 的信息,请访问 [入门指南](https://hardhat.org/docs/getting-started#getting-started-with-hardhat-3)。如需分享反馈,请加入我们的 [Hardhat 3 Beta](https://hardhat.org/hardhat3-beta-telegram-group) Telegram 群组或在 GitHub 问题跟踪器中[提交问题](https://github.com/NomicFoundation/hardhat/issues/new)。

## 项目概述

本示例项目包含:

- 简单的 Hardhat 配置文件
- 兼容 Foundry 的 Solidity 单元测试
- 使用 `mocha` 和 ethers.js 的 TypeScript 集成测试
- 演示如何连接不同类型网络的示例,包括本地模拟 OP 主网

## 📁 项目结构详解

```
demo-hardhat3/
│
├── 📂 contracts/              # 存放所有 Solidity 智能合约
│   ├── Counter.sol            # .sol 文件和 .t.sol 测试文件
│   └── Counter.t.sol          # 示例: Counter.sol
│
├── 📂 scripts/                # 命令式部署脚本（简单、灵活）
│   └── send-op-tx.ts          # 使用 ethers.js 直接编写
│                              # 适合一次性任务和简单交互
│
├── 📂 test/                   # 单元测试文件目录
│   └── Counter.ts             # TypeScript/JavaScript 或 Solidity 测试
│                              # 使用 Mocha + Chai
│
├── 📂 ignition/               # 声明式部署系统（生产推荐）
│   └── modules/               # 自动管理状态和依赖
│       └── Counter.ts         # 可重复部署配置
│
├── 📄 hardhat.config.ts       # Hardhat 主配置文件
├── 📄 package.json            # 项目依赖和脚本配置
├── 📄 tsconfig.json           # TypeScript 编译配置
└── 📄 README.md               # 项目说明文档
```


### 📋 目录详细说明

#### `contracts/` - 智能合约目录
存放所有 Solidity 智能合约
- **.sol 文件**: 智能合约源代码
- **.t.sol 文件**: Solidity 测试文件
- **示例**: Counter.sol - 简单的计数器合约

#### `scripts/` - 脚本目录
**命令式部署脚本**
- 使用 ethers.js/viem 直接编写部署逻辑
- 适合简单、一次性的部署和交互任务
- 灵活度高，可以编写任意逻辑
- 示例：发送交易、调用合约方法、查询状态等

#### `ignition/` - Ignition 部署模块
**声明式部署系统**
- Hardhat 官方推荐的部署工具
- 适合复杂的、可重复的合约部署场景
- 自动管理部署状态和依赖关系
- 支持部署后自动调用合约方法
- 可以在不同网络间复用部署配置
- 提供部署历史记录和回滚能力

**两者区别对比：**

| 特性 | scripts/ | ignition/ |
|------|----------|-----------|
| 编写方式 | 命令式（手动控制流程） | 声明式（描述期望状态） |
| 适用场景 | 简单脚本、一次性任务 | 生产环境部署、多网络部署 |
| 状态管理 | 需要手动管理 | 自动管理部署状态 |
| 可重复性 | 需要自己实现 | 内置支持 |
| 依赖处理 | 手动处理 | 自动解析依赖 |

#### `test/` - 测试目录
单元测试文件目录
- 支持 TypeScript/JavaScript 或 Solidity 测试
- 使用 Mocha + Chai 测试框架

## 使用方法

### 运行测试

要运行项目中的所有测试,请执行以下命令:

```shell
npx hardhat test
```

你也可以选择性地运行 Solidity 或 mocha 测试:

```shell
npx hardhat test solidity
npx hardhat test mocha
```

### 部署到 Sepolia 测试网

本项目包含一个示例 Ignition 模块来部署合约。你可以将此模块部署到本地模拟链或 Sepolia 测试网。

要部署到本地链:

```shell
npx hardhat ignition deploy ignition/modules/Counter.ts
```

要部署到 Sepolia,你需要一个有资金的账户来发送交易。提供的 Hardhat 配置包含一个名为 `SEPOLIA_PRIVATE_KEY` 的配置变量,你可以使用它来设置要使用的账户私钥。

你可以使用 `hardhat-keystore` 插件或通过设置环境变量来设置 `SEPOLIA_PRIVATE_KEY` 变量。

使用 hardhat-keystore 设置 SEPOLIA_PRIVATE_KEY 配置变量:

```shell
npx hardhat keystore set SEPOLIA_PRIVATE_KEY
```

设置变量后,你可以使用 Sepolia 网络运行部署:

```shell
npx hardhat ignition deploy --network sepolia ignition/modules/Counter.ts
```