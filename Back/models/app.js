// Check if MetaMask is available
if (typeof window.ethereum !== 'undefined') {
  console.log('MetaMask is available!');
  const web3 = new Web3(window.ethereum);

  // Request accounts from MetaMask
  window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
    const userAddress = accounts[0];
    console.log('Connected account:', userAddress);
  });

  // Connect to the contract
  const contractAddress = 'YOUR_CONTRACT_ADDRESS';
  const abi = YOUR_CONTRACT_ABI; // Replace with actual ABI of your contract

  const contract = new web3.eth.Contract(abi, contractAddress);

  // Call contract functions
  async function issueCredit(id, volume) {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.issueCredit(id, volume, accounts[0]).send({ from: accounts[0] });
  }

  // Example: Call function on button click
  document.querySelector('#issue-credit-btn').addEventListener('click', () => {
    issueCredit('CRED-001', 50); // Issue a new credit with ID 'CRED-001' and volume 50
  });
} else {
  console.log('MetaMask is not installed');
}
