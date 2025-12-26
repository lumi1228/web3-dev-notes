import React, { createContext, useContext, useState, useEffect } from 'react';
import Web3 from 'web3';

const Web3Context = createContext();

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};

export const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
    }
  }, []);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAccount(accounts[0]);
        setIsConnected(true);
        
        // 加载合约
        const contractABI = require('../contracts/DonationContract.json').abi;
        const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // 替换为实际地址
        const contractInstance = new web3.eth.Contract(contractABI, contractAddress);
        setContract(contractInstance);
      } else {
        alert('请安装MetaMask钱包');
      }
    } catch (error) {
      console.error('连接钱包失败:', error);
    }
  };

  const value = {
    web3,
    account,
    contract,
    isConnected,
    connectWallet,
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
};