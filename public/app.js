var app = angular.module('authyDemo', ['ngMaterial', 'ngMessages']);
app.service('UserService', function($window){
    var service = this;

    service.user = null;
    if($window.localStorage.getItem('wincoinuser') !== 'undefined')
        service.user = JSON.parse($window.localStorage.getItem('wincoinuser'));
    
    service.getUser = function(){
        return service.user;
    }

    return service;
});
app.controller('MainController', function ($scope, $http, $window, $mdDialog, UserService, $timeout) {
    
    $scope.user = UserService.getUser();
    $scope.Tx = {};
    $scope.loadingTransfer = false;
    $scope.publicKey = '';
    $timeout(function(){
        activate();
    }, 0);

    function activate(){
        if($scope.user && $scope.user.user){
            $http.get('/api/authy/getPublicKey/' + $scope.user.user)
            .success(function (data, status, headers, config) {
                $scope.publicKey = data.publicKey;
            })
            .error(function (data, status, headers, config) {
                
            });

        } else {
            console.log('User Not Logged In');
            return ;
        }

    }


    $scope.showTransferDialog = function(ev) {
        if(!($scope.Tx.ETH && $scope.Tx.AddressTo)){
            window.alert('Please fill Address and amount');
            return;
        }
        $scope.loadingTransfer = true;
        $http.post('/api/transfer/getGasPrice', $scope.Tx)
            .success(function (data, status, headers, config) {
                $scope.loadingTransfer = false;
                $mdDialog.show({
                    controller: 'DialogController',
                    templateUrl: '/templates/transfer_dialog.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    fullscreen: false, // Only for -xs, -sm breakpoints.

                    locals: {
                        price: data.price,
                        amount: data.amount,
                        ETH: $scope.Tx.ETH,
                        AddressTo: $scope.Tx.AddressTo
                    },
                })
                .then(function(answer) {
                        $scope.status = 'You said the information was "' + answer + '".';
                    }, function() {
                        $scope.status = 'You cancelled the dialog.';
                    });
            })
            .error(function (data, status, headers, config) {
                
            });
        
    };        

    $scope.logout = function () {
        $http.get('/api/logout')
            .success(function (data, status, headers, config) {
                console.log("Logout Response: ", data);
                $window.location.href = $window.location.origin + "/2fa";
            })
            .error(function (data, status, headers, config) {
                console.error("Logout Error: ", data);
            });
    };

});

app.controller('DialogController', function ($scope, $mdDialog, $http, price, amount, UserService, ETH, AddressTo) {
    $scope.Tx = {
        gasP: price,
        maxGas: amount,
        ETH: ETH,
        AddressTo: AddressTo
    };
    
    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
        $mdDialog.hide($scope.Tx);
    };

    $scope.submitForm = function(answer) {
        // $mdDialog.hide($scope.Tx);
        $http.post('/api/transfer/transfer/' + UserService.getUser().user, $scope.Tx)
            .success(function (data, status, headers, config) {
                console.log("Logout Response: ", data);
            })
            .error(function (data, status, headers, config) {
                console.error("Logout Error: ", data);
            });
    };

});

app.controller('LoginController', function ($scope, $http, $window) {

    $scope.setup = {};

    $scope.login = function () {
        $http.post('/api/login', $scope.setup)
            .success(function (data, status, headers, config) {
                console.log("Login success: ", data);
                window.localStorage.setItem('wincoinuser', JSON.stringify(data));
                $window.location.href = $window.location.origin + "/protected";
            })
            .error(function (data, status, headers, config) {
                console.error("Login error: ", data);
                alert("Error logging in.  Check console");
            });
    };
});


app.controller('RegistrationController', function ($scope, $http, $window) {

    $scope.setup = {};

    $scope.register = function () {
        if ($scope.password1 === $scope.password2 && $scope.password1 !== "") {

            // making sure the passwords are the same and setting it on the
            // object we'll pass to the registration endpoint.
            $scope.setup.password = $scope.password1;

            $http.post('/api/user/register', $scope.setup)
                .success(function (data, status, headers, config) {
                    console.log("Success registering: ", data);

                    $window.localStorage.setItem('wincoinuser', JSON.stringify(data));
                    $window.location.href = $window.location.origin + "/2fa";
                })
                .error(function (data, status, headers, config) {
                    console.error("Registration error: ", data);
                    alert("Error registering.  Check console");
                });
        } else {
            alert("Passwords do not match");
        }
    };
});

app.controller('AuthyController', function ($scope, $http, $window, $interval) {

    var pollingID;

    $scope.setup = {};

    $scope.logout = function () {
        $http.get('/api/logout')
            .success(function (data, status, headers, config) {
                console.log("Logout Response: ", data);
                $window.location.href = $window.location.origin + "/2fa";
            })
            .error(function (data, status, headers, config) {
                console.error("Logout Error: ", data);
            });
    };

    /**
     * Request a token via SMS
     */
    $scope.sms = function () {
        $http.post('/api/authy/sms')
            .success(function (data, status, headers, config) {
                console.log("SMS sent: ", data);
            })
            .error(function (data, status, headers, config) {
                console.error("SMS error: ", data);
                alert("Problem sending SMS");
            });
    };

    /**
     * Request a Voice delivered token
     */
    $scope.voice = function () {
        $http.post('/api/authy/voice')
            .success(function (data, status, headers, config) {
                console.log("Phone call initialized: ", data);
            })
            .error(function (data, status, headers, config) {
                console.error("Voice call error: ", data);
                alert("Problem making Voice Call");
            });
    };

    /**
     * Verify a SMS, Voice or SoftToken
     */
    $scope.verify = function () {
        $http.post('/api/authy/verify', {token: $scope.setup.token})
            .success(function (data, status, headers, config) {
                console.log("2FA success ", data);
                $window.localStorage.setItem('wincoinuser', JSON.stringify(data));
                $window.location.href = $window.location.origin + "/protected";
            })
            .error(function (data, status, headers, config) {
                console.error("Verify error: ", data);
                alert("Problem verifying token");
            });
    };

    /**
     * Request a OneTouch transaction
     */
    $scope.onetouch = function () {
        $http.post('/api/authy/onetouch')
            .success(function (data, status, headers, config) {
                console.log("OneTouch success", data);
                /**
                 * Poll for the status change.  Every 5 seconds for 12 times.  1 minute.
                 */
                pollingID = $interval(oneTouchStatus, 5000, 12);
            })
            .error(function (data, status, headers, config) {
                console.error("Onetouch error: ", data);
                alert("Problem creating OneTouch request");
            });
    };

    /**
     * Request the OneTouch status.
     */
    function oneTouchStatus() {
        $http.post('/api/authy/onetouchstatus')
            .success(function (data, status, headers, config) {
                console.log("OneTouch Status: ", data);
                if (data.approval_request.status === "approved") {
                    $window.location.href = $window.location.origin + "/protected";
                    $interval.cancel(pollingID);
                } else {
                    console.log("One Touch Request not yet approved");
                }
            })
            .error(function (data, status, headers, config) {
                console.log("OneTouch Polling Status: ", data);
                alert("Something went wrong with the OneTouch polling");
                $interval.cancel(pollingID);
            });
    }
});

app.controller('PhoneVerificationController', function ($scope, $http, $window, $timeout) {

    $scope.setup = {
        via: "sms"
    };
    
    $scope.view = {
        start: true
    };

    /**
     * Initialize Phone Verification
     */
    $scope.startVerification = function () {
        $http.post('/api/verification/start', $scope.setup)
            .success(function (data, status, headers, config) {
                $scope.view.start = false;
                console.log("Verification started: ", data);
            })
            .error(function (data, status, headers, config) {
                console.error("Phone verification error: ", data);
            });
    };

    /**
     * Verify phone token
     */
    $scope.verifyToken = function () {
        $http.post('/api/verification/verify', $scope.setup)
            .success(function (data, status, headers, config) {
                console.log("Phone Verification Success success: ", data);
                $window.location.href = $window.location.origin + "/verified";
            })
            .error(function (data, status, headers, config) {
                console.error("Verification error: ", data);
                alert("Error verifying the token.  Check console for details.");
            });
    };

    $scope.logout = function () {
            $window.location.href = $window.location.origin;
    };
});

