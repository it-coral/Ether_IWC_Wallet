
require('dotenv').config()
require('./server/model/user_model.js');

var express         = require('express');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var expressSession  = require('express-session');
var mongoStore      = require('connect-mongo')({session: expressSession});
var mongoose        = require('mongoose');
var config          = require('./config.js');
var mongoDB         = config.MONGO_CONNECTION;

var app             = express();
var server          = require('http').Server(app);

if(!config.API_KEY){
    console.log("Please set your DEMO_AUTHY_API_KEY environment variable before proceeding.");
    process.exit(1);
}


/**
 * Setup MongoDB connection.
 */
// mongoose.Promise = global.Promise;
// mongoose.connect(mongoDB, {
//   useMongoClient: true
// });
// // Get Mongoose to use the global promise library
// mongoose.Promise = global.Promise;
// //Get the default connection
// var db = mongoose.connection;

// //Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

mongoose.connect(mongoDB);
// mongoose.connect('mongodb://localhost:27017/authydemo');
var db = mongoose.connection;

app.use(cookieParser());
// app.use(expressSession({
//     'secret': config.SECRET,
//     'cookie': {
//         'maxAge': 3600*1000*24
//     }}));
app.use(expressSession({'secret': config.SECRET}));
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({
    extended: true
}));

/**
 * Open the DB connection.
 */
db.once('open', function (err) {
    if(err){
        console.log("Error Opening the DB Connection: ", err);
        return;
    }
    app.use(expressSession({
        secret: config.SECRET,
        cookie: {maxAge: 60 * 60 * 1000},
        store: new mongoStore({
            db: mongoose.connection.db,
            collection: 'sessions'
        })
    }));
    var port = config.PORT || 5151;
    server.listen(port);
    console.log("Magic happening on port " + port);
});

db.on('error', console.error.bind(console, 'Connection Error:'));

var router = express.Router();

var users       = require('./server/controllers/users.js');
var transfer    = require('./server/controllers/transfer.js');

router.route('/user/register').post(users.register);

router.route('/logout').get(users.logout);
router.route('/login').post(users.login);

/**
 * Authy Authentication API
 */
router.route('/authy/sms').post(users.sms);
router.route('/authy/voice').post(users.voice);
router.route('/authy/verify').post(users.verify);
router.route('/authy/onetouchstatus').post(users.checkonetouchstatus);
router.route('/authy/onetouch').post(users.createonetouch);
router.route('/authy/getPublicKey/:userId').get(users.getPublicKey);

router.route('/transfer/transferETH/:userId').post(transfer.transferETH);
router.route('/transfer/buyIWC/:userId').post(transfer.buyIWC);
router.route('/transfer/transfer/:userId').post(transfer.transferIWC);
router.route('/transfer/getGasPrice').post(transfer.getGasPrice);
router.route('/transfer/test').get(transfer.test);
router.route('/transfer/showBalances').get(transfer.showBalances);


router.route('/loggedIn').post(users.loggedIn);

/**
 * Authy Phone Verification API
 */
//router.route('/verification/start').post(users.requestPhoneVerification);
//router.route('/verification/verify').post(users.verifyPhoneToken);


/**
 * Require user to be logged in and authenticated with 2FA
 *
 * @param req
 * @param res
 * @param next
 */
function requirePhoneVerification(req, res, next) {
    if (req.session.ph_verified) {
        console.log("Phone Verified");
        next();
    } else {
        console.log("Phone Not Verified");
        res.redirect("/verification");
    }
}
/**
 * Require user to be logged in and authenticated with 2FA
 *
 * @param req
 * @param res
 * @param next
 */
function requireLoginAnd2FA(req, res, next) {
    if (req.session.loggedIn && req.session.authy) {
        console.log("RL2FA:  User logged and 2FA");
        next();
    } else if (req.session.loggedIn && !req.session.authy) {
        console.log("RL2FA:  User logged in but no 2FA");
        res.redirect("/2fa");
    } else {
        console.log("RL2FA:  User not logged in.  Redirecting.");
        res.redirect("/login");
    }
}

/**
 * Require user to be logged in.
 *
 * @param req
 * @param res
 * @param next
 */
function requireLogin(req, res, next) {
    if (req.session.loggedIn) {
        console.log("RL:  User logged in");
        next();
    } else {
        console.log("RL:  User not logged in.  Redirecting.");
        res.redirect("/login");
    }
}

/**
 * Test for 200 response.  Useful when setting up Authy callback.
 */
router.route('/test').post(function(req, res){
    return res.status(200).send({"connected": true});
});

/**
 * All pages under protected require the user to be both logged in and authenticated via 2FA
 */
// app.all('/protected/*', requireLoginAnd2FA, function (req, res, next) {
//     next();
// });

// app.all('/2fa/*', requireLogin, function (req, res, next) {
//     next();
// });

/**
 * Prefix all router calls with 'api'
 */
app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
});
app.use('/api', router);
app.use('/', express.static(__dirname + '/public'));
app.use('/metamask', express.static(__dirname + '/public'));