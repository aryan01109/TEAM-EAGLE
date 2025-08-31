contract.methods.getCredits().call()
  .then(credits => {
    console.log("All Credits:", credits);
  });