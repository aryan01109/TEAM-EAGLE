const web3 = new Web3(window.ethereum);
window.ethereum.request({ method: 'eth_requestAccounts' })
  .then(accounts => {
    const account = accounts[0];
    console.log("Connected Account:", account);
  })
  .catch(err => console.error("Error connecting to MetaMask:", err));