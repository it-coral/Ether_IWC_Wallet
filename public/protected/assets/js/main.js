'use strict';

/******/(function (modules) {
	// webpackBootstrap
	/******/ // The module cache
	/******/var installedModules = {};

	/******/ // The require function
	/******/function __webpack_require__(moduleId) {

		/******/ // Check if module is in cache
		/******/if (installedModules[moduleId])
			/******/return installedModules[moduleId].exports;

		/******/ // Create a new module (and put it into the cache)
		/******/var module = installedModules[moduleId] = {
			/******/exports: {},
			/******/id: moduleId,
			/******/loaded: false
			/******/ };

		/******/ // Execute the module function
		/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

		/******/ // Flag the module as loaded
		/******/module.loaded = true;

		/******/ // Return the exports of the module
		/******/return module.exports;
		/******/
	}

	/******/ // expose the modules object (__webpack_modules__)
	/******/__webpack_require__.m = modules;

	/******/ // expose the module cache
	/******/__webpack_require__.c = installedModules;

	/******/ // __webpack_public_path__
	/******/__webpack_require__.p = "";

	/******/ // Load entry module and return exports
	/******/return __webpack_require__(0);
	/******/
})(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, exports) {

	window.addEventListener('load', function () {

		if (typeof web3 !== 'undefined') {
			// Use Mist/MetaMask's provider
			web3 = new Web3(web3.currentProvider);
			console.log('Found web3!');
			web3.eth.getAccounts(function (error, accounts) {
				console.log(accounts);
			});
			var userAcc = returnAccount(web3);
			if (userAcc != null) {
				startApp();
			}
		} else {
			console.log("No web3!");
			getWeb3();
		}
	});

	function returnAccount(web3) {
		if (web3.eth.accounts[0] == undefined) {
			console.log("User is not logged in to MetaMask or MIST");
			logIntoMetaMask();
			return null;
		} else {
			console.log("Welcome " + web3.eth.accounts[0]);
			return web3.eth.accounts[0];
		}
	}

	function logIntoMetaMask() {
		/*$('#pleaseLogIn')[0].style.display    = "block";
  $('#noWeb3Dashboard')[0].style.display  = "none";
  $('#liveDashboard')[0].style.display  = "none";
  $('#chooseGame')[0].style.display     = "none";
  $('#lastRoundWins')[0].style.display  = "none";*/
	}

	function getWeb3() {
		/*$('#pleaseLogIn')[0].style.display    = "none";
  $('#noWeb3Dashboard')[0].style.display  = "block";
  $('#liveDashboard')[0].style.display  = "none";
  $('#chooseGame')[0].style.display     = "none";
  $('#lastRoundWins')[0].style.display  = "none";*/
	}

	function startApp() {

		var TokenABI = web3.eth.contract([{
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
		}]);
		var TokenAddress = '0x84332b82575cd4a7bac7a5df08a9712e78ff7d1f';
		var TokenContract = TokenABI.at(TokenAddress);

		var SalesABI = web3.eth.contract([{
			"constant": false,
			"inputs": [],
			"name": "withdrawFunds",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		}, {
			"constant": true,
			"inputs": [],
			"name": "tokenRaised",
			"outputs": [{
				"name": "",
				"type": "uint256"
			}],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		}, {
			"constant": true,
			"inputs": [],
			"name": "weiRaised",
			"outputs": [{
				"name": "",
				"type": "uint256"
			}],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		}, {
			"constant": true,
			"inputs": [],
			"name": "wallet",
			"outputs": [{
				"name": "",
				"type": "address"
			}],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		}, {
			"constant": true,
			"inputs": [],
			"name": "stopped",
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
			"inputs": [],
			"name": "shutThatShitDown",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		}, {
			"constant": true,
			"inputs": [],
			"name": "currentTier",
			"outputs": [{
				"name": "",
				"type": "uint256"
			}],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "",
				"type": "uint256"
			}],
			"name": "rate",
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
				"name": "beneficiary",
				"type": "address"
			}],
			"name": "buyTokens",
			"outputs": [],
			"payable": true,
			"stateMutability": "payable",
			"type": "function"
		}, {
			"constant": true,
			"inputs": [],
			"name": "token",
			"outputs": [{
				"name": "",
				"type": "address"
			}],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "",
				"type": "uint256"
			}],
			"name": "cap",
			"outputs": [{
				"name": "",
				"type": "uint256"
			}],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		}, {
			"inputs": [{
				"name": "_wallet",
				"type": "address"
			}, {
				"name": "_token",
				"type": "address"
			}],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "constructor"
		}, {
			"payable": true,
			"stateMutability": "payable",
			"type": "fallback"
		}, {
			"anonymous": false,
			"inputs": [{
				"indexed": true,
				"name": "purchaser",
				"type": "address"
			}, {
				"indexed": true,
				"name": "beneficiary",
				"type": "address"
			}, {
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}, {
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			}],
			"name": "TokenPurchase",
			"type": "event"
		}]);
		var SalesAddress = '';
		var SalesContract = SalesABI.at(SalesAddress);

		displayTokenBalance(TokenContract);
		displayETHBalance();
		$('input[type=text][name=BuyTokens_Beneficary]').val('0xb3bd2766928be029beb24d23cf7f88798232537f');
		$('#walletAddr')[0].innerHTML = web3.eth.accounts[0].toString(10);

		document.getElementById('TransferToken_Btn').addEventListener('click', transferToken);
		document.getElementById('BuyTokens_Btn').addEventListener('click', buyToken);

		function transferToken() {
			var transferTokenAddress = $('input[type=text][name=TransferToken_Address]').val();
			var tokenAmount = $('input[type=number][name=TransferToken_Amount]').val();
			tokenAmount = web3.toWei(tokenAmount, "ether");

			console.log(transferTokenAddress.length + " - " + transferTokenAddress.toString().substring(0, 2));

			if (web3.eth.accounts[0].length == transferTokenAddress.length && transferTokenAddress.substr(0, 2) == "0x") {
				TokenContract.transfer.sendTransaction(transferTokenAddress, tokenAmount, { from: web3.eth.accounts[0], value: 0 }, function (err, res) {
					if (!err) {
						console.log(res);
					} else {
						console.log(err);
					}
				});
			} else {
				alert('Transfer token adress invalid');
			}
		}

		function buyToken() {

			var beneficiary = $('input[type=text][name=BuyTokens_Beneficary]').val();
			var etherAmount = $('input[type=number][name=BuyTokens_Amount]').val();
			etherAmount = web3.toWei(etherAmount, "ether");

			if (web3.eth.accounts[0].length == beneficiary.length && beneficiary.substr(0, 2) == "0x") {
				SalesContract.buyTokens.sendTransaction(beneficiary, { from: web3.eth.accounts[0], value: etherAmount }, function (err, res) {
					if (!err) {
						console.log(res);
					} else {
						console.log(err);
					}
				});
			} else {
				alert('Beneficary adress invalid');
			}
		}
	}

	function displayTokenBalance(_TokenContract) {
		_TokenContract.balanceOf(web3.eth.accounts[0], function (_err, _resp) {
			if (_err != null) {
				console.log(_err);
			} else {
				$('.AccBalance_Token')[0].innerHTML = web3.fromWei(_resp, "ether").toString(10);
			}
		});
	}

	function displayETHBalance() {
		web3.eth.getBalance(web3.eth.accounts[0], function (_err, _resp) {
			if (_err != null) {
				console.log(_err);
			} else {
				$('.AccBalance_ETH')[0].innerHTML = web3.fromWei(_resp, "ether").toString(10);
			}
		});
	}

	/***/
}]
/******/);