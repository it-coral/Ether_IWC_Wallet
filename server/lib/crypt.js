var crypto      = require('crypto');
var config      = require('../../config.js');
const authy     = require('authy')(config.API_KEY);

const web3      = config.web3;

exports.encrypt = function(_text, _pass){
  var algorithm  = 'aes-256-ctr';
  var cipher     = crypto.createCipher(algorithm, _pass)
  var crypted    = cipher.update(_text,'utf8','hex')
  crypted       += cipher.final('hex');
  return crypted;
}
 
exports.decrypt = function(_text, _pass){
  var algorithm     = 'aes-256-ctr';
  var decipher      = crypto.createDecipher(algorithm, _pass)
  var dec           = decipher.update(_text,'hex','utf8')
  dec              += decipher.final('utf8');
  return dec;
}



exports.hashPW = function (pwd) {
    return crypto.createHash('sha256').update(pwd).digest('base64').toString();
}

exports.createKeys = function(){
    var testAcc = web3.eth.accounts.create();
    //console.log(testAcc);
    console.log(testAcc.privateKey);
    console.log(testAcc.address);

    var keys = {
        pubKey:  testAcc.address,
        privKey: testAcc.privateKey
    };
  return keys;
}
