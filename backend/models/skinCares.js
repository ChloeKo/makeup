const mongoose = require('mongoose');

const skinSchema = new mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	type:{
		type:String,
		required:true
	},
	pic:{
		type:String,
		default:'https://upload.wikimedia.org/wikipedia/commons/6/6c/No_image_3x4.svg',
	},
	che:{
		type:Array,
		required:true
	},
	totalA:{
		type:Number,
		default:0
	},
	totalB:{
		type:Number,
		default:0
	},
	totalC:{
		type:Number,
		default:0
	}
})

const skin = mongoose.model('skin',skinSchema);

module.exports = skin;