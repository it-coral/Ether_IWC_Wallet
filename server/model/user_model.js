var mongoose 	= require('mongoose'),
    Schema 		= mongoose.Schema;

var UserSchema 	= new Schema({
    email:{
    	type: 			String, 
    	required: 		true 
    },
    privKey: 			String,
    pubKey: 			String,
    authyId: 			String,
    hashed_password: 	String
});

mongoose.model('User', UserSchema);

