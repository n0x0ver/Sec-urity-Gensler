const ethers = require('ethers');

// Genera 5 wallet Ethereum casuali
for (let i = 0; i < 5; i++) {
  const wallet = ethers.Wallet.createRandom();
  console.log(`Wallet ${i + 1}:`);
  console.log(`Address: ${wallet.address}`);
  console.log(`Private Key: ${wallet.privateKey}`);
  console.log(`Mnemonic: ${wallet.mnemonic.phrase}\n`);
}
