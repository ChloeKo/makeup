const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const che = require('./models/che.js');
const skin = require('./models/skinCares.js');
const db = "mongodb+srv://104602517:a87879561@cluster0-vlh3m.mongodb.net/test?retryWrites=true&w=majority";
const bodyParser = require('body-parser');
const user = require("./models/user.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJwt = require('passport-jwt');
mongoose.connect(db).then(() => console.log('db connected'))
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
// 初始化passport
app.use(passport.initialize());
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'You cant see me!';
passport.use('token', new JwtStrategy(opts, (jwt_payload, done) => {
	user.findById(jwt_payload.id)
		.then(user=> {
			if (user){
				return done(null, user);
			} else {
				return done(null, false);
			}
		}).catch(err=>{console.log(err)})
}));

// @新增化學物質
// @Private
app.post('/che/new', passport.authenticate('token', {session: false}),(req, res) => {
	let cheFiled = {};
	cheFiled.eName = req.body.eName;
	cheFiled.cName = req.body.cName;
	cheFiled.des = req.body.des;
	cheFiled.aPoint = req.body.aPoint;
	cheFiled.bPoint = req.body.bPoint;
	cheFiled.cPoint = req.body.cPoint;
	const newChe = new che(cheFiled)
	newChe.save((che, err) => {
		if (err) {
			console.log(err);
		} else {
			console.log(che);
		}
	})
})
// @取得資料庫中所有化學物質
// @Public
app.get('/che', (req, res) => {
	che.find().then(result => {
		res.json(result)
	})
})
// @新增保養品
// @Private
app.post('/skin/new', (req, res) => {
	let newSkin = {};
	newSkin.name = req.body.name;
	newSkin.type = req.body.type;
	newSkin.che = [];
	stringChe = req.body.che;
	let totalA = 0;
	let totalB = 0;
	let totalC = 0;
	const cheArray = stringChe.split(',');


	for (let i = 0; i < cheArray.length; i++) {
		che.findOne({
			eName: cheArray[i]
		}, (err, result) => {
			newSkin.che.push(result);
			totalA = result.aPoint + totalA;
			totalB = result.bPoint + totalB;
			totalC = result.cPoint + totalC;
		})
	}

	setTimeout(() => {
		newSkin.totalA = totalA;
		newSkin.totalB = totalB;
		newSkin.totalC = totalC;
		let temp = new skin(newSkin);
		temp.save((err, skin) => {
			if (err) {
				console.log(err)
			} else {
				console.log(skin)
			}
		})
	}, 5000)


})

// @搜尋保養品
// @Public
app.post('/skin/search', (req, res) => {
	skin.find({
		type: req.body.params.tp
	}).then(result => {
		const beforeSort = result;
		var compareNum;
		var allSkin;
		if (req.body.params.skin == '痘痘肌') {
			compareNum = (a, b) => {
				return a.totalA - b.totalA;
			};
		} else if (req.body.params.skin == '敏感肌') {
			compareNum = (a, b) => {
				return a.totalB - b.totalB;
			};
		} else if (req.body.params.skin == '酒糟肌') {
			compareNum = (a, b) => {
				return a.totalC - b.totalC;
			};
		} else if (req.body.params.skin == '所有肌膚') {
			for (let i = 0; i < beforeSort.length; i++) {
				beforeSort[i].totalPoint = beforeSort[i].totalA + beforeSort[i].totalB + beforeSort[i].totalC;
				console.log(beforeSort)
			}
			compareNum = (a, b) => {
				return a.totalPoint - b.totalPoint;
			};
		}

		beforeSort.sort(compareNum);
		res.json(beforeSort);
	})

})

// @註冊
// @Public
app.post('/register', (req, res) => {
	const newUser = new user({
		name: req.body.params.name,
		email: req.body.params.email,
		password: req.body.params.password
	})
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(newUser.password, salt, (err, hash) => {
			newUser.password = hash;
			newUser.save().then(result => console.log(result)).catch(err => console.log(err));
		});
	});

})

// @登入
// @Public
app.post('/login', (req, res) => {
	user.findOne({
			email: req.body.params.email
		})
		.then(user => {
			if (user) {
				bcrypt.compare(req.body.params.password, user.password, (err, result) => {
					if (result) {
						const rule = {
							id: user.id,
							name: user.name,
							manager: user.manager
						}
						jwt.sign(rule, 'You cant see me!', {
							expiresIn: 10800
						}, (err, token) => {
							if (err) throw err;
							res.json({
								success: true,
								token: 'Bearer ' + token
							})
						})
					} else {
						console.log('login failed');
					}
				});
			} else {
				console.log('user not found')
			}
		})
})

app.get('/Test', passport.authenticate('token', {session: false}), (req, res) => {
	res.json(req.user);
})

app.listen(port, () => {
	console.log('sever start');
})
