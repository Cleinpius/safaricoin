import SHA256 from 'crypto-js/sha256.js';

class Block {
  constructor(timestamp, transactions, previousHash = '', nonce = 0) {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = nonce;
  }

  calculateHash() {
    return SHA256(this.timestamp + this.previousHash + JSON.stringify(this.transactions) + this.nonce).toString();
  }

  // Proof-of-Work method
  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log("BLOCK MINED: " + this.hash);
  }

  hasValidTransactions(){
    for(const tx of this.transactions){
      if(!tx.isValid()){
        return false;
      }
    }

    return true;
  }
}

export default Block;
