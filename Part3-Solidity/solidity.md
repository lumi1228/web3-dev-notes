
# solidity「区块链与智能合约初识」

## solidity类型

值类型：
* 布尔 bool 「ture、 false」
* 整型 uint8-uint256（正整数） 、int8-int256（整数(包含负数)）
* 定长浮点数 fixed(符号) ufixed(无符号)
* 定长字节数组 bytes(长度) address是20字节的定长数组
* 枚举 enum 

引用类型：

* 数组 array 
  * 定长数组：uint[3]、uint[3]
  * 不定长数组：uint[]
* 结构体 struct
* 映射 mapping mapping(keyType => valueType)

 数据位置
* stoarge ： 存储在区块链上，永久保存
* meomory ： 存储在内存中，只在函数调用期间存在
* calldata ： 存储在内存中，只在函数调用期间存在


## 表达式和控制结构

#### 变量的作用域
* 状态变量: 存储在合约中（链上），永久保存
* 局部变量: 函数内部定义的变量，存储在内存中
* 全局变量：合约外定义的变量

### 常量和不可变量

### 函数

### 修饰器 modifiers

### 控制流
* if-else
* 三元


## 事件与异常

### EVM的交易回执

### 事件 event

### 异常 
* require
* revert
* assert
* try-catch

### 自定义错误 error

### 获取 revert 信息


## 区块和交易


### 区块和交易全局变量

区块全局变量
* blockhash(uint blockNumber): (bytes32)
* block.gaslimit: (uint)
* block.number: (uint)
* block.timestamp: (uint)

交易全局变量
* gasleft(): (uint256)
* msg.data: (bytes calldata)
* msg.sender: (address payable)
* msg.value: (uint)当前交易发送的 wei 值

### 数学密码学全局函数

数学全局函数
* addmod(uint x, uint y, uint k) returns (uint)
* mulmod(uint x, uint y, uint k)returns (uint)

密码学全局函数
* keccak256(...) returns (bytes32)
* sha256(...) returns (bytes32)
* sha3(...) returns (bytes32)
* ripemd160(...) returns (bytes20)
* ecrecover(bytes32 hash, uint8 v, bytes32 r,
* bytes32 s) returns (address)



## 抽象合约 abstract

> 抽象合约是允许包含未实现的函数的智能合约，
> 关键字是abstract，未实现的函数需要加 virtual 关键字
> 抽象合约不能被部署，但是可以被其他合约继承

### 接口

示例：ERC20、 IERC125、ERC721

### 继承 is

合约可以继承

### 子类调用父类的方法
* super.get()
* Father.get()

### 函数重载
* 名字相同但是输入参数不同的函数可以同时存在，被视为不同的函数


## 库合约

> 提升代码复杂和减少gas


### import 导入


### OpenZeppelin
OpenZeppelin 是一个在 Solidity 开发中广泛使用的开源框架，提供了一套用于构建和管理智能合约的工具和库，特别是在以太坊和 EVM 兼容链平台上。
它为开发者提供了安全、可重用和经过审计的智能合约模块，帮助加快开发过程并减少安全风险。

常用的库合约：Strings、Address、Create2 Array
常用的接口和抽象合约：IERC20/ERC20、IERC721/ERC721、IERC1155/ERC1155、Proxy、AccessControl、Ownerable



## ETH 的接收和发送

### 地址
普通地址
Payable地址

### 发送以太币
* tranfate
* send
* call

### 接收以太币
* 外部账户不需要处理，自动到账
* 合约账户


## 合约的创建和调用

### 创建合约
* create： 使用New
* create2

### 调用合约
* import
* call 可以自定义gas和value

### 删除合约
* selfdestruct 命令可以用来删除智能合约，并将该合约剩余ETH转到指定地址。
* 不建议使用 selfdestruct

## 函数选择器

### 函数签名

### abi编码与解码

### call函数
* call
* staticcall
* delegatecall
* 

### 内联汇编
* 主要编写库函数和代理函数