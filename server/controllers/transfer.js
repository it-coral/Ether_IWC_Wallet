var crypto      = require('crypto');
var mongoose    = require('mongoose');
var User        = mongoose.model('User');
var config      = require('../../config.js');
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

exports.test = function(req, res) {
}

exports.transfer = function (req, res) {

    // get the number of transactions sent so far so we can create a fresh nonce
    web3.eth.getTransactionCount(addressFrom).then(txCount => {
      // construct the transaction data
      const txData = {
        nonce: txCount,
        gas: req.body.maxGas,
        // gas: 4000000,
        gasPrice: req.body.gasP, // 10 Gwei
        to:       req.body.addressTo,
        from:     addressFrom,
        // value:    web3.utils.toHex(web3.utils.toWei("0.000000", 'ether'))
      };

      // fire away!
    //   sendSigned(txData, function(err, result) {
    //     if (err) return console.log('error', err);
    //     console.log('sent', result);
    //   });

    });

};


exports.getGasPrice = function (req, res) {
    // Get gas price here

    var addressTo = req.body.addressTo;
    var ETH = req.body.ETH;

    var myContract = config.TokenABI;
    myContract.options.from = addressFrom;
    web3.eth.getGasPrice()
    .then((price)=>{

        web3.eth.estimateGas(
            {
                from: addressFrom,
                to: "0xc4abd0339eb8d57087278718986382264244252f", 
                data: "0xc6888fa10000000000000000000000000000000000000000000000000000000000000003"
            })
        .then(function(gasAmount){
            res.json({price: price, amount: gasAmount});
        })
        .catch(function(error){
            
        });
    });
};