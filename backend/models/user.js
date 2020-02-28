const mongoose = require('mongoose');
// var passportLocalMongoose = require("passport-local-mongoose");
const userSchema = new mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true,
	},
	password:{
		type:String,
		required:true
	},
	chart:{
		type:Array
	}
})

// userSchema.plugin(passportLocalMongoose);

const user = mongoose.model('user',userSchema);

module.exports = user;