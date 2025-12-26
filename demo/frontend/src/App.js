import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { Web3Provider, useWeb3 } from './components/Web3Provider';

function DonationApp() {
  const { account, contract, isConnected, connectWallet } = useWeb3();
  const [donationAmount, setDonationAmount] = useState('');
  const [donationMessage, setDonationMessage] = useState('');
  const [contractBalance, setContractBalance] = useState('0');
  const [donationCount, setDonationCount] = useState(0);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: 'info' });

  useEffect(() => {
    if (contract && isConnected) {
      loadContractData();
    }
  }, [contract, isConnected]);

  const loadContractData = async () => {
    try {
      const balance = await contract.methods.getContractBalance().call();
      const count = await contract.methods.getDonationCount().call();
      
      setContractBalance(web3.utils.fromWei(balance, 'ether'));
      setDonationCount(count);
      
      // 加载最近的捐赠记录
      const recentDonations = [];
      for (let i = Math.max(0, count - 5); i < count; i++) {
        const donation = await contract.methods.getDonation(i).call();
        recentDonations.push({
          donor: donation.donor,
          amount: web3.utils.fromWei(donation.amount, 'ether'),
          message: donation.message,
          timestamp: new Date(donation.timestamp * 1000).toLocaleString(),
        });
      }
      setDonations(recentDonations.reverse());
    } catch (error) {
      console.error('加载合约数据失败:', error);
    }
  };

  const handleDonate = async () => {
    if (!donationAmount || donationAmount <= 0) {
      showAlert('请输入有效的捐赠金额', 'error');
      return;
    }

    setLoading(true);
    try {
      const amountInWei = web3.utils.toWei(donationAmount, 'ether');
      await contract.methods.donate(donationMessage || '感谢您的捐赠！')
        .send({ from: account, value: amountInWei });
      
      showAlert('捐赠成功！', 'success');
      setDonationAmount('');
      setDonationMessage('');
      loadContractData();
    } catch (error) {
      console.error('捐赠失败:', error);
      showAlert('捐赠失败，请重试', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    setLoading(true);
    try {
      await contract.methods.withdraw().send({ from: account });
      showAlert('提取成功！', 'success');
      loadContractData();
    } catch (error) {
      console.error('提取失败:', error);
      showAlert('提取失败，请重试', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ show: false, message: '', type: 'info' });
    }, 3000);
  };

  if (!isConnected) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        flexDirection="column"
      >
        <Typography variant="h4" gutterBottom>
          讨饭合约 DApp
        </Typography>
        <Typography variant="h6" gutterBottom>
          请连接您的钱包开始使用
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={connectWallet}
          sx={{ mt: 2 }}
        >
          连接钱包
        </Button>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            讨饭合约 DApp
          </Typography>
          <Typography variant="body1">
            账户: {account?.slice(0, 6)}...{account?.slice(-4)}
          </Typography>
        </Toolbar>
      </AppBar>

      {alert.show && (
        <Alert severity={alert.type} sx={{ mt: 2 }}>
          {alert.message}
        </Alert>
      )}

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* 合约统计 */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                合约统计
              </Typography>
              <Typography variant="body1">
                总余额: {contractBalance} ETH
              </Typography>
              <Typography variant="body1">
                捐赠次数: {donationCount}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleWithdraw}
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? <CircularProgress size={20} /> : '提取资金'}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* 捐赠表单 */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                发送捐赠
              </Typography>
              <TextField
                fullWidth
                label="捐赠金额 (ETH)"
                type="number"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="留言 (可选)"
                multiline
                rows={3}
                value={donationMessage}
                onChange={(e) => setDonationMessage(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                fullWidth
                onClick={handleDonate}
                disabled={loading}
              >
                {loading ? <CircularProgress size={20} /> : '发送捐赠'}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* 最近捐赠记录 */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                最近捐赠记录
              </Typography>
              <List>
                {donations.map((donation, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText
                        primary={`${donation.amount} ETH - ${donation.message}`}
                        secondary={`捐赠者: ${donation.donor.slice(0, 6)}...${donation.donor.slice(-4)} | 时间: ${donation.timestamp}`}
                      />
                    </ListItem>
                    {index < donations.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

function App() {
  return (
    <Web3Provider>
      <DonationApp />
    </Web3Provider>
  );
}

export default App;