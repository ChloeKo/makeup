const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const che = require('./models/che.js');
const skin = require('./models/skinCares.js');
const db = "mongodb+srv://104602517:a87879561@cluster0-vlh3m.mongodb.net/test?retryWrites=true&w=majority";
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
mongoose.connect(db,{ useNewUrlParser: true ,useUnifiedTopology: true }).then(()=>console.log("db conneted"))


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
	if(req.body.params.tp=='所有保養品'){
		skin.find().then(result=>{
			res.json(result);
		});
	}else{
		skin.find({type:req.body.params.tp}).then(result=>{
			console.log(result);
			res.json(result);
	})
	}
})

app.listen(port,()=>{
	console.log('sever start');
})