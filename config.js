
const Web3      = require('web3');
var web3 		= undefined;

if(typeof Web3 !== 'undefined'){
    // var web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/Jyx239pRohZuGJFJlLmf"));
    var web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/Jyx239pRohZuGJFJlLmf"));
    console.log('Found web3!');
}else{
    console.log("No web3!");
}

var TokenAddress = '0x84332b82575cd4a7bac7a5df08a9712e78ff7d1f';
var TokenABI = new web3.eth.Contract([{
	"constant": true,
	"inputs": [],
	"name": "mintingFinished",
	"outputs": [{
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "name",
	"outputs": [{
		"name": "",
		"type": "string"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"name": "_spender",
		"type": "address"
	}, {
		"name": "_value",
		"type": "uint256"
	}],
	"name": "approve",
	"outputs": [{
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "totalSupply",
	"outputs": [{
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"name": "_from",
		"type": "address"
	}, {
		"name": "_to",
		"type": "address"
	}, {
		"name": "_value",
		"type": "uint256"
	}],
	"name": "transferFrom",
	"outputs": [{
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "decimals",
	"outputs": [{
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"name": "_to",
		"type": "address"
	}, {
		"name": "_amount",
		"type": "uint256"
	}],
	"name": "mint",
	"outputs": [{
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"name": "_spender",
		"type": "address"
	}, {
		"name": "_subtractedValue",
		"type": "uint256"
	}],
	"name": "decreaseApproval",
	"outputs": [{
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"name": "_owner",
		"type": "address"
	}],
	"name": "balanceOf",
	"outputs": [{
		"name": "balance",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": false,
	"inputs": [],
	"name": "finishMinting",
	"outputs": [{
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "owner",
	"outputs": [{
		"name": "",
		"type": "address"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"name": "_to",
		"type": "address"
	}, {
		"name": "_amount",
		"type": "uint256"
	}],
	"name": "ICOmint",
	"outputs": [{
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "symbol",
	"outputs": [{
		"name": "",
		"type": "string"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"name": "_salesContract",
		"type": "address"
	}],
	"name": "setSalesContract",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"name": "_to",
		"type": "address"
	}, {
		"name": "_value",
		"type": "uint256"
	}],
	"name": "transfer",
	"outputs": [{
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "salesContract",
	"outputs": [{
		"name": "",
		"type": "address"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"name": "_spender",
		"type": "address"
	}, {
		"name": "_addedValue",
		"type": "uint256"
	}],
	"name": "increaseApproval",
	"outputs": [{
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"name": "_owner",
		"type": "address"
	}, {
		"name": "_spender",
		"type": "address"
	}],
	"name": "allowance",
	"outputs": [{
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"name": "newOwner",
		"type": "address"
	}],
	"name": "transferOwnership",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"name": "to",
		"type": "address"
	}, {
		"indexed": false,
		"name": "amount",
		"type": "uint256"
	}],
	"name": "Mint",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [],
	"name": "MintFinished",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"name": "previousOwner",
		"type": "address"
	}, {
		"indexed": true,
		"name": "newOwner",
		"type": "address"
	}],
	"name": "OwnershipTransferred",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"name": "owner",
		"type": "address"
	}, {
		"indexed": true,
		"name": "spender",
		"type": "address"
	}, {
		"indexed": false,
		"name": "value",
		"type": "uint256"
	}],
	"name": "Approval",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"name": "from",
		"type": "address"
	}, {
		"indexed": true,
		"name": "to",
		"type": "address"
	}, {
		"indexed": false,
		"name": "value",
		"type": "uint256"
	}],
	"name": "Transfer",
	"type": "event"
}], TokenAddress);

// var TokenContract = TokenABI.at(TokenAddress);

// var SalesABI = web3.eth.contract([{
// 	"constant": false,
// 	"inputs": [],
// 	"name": "withdrawFunds",
// 	"outputs": [],
// 	"payable": false,
// 	"stateMutability": "nonpayable",
// 	"type": "function"
// }, {
// 	"constant": true,
// 	"inputs": [],
// 	"name": "tokenRaised",
// 	"outputs": [{
// 		"name": "",
// 		"type": "uint256"
// 	}],
// 	"payable": false,
// 	"stateMutability": "view",
// 	"type": "function"
// }, {
// 	"constant": true,
// 	"inputs": [],
// 	"name": "weiRaised",
// 	"outputs": [{
// 		"name": "",
// 		"type": "uint256"
// 	}],
// 	"payable": false,
// 	"stateMutability": "view",
// 	"type": "function"
// }, {
// 	"constant": true,
// 	"inputs": [],
// 	"name": "wallet",
// 	"outputs": [{
// 		"name": "",
// 		"type": "address"
// 	}],
// 	"payable": false,
// 	"stateMutability": "view",
// 	"type": "function"
// }, {
// 	"constant": true,
// 	"inputs": [],
// 	"name": "stopped",
// 	"outputs": [{
// 		"name": "",
// 		"type": "bool"
// 	}],
// 	"payable": false,
// 	"stateMutability": "view",
// 	"type": "function"
// }, {
// 	"constant": true,
// 	"inputs": [],
// 	"name": "owner",
// 	"outputs": [{
// 		"name": "",
// 		"type": "address"
// 	}],
// 	"payable": false,
// 	"stateMutability": "view",
// 	"type": "function"
// }, {
// 	"constant": false,
// 	"inputs": [],
// 	"name": "shutThatShitDown",
// 	"outputs": [],
// 	"payable": false,
// 	"stateMutability": "nonpayable",
// 	"type": "function"
// }, {
// 	"constant": true,
// 	"inputs": [],
// 	"name": "currentTier",
// 	"outputs": [{
// 		"name": "",
// 		"type": "uint256"
// 	}],
// 	"payable": false,
// 	"stateMutability": "view",
// 	"type": "function"
// }, {
// 	"constant": true,
// 	"inputs": [{
// 		"name": "",
// 		"type": "uint256"
// 	}],
// 	"name": "rate",
// 	"outputs": [{
// 		"name": "",
// 		"type": "uint256"
// 	}],
// 	"payable": false,
// 	"stateMutability": "view",
// 	"type": "function"
// }, {
// 	"constant": false,
// 	"inputs": [{
// 		"name": "beneficiary",
// 		"type": "address"
// 	}],
// 	"name": "buyTokens",
// 	"outputs": [],
// 	"payable": true,
// 	"stateMutability": "payable",
// 	"type": "function"
// }, {
// 	"constant": true,
// 	"inputs": [],
// 	"name": "token",
// 	"outputs": [{
// 		"name": "",
// 		"type": "address"
// 	}],
// 	"payable": false,
// 	"stateMutability": "view",
// 	"type": "function"
// }, {
// 	"constant": true,
// 	"inputs": [{
// 		"name": "",
// 		"type": "uint256"
// 	}],
// 	"name": "cap",
// 	"outputs": [{
// 		"name": "",
// 		"type": "uint256"
// 	}],
// 	"payable": false,
// 	"stateMutability": "view",
// 	"type": "function"
// }, {
// 	"inputs": [{
// 		"name": "_wallet",
// 		"type": "address"
// 	}, {
// 		"name": "_token",
// 		"type": "address"
// 	}],
// 	"payable": false,
// 	"stateMutability": "nonpayable",
// 	"type": "constructor"
// }, {
// 	"payable": true,
// 	"stateMutability": "payable",
// 	"type": "fallback"
// }, {
// 	"anonymous": false,
// 	"inputs": [{
// 		"indexed": true,
// 		"name": "purchaser",
// 		"type": "address"
// 	}, {
// 		"indexed": true,
// 		"name": "beneficiary",
// 		"type": "address"
// 	}, {
// 		"indexed": false,
// 		"name": "value",
// 		"type": "uint256"
// 	}, {
// 		"indexed": false,
// 		"name": "amount",
// 		"type": "uint256"
// 	}],
// 	"name": "TokenPurchase",
// 	"type": "event"
// }]);
// var SalesAddress = '';
// var SalesContract = SalesABI.at(SalesAddress);
module.exports = {
	web3: web3,
    PORT: process.env.SIMPLE_DEMO_PORT,
    API_KEY: process.env.DEMO_AUTHY_API_KEY,
    SECRET: "SUPERSECRETSECRET",
    MONGO_CONNECTION: process.env.MONGO_CONNECTION,
    TokenABI: TokenABI,
    TokenAddress: TokenAddress,
	// TokenContract: TokenContract,
	// SalesABI: SalesABI,
	// SalesAddress: SalesAddress,
	// SalesContract:  SalesContract
};