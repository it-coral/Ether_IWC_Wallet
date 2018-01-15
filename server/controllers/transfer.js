var crypto      = require('crypto');
var mongoose    = require('mongoose');
var User        = mongoose.model('User');
var config      = require('../../config.js');
var qs          = require('qs');
const authy     = require('authy')(config.API_KEY);
const crypt     = require('../lib/crypt');
const Web3      = require('web3');
const web3      = config.web3;

const Tx        = require('ethereumjs-tx');

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
    displayTokenBalance();
    displayETHBalance();   
    res.json({  ETHBalance: 10, 
        IWCBalance: 10});
};

exports.transferIWC = function (req, res) {

    // get the number of transactions sent so far so we can create a fresh nonce
    web3.eth.getTransactionCount(addressFrom).then(txCount => {

        User.findOne({_id: req.params.userId}) 
        .exec(function (err, user) {
            if (!user) {
                err = 'User Not Found';
            } else{

                var myContract  = config.TokenABI;
                
                var IWCAmount   = web3.utils.toWei(req.body.IWC.toString(10), "ether");

                const txData    = {
                    nonce:      web3.utils.toHex(txCount),
                    value:      web3.utils.numberToHex(web3.utils.toWei('0', 'ether')), 
                    from:       addressFrom,
                    gas:        web3.utils.toHex(req.body.maxGas),
                    gasPrice:   web3.utils.toHex(req.body.gasP), 
                    to:         myContract._address,
                    data:       myContract.methods.transfer(req.body.AddressTo,IWCAmount).encodeABI(),
                    chainId:    web3.utils.toHex(1)
                }

                //   fire away!
                sendSigned(user.privKey, req, txData, function(err, result) {
                    if (err) return console.log('error', err);  
                    console.log('sent', result);
                    res.json({message: "The transaction is on its way."});
                });
            }

            if (err) {
                res.status(500).json(err);
            }
        })
        

    });
};

exports.buyIWC = function (req, res) {

    // get the number of transactions sent so far so we can create a fresh nonce
    web3.eth.getTransactionCount(addressFrom).then(txCount => {

        User.findOne({_id: req.params.userId}) 
        .exec(function (err, user) {
            if (!user) {
                err = 'User Not Found';
            } else{

                var myContract  = config.SalesABI;
                
                var ETHAmount   = web3.utils.toWei(req.body.ETHBuy.toString(10), "ether");

                if(req.body.Beneficary == "" || typeof req.body.Beneficary == "undefined"){
                    var Beneficary  = addressFrom;
                }else{
                    var Beneficary  = req.body.Beneficary;
                }

                const txData    = {
                    nonce:      web3.utils.toHex(txCount),
                    value:      web3.utils.numberToHex(ETHAmount), 
                    from:       addressFrom,
                    gas:        web3.utils.toHex(req.body.maxGas),
                    gasPrice:   web3.utils.toHex(req.body.gasP), 
                    to:         myContract._address,
                    data:       myContract.methods.buyTokens(Beneficary).encodeABI(),
                    chainId:    web3.utils.toHex(1)
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

exports.transferETH = function (req, res) {

    // get the number of transactions sent so far so we can create a fresh nonce
    web3.eth.getTransactionCount(addressFrom).then(txCount => {

        User.findOne({_id: req.params.userId}) 
        .exec(function (err, user) {
            if (!user) {
                err = 'User Not Found';
            } else{

                var myContract  = config.SalesABI;
                
                var ETHAmount   = web3.utils.toWei(req.body.ETH.toString(10), "ether");

                const txData    = {
                    nonce:      web3.utils.toHex(txCount),
                    value:      web3.utils.numberToHex(ETHAmount), 
                    from:       addressFrom,
                    gas:        web3.utils.toHex(req.body.maxGas),
                    gasPrice:   web3.utils.toHex(req.body.gasP), 
                    to:         req.body.ETHAddr,
                    chainId:    web3.utils.toHex(1)
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

    web3.eth.getGasPrice().then((price)=>{
        // if transaction xxx need to give different gas prices back!
        res.json({  price: price,
                    maxGas: 160001});
    });
       
};

exports.showBalances = function(req, res) {
    var ETHBalance;
    var TokenBalance;
    displayETHBalance().then(resp => {
        ETHBalance = resp;
        displayTokenBalance().then(rest => {
            TokenBalance = rest;
            res.json({  ETHBalance: web3.utils.fromWei(ETHBalance, 'ether'), 
                        IWCBalance: web3.utils.fromWei(TokenBalance, 'ether')});        
        })
    })
    
};


// update this every x seconds
function displayTokenBalance() {
    var myContract  = config.TokenABI;
    // web3.eth.call({
    //     to: addressFrom,
    //     data: myContract.methods.balanceOf(addressFrom).encodeABI()
    // }).then(balance => {
    //     console.log(balance);
    // });

    return myContract.methods.balanceOf(addressFrom).call();
    /*,(_err,_resp) => {
    if (_err != null) {
        console.log(_err);
    } else {
        console.log(_resp);
    }
});*/
}

// update this every x seconds
function displayETHBalance() {
    return web3.eth.getBalance(addressFrom);
//   web3.eth.getBalance(addressFrom,(_err,_resp) => {
//     if (_err != null) {
//       console.log(_err);
//   } else {
//       console.log(_resp);
//   }
// });
}