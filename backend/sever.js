const express 				= require('express');
const app 					= express();
const port 					= process.env.PORT || 5000;
const mongoose 				= require('mongoose');
const che 					= require('./models/che.js');
const skin 					= require('./models/skinCares.js');
const db 					= "mongodb+srv://104602517:a87879561@cluster0-vlh3m.mongodb.net/test?retryWrites=true&w=majority";
const bodyParser 			= require('body-parser');
var user 				 	= require("./models/user.js");
// var passport			 	= require("passport");
// var passportLocal		 	= require("passport-local");
// var passportLocalMongoose	= require("passport-local-mongoose");
// var session 			 	= require("express-session");
mongoose.connect(db).then(()=>console.log('db connected'))
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// app.use(session({
// 	secret:"Hello this is chloe",
// 	resave:false,
// 	saveUninitialized:false
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new passportLocal(user.authenticate()));
// passport.serializeUser(user.serializeUser());
// passport.deserializeUser(user.deserializeUser());


app.post('/che/new',(req,res)=>{
	let cheFiled = {};
	cheFiled.eName = req.body.eName;
	cheFiled.cName = req.body.cName;
	cheFiled.des = req.body.des;
	cheFiled.aPoint = req.body.aPoint;
	cheFiled.bPoint = req.body.bPoint;
	cheFiled.cPoint = req.body.cPoint;
	const newChe = new che(cheFiled)
	newChe.save((che,err)=>{
		if(err){
			console.log(err);
		}else{
			console.log(che);
		}
	})
})

app.get('/che',(req,res)=>{
	che.find().then(result=>{
		res.json(result)
	})
})

app.post('/skin/new',(req,res)=>{
	let newSkin = {};
	newSkin.name = req.body.name;
	newSkin.type = req.body.type;
	newSkin.che = [];
	stringChe = req.body.che;
	let totalA = 0;
	let totalB = 0;
	let totalC = 0;
	const cheArray = stringChe.split(',');
	
	
	for(let i = 0;i<cheArray.length;i++){
		che.findOne({eName:cheArray[i]},(err,result)=>{
			newSkin.che.push(result);
			totalA = result.aPoint+totalA;
			totalB = result.bPoint+totalB;
			totalC = result.cPoint+totalC;
		})
	}
	
	setTimeout(()=>{
		newSkin.totalA = totalA;
		newSkin.totalB = totalB;
		newSkin.totalC = totalC;
		let temp = new skin(newSkin);
		temp.save((err,skin)=>{
			if(err){
				console.log(err)
			}else{
				console.log(skin)
			}
		})
	},5000)
		
	
})


app.post('/skin/search',(req,res)=>{
	skin.find({type:req.body.params.tp}).then(result=>{
		const beforeSort = result;
		var compareNum;
		var allSkin;
		if(req.body.params.skin=='痘痘肌'){
			compareNum = (a, b)=>{
				return a.totalA - b.totalA;
			};
		}else if(req.body.params.skin=='敏感肌'){
			compareNum = (a, b)=>{
				return a.totalB - b.totalB;
			};
		}else if(req.body.params.skin=='酒糟肌'){
			compareNum = (a, b)=>{
				return a.totalC - b.totalC;
			};
		}else if(req.body.params.skin=='所有肌膚'){
			for( let i = 0; i <beforeSort.length; i++){
				beforeSort[i].totalPoint = beforeSort[i].totalA + beforeSort[i].totalB + beforeSort[i].totalC;
				console.log(beforeSort)
			}
			compareNum = (a, b)=>{
				return a.totalPoint - b.totalPoint;
			};
		}
		
		beforeSort.sort(compareNum);
		res.json(beforeSort);
	})
	
})

app.post('/register',(req,res)=>{
	console.log(req.body.params);
})

app.listen(port,()=>{
	console.log('sever start');
})