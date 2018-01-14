var crypto      = require('crypto');
var mongoose    = require('mongoose');
var User        = mongoose.model('User');
var config      = require('../../config.js');
var qs          = require('qs');
const authy     = require('authy')(config.API_KEY);
const crypt     = require('../lib/crypt');
const Web3      = require('web3');
const web3       = config.web3;

const Tx    = require('ethereumjs-tx');

const privKey     = 'c45dbc643583bceaf0c4a7ae82bf31ab75cd18fe11198cf334abef2debe796aa';
const addressFrom = '0xb3bD2766928Be029BeB24d23Cf7F88798232537f';

// the destination address
const addressTo   = '0x5Be0E52bbe27e08F29467c712d7ff4cda8E75842';

// Signs the given transaction data and sends it. Abstracts some of the details 
// of buffering and serializing the transaction for web3.

const txData = {};

    
function sendSigned(encPrivKey, req, txData, cb) {
    
    // const privateKey  = new Buffer(crypt.decrypt(encPrivKey, req.body.pass).slice(2).toUpperCase(), 'hex');
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

        User.findOne({_id: req.params.userId}) 
        .exec(function (err, user) {
            if (!user) {
                err = 'User Not Found';
            } else{
                // construct the transaction data
                // const txData = {
                //     nonce: txCount,
                //     // gas: req.body.maxGas,
                //     gas: req.body.maxGas,
                //     gasPrice: req.body.gasP, // 10 Gwei
                //     to:       req.body.addressTo,
                //     from:     addressFrom,
                //     // value:    web3.utils.toHex(web3.utils.toWei("0.000000", 'ether'))
                // };

                var myContract = config.TokenABI;
                myContract.options.from = addressFrom;
                const txData = {
                    nonce: txCount,
                    value: '0x0', 
                    from: addressFrom,
                    gas: req.body.maxGas,
                    gasPrice: req.body.gasP, // 10 Gwei
                    to: myContract._address,
                    data: myContract.methods.transfer(req.body.AddressTo, req.body.ETH).encodeABI(),  
                }
                //   fire away!
                sendSigned(user.privKey, req, txData, function(err, result) {
                    if (err) return console.log('error', err);  
                    console.log('sent', result);
                });
            }

            if (err) {
                res.status(500).json(err);
            }
        })
        

    });

};


exports.getGasPrice = function (req, res) {
    // Get gas price here

    var addressTo = req.body.addressTo;
    var ETH = req.body.ETH;
    
    web3.eth.getGasPrice()
    .then((price)=>{

        res.json({price: price, amount: 40000});
        // const txData = {
        //     to:       req.body.addressTo,
        //     from:     addressFrom,
        // };

        // var myContract = config.TokenABI;
        // myContract.options.from = addressFrom;

        // // var contractData = myContract.new.getData(someparam, another, {data: contractCode});

        // web3.eth.estimateGas(
        // {
        //     from: addressFrom,
        //     to: req.body.addressTo, 
        //     data: web3.utils.toHex(txData)
        // })
        // .then(function(gasAmount){
        //     res.json({price: price, amount: gasAmount});
        // })
        // .catch(function(error){
        //     console.log(error)
        // });
    });
};