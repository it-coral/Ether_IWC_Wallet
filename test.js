var crypto      = require('crypto');
var config      = require('./config.js');
var qs          = require('qs');
const authy     = require('authy')(config.API_KEY);

const Web3      = require('web3');
const web3       = config.web3;

const Tx    = require('ethereumjs-tx');

// the address that will send the test transaction
const addressFrom = '0xb3bD2766928Be029BeB24d23Cf7F88798232537f';
const privKey     = 'c45dbc643583bceaf0c4a7ae82bf31ab75cd18fe11198cf334abef2debe796aa';

// the destination address
const addressTo   = '0x5Be0E52bbe27e08F29467c712d7ff4cda8E75842';

// Signs the given transaction data and sends it. Abstracts some of the details 
// of buffering and serializing the transaction for web3.


    
function sendSigned(txData, cb) {
  const privateKey  = new Buffer(privKey, 'hex');
  const transaction = new Tx(txData);
  transaction.sign(privateKey);
  const serializedTx = transaction.serialize().toString('hex');
  web3.eth.sendSignedTransaction('0x' + serializedTx, cb);
}


var ETH = 1;

var myContract = config.TokenABI;
myContract.options.from = addressFrom;

web3.eth.getGasPrice()
.then((price)=>{
    const txData = {
        // gasPrice: price, // 10 Gwei
        to:       addressTo,
        from:     addressFrom,
    };
    var myContract = config.TokenABI;

    myContract.options.from = addressFrom;
    // set up transaction
    var res = myContract.methods.transfer.getData(addressTo,'1');
    console.log(res);

    web3.eth.estimateGas(
    {
        from: addressFrom,
        to: addressTo, 
        data: web3.utils.toHex(txData)
    })
    .then(function(gasAmount){
        res.json({price: price, amount: gasAmount});
    })
    .catch(function(error){
        console.log(error);
    });
});