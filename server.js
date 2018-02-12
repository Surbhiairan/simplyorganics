var mysql = require('mysql');
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var async = require('async');
var paytmchecksum = require('./checksum');
var passport = require('passport')
	, util = require('util')
	, FacebookStrategy = require('passport-facebook').Strategy
	, session = require('express-session')
	, cookieParser = require('cookie-parser')
	, config = require('./configuration/config')

var port = 3002;
//require multer for the file uploads
var multer = require('multer');
// set the directory for the uploads to the uploaded to
var DIR = './uploads/';

var storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, './uploads')
	},
	filename: function (req, file, callback) {
		console.log(file)
		callback(null, file.originalname)

		//callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
})
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {

	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8085');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept, Origin');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);
	res.setHeader('Content-type', 'text/html');


	// Pass to next layer of middleware
	next();
});

app.use(function (req, res, next) {
	global.connection = mysql.createConnection({
		host: config.host,
		user: config.username,
		password: config.password,
		database: config.database
	});
	connection.connect();

	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8085');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	next();
});

//Connect to Database only if Config.js parameter is set.

// if(config.use_database==='true')
// {
//     connection.connect();
// }

// Passport session setup.
passport.serializeUser(function (user, done) {
	console.log("user------", user)
	done(null, user);
});

passport.deserializeUser(function (obj, done) {
	done(null, obj);
});


// Use the FacebookStrategy within Passport.

passport.use(new FacebookStrategy({
	clientID: config.facebook_api_key,
	clientSecret: config.facebook_api_secret,
	callbackURL: config.callback_url
},
	function (accessToken, refreshToken, profile, done) {
		console.log(profile, 'profile')
		process.nextTick(function () {
			//Check whether the User exists or not using profile.id
			if (config.use_database === 'true') {
				console.log(profile.id, 'profileeeeeeeeeee');
				connection.query("SELECT * from fbusers where fb_id=" + profile.id, function (err, rows, fields) {
					if (err) throw err;
					if (rows.length === 0) {
						console.log(profile.id, profile.username, 'profileeeeeeeeeee')
						console.log("There is no such user, adding now");
						connection.query("INSERT into fbusers(fb_id,fb_name) VALUES('" + profile.id + "','" + profile.username + "')");
					}
					else {
						console.log("User already exists in database");
					}
				});
			}
			return done(null, profile);
		});
	}
));


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
	secret: 'keyboard cat', key: 'sid', resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
// Set our api routes
//app.use('/api', api);

app.get('/api', function (req, res) {
	res.render('index', { user: req.user });
});

app.get('/api/account', ensureAuthenticated, function (req, res) {
	res.render('account', { user: req.user });
});

app.get('/api/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));


app.get('/api/auth/facebook/callback',
	passport.authenticate('facebook', { successRedirect: 'http://localhost:8085/login', failureRedirect: '/api' }),
	function (req, res) {
		res.redirect('/api');
	});

app.get('/api/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});


function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) { return next(); }
	res.redirect('/login')
}

app.get('/paytm', function(req, res, next) {
	var payParam = new Object();
	payParam.MID = "simply47641364287357";
	payParam.REQUEST_TYPE = "DEFAULT";
	payParam.ORDER_ID = "1";
	payParam.CUST_ID = "2";
	payParam.TXN_AMOUNT = 25;
	payParam.CHANNEL_ID = "WEB";
	payParam.INDUSTRY_TYPE_ID = "Retail";
	payParam.WEBSITE = "WEB_STAGING"
	payParam.MOBILE_NO = 8878328586;
	payParam.EMAIL = "surbhiairan@gmail.com";
	key = "gs9xXsO#ye4gsrYX";
	paytmchecksum.genchecksum(payParam, key, function (params) {
		console.log('params----------', params);
		
	})
})

app.get('/', function (req, res, next) {
	connection.query('SELECT * from users', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({ "results": results }));
	});
});

app.get('/api/adminlist', function (req, res, next) {
	connection.query("SELECT * from users where role='admin'", function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({ "results": results }));
	});
});

app.get('/api/salespersonlist', function (req, res, next) {
	connection.query("SELECT * from users where role='salesperson'", function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({ "results": results }));
	});
});

app.get('/api/customerlist', function (req, res, next) {
	connection.query("SELECT * from users where role='customer'", function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({ "results": results }));
	});
});

app.get('/api/salespersonlist', function (req, res, next) {
	connection.query("SELECT * from users where role='salesperson'", function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({ "results": results }));
	});
});

app.get('/api/productslist', function (req, res, next) {
	// SELECT Users.*, Cities.*, States.*, Countries.* FROM Users JOIN Cities 
	// ON Users.city = Cities.city_id JOIN States ON Users.state = States.state_id 
	// JOIN Countries ON Users.country = Countries.country_id WHERE Users.user_id=?",[userid],

	connection.query('SELECT product.*, category.*, currency.*, quantity.*, measure.* FROM product JOIN category ON product.cat_id = category.cat_id JOIN currency ON product.curr_id = currency.cur_id JOIN quantity ON product.quant_id = quantity.quant_id JOIN measure ON product.measure_id = measure.m_id', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({ "results": results }));
	});
});

app.post("/api/customeradd", (req, res) => {
	console.log(req.body.fname);
	console.log(req.body.lname);
	sequelize.query("UPDATE users SET addedBy=1 WHERE user_id = 4").spread((results, metadata) => {
		// Results will be an empty array and metadata will contain the number of affected rows.
		console.log(results);
	})
	//const product = { p_title: 'dal', p_price: 123 };
	// var query = connection.query('INSERT INTO about_us SET ?',{description:req.body.fname},
	// //var query = connection.query("INSERT INTO tbl_product (p_title,p_price) VALUES ('daal',123)",
	// function(err, result) {
	//     console.log("result",result, "err", err);
	// });
});

app.post("/api/customerupdate", (req, res) => {

	var country_id, state_id, city_id;

	// //var data = JSON.parse(req.body);
	console.log("body------", req.body);
	console.log(req.body.f_name, 'fnameeeeeeeeeeeeeee');
	connection.query('SELECT country_id FROM Countries where country_name= ?', [req.body.country_name], function (error, results, fields) {
		if (error) throw error;
		console.log(results);
		this.country_id = results;
		console.log(this.country_id, 'countryyyyyyyyyyyiddddddddddddddddddd')
		//res.send(JSON.stringify({"results": results}));
	});

	connection.query('SELECT state_id FROM States where state_name= ?', [req.body.state_name], function (error, results, fields) {
		if (error) throw error;
		console.log(results);
		this.state_id = results;
		console.log(this.state_id, 'stateeeeeeeeeeeeeeeeee')
		//res.send(JSON.stringify({"results": results}));
	});

	connection.query('SELECT city_id FROM Cities where city_name= ?', [req.body.city_name], function (error, results, fields) {
		if (error) throw error;
		console.log(results);
		this.city_id = results;
		console.log(this.city_id, 'citiiiiiiiiiiiiiiiiii')
		//res.send(JSON.stringify({"results": results}));
	});

	var sql = 'update Users SET f_name=?, l_name=?, addedBy=?,address=?, city=?,contact=?,country=?,dateAdded=?,email=?,landmark=?,pincode=?,state=? where user_id=?';

	var query = connection.query(sql, [req.body.f_name, req.body.l_name, req.body.addedBy, req.body.address, this.city_id, req.body.contact, this.country_id, req.body.dateAdded, req.body.email, req.body.landmark, req.body.pincode, this.state_id, req.body.user_id], function (err, result) {
		console.log("result", result, "err", err);
	});
});

app.get("/api/customerdetail", (req, res) => {
	//console.log("req", req)
	console.log(req.query.userid);
	var userid = req.query.userid;
	connection.query('SELECT users.*, Cities.*, States.*, Countries.* FROM Users JOIN Cities ON Users.city = Cities.city_id JOIN States ON Users.state = States.state_id JOIN Countries ON Users.country = Countries.country_id WHERE Users.user_id=?', [userid], function (error, results, fields) {
		if (error) throw error;
		console.log(results);
		res.send(JSON.stringify({ "results": results }));
	});
});


//---------------SALESPERSON---------------------------------------------------------------------
app.get("/api/salespersoncustomer", (req, res) => {

	console.log(req, "req");
	console.log(req.query, "request");
	console.log(req.query.id, "salesperson id");
	var sid = req.query.id;
	//select salesperson.*, users.* from salesperson join users on salesperson.cust_added_id=users.user_id where salesperson.s_id = ?,[sid]
	connection.query('select salesperson.*, users.* from salesperson join users on salesperson.cust_added_id=users.user_id where salesperson.s_id = ?', [sid], function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({ "data": results }));
	});

});

//---------------PERSON--------------------------------------------------------------------------
app.post("/api/productedit", (req, res) => {
	console.log(req.body.title, "title");
	console.log(req.body.price);
	const product = { p_title: 'dal', p_price: 123 };
	var query = connection.query('INSERT INTO product SET ?', { description: req.body.title },
		//var query = connection.query("INSERT INTO tbl_product (p_title,p_price) VALUES ('daal',123)",
		function (err, result) {
			console.log("result", result, "err", err);
		});
	// connection.query("insert into tbl_product(p_title,p_price) values(?,?)",[product], function (error, results, fields) {
	// 	if (error) throw error;
	// 	console.log(results);
	// 	console.log('inserted');
	// 	//res.send(JSON.stringify({"results": results}));
	// })
});

app.get("/api/productdetail", (req, res) => {
	//console.log("req", req)
	console.log(req.query.productid);
	var p_id = req.query.productid;
	connection.query('SELECT * FROM product where prod_id= ?', [p_id], function (error, results, fields) {
		if (error) throw error;
		console.log(results);
		res.send(JSON.stringify({ "results": results }));
	});
});


app.get('/api/storeview', function (req, res, next) {
	connection.query('SELECT * FROM Store', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({ "results": results }));
	});
});

app.post("/api/storeedit", (req, res) => {

	console.log(req.body, "bodyyyyyyyyyyyyyyyyyyyyyyyyyyy");
	var query = connection.query(
		'INSERT INTO Store SET ?', {
			name: req.body.name,
			description: req.body.description,
			address: req.body.address,
			pincode: req.body.pincode,
			city: req.body.city,
			state: req.body.state,
			country: req.body.country,
			contact: req.body.contact,
			date: req.body.date
		},
		function (err, result) {
			console.log("result", result, "err", err);
		}
	);
});


app.get('/api/catlist', function (req, res, next) {
	connection.query('SELECT * FROM category', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({ "results": results }));
	});
});

app.get('/api/paymentmethod', function (req, res, next) {
	connection.query('SELECT * FROM paymentmethod', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({ "results": results }));
	});
});

app.get('/api/inventorylist', function (req, res, next) {
	//SELECT Users.*, Cities.*, States.*, Countries.* FROM Users JOIN Cities ON Users.city = Cities.city_id JOIN States ON Users.state = States.state_id JOIN Countries ON Users.country = Countries.country_id
	connection.query('SELECT inventory.*, product.*, store.* FROM inventory JOIN product ON inventory.prod_id = product.prod_id JOIN store ON inventory.store_id = store.store_id', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({ "results": results }));
	});
});

app.post("/api/inventoryadd", (req, res) => {

	console.log(req.body, "bodyyyyyyyyyyyyyyyyyyyyyyyyyyy");
	var query = connection.query(
		'INSERT INTO inventory SET ?', {
			prod_id: req.body.prod_id,
			store_id: req.body.store_id,
			prod_quant: req.body.product_quantity
		},
		function (err, result) {
			console.log("result", result, "err", err);
		}
	);
});

app.put("/api/inventoryedit", (req, res) => {
	console.log("body---------", req.body);
	var productAvail;
	var movedProductQuant;
	var addedProductQuant;
	// Check wheather that product is available in that store or not.
	connection.query(
		'SELECT prod_quant FROM Inventory where prod_id = ? && store_id = ?',
		[req.body.productName,
		req.body.moveFrom
		],
		function (error, results, fields) {
			if (error) throw error;
			console.log("results------", results);
			this.productAvail = results[0].prod_quant
			console.log(this.productAvail, 'product Available')
			//res.send(JSON.stringify({"results": results}));
			if (this.productAvail >= req.body.productQuantity) {
				console.log("inside if-------");
				this.movedProductQuant = this.productAvail - req.body.productQuantity;
				console.log("movedProductQuant", this.movedProductQuant);

				connection.query(
					'Update inventory SET prod_quant = ? WHERE prod_id = ? && store_id = ?',
					[this.movedProductQuant,
					req.body.productName,
					req.body.moveFrom],
					function (err, results, fields) {
						if (err) throw err;
						console.log("results----------updated", results);
					}
				)

				connection.query(
					'INSERT INTO inventory (prod_id, store_id, prod_quant) ' +
					'VALUES (?,?,?) ON DUPLICATE KEY UPDATE ' +
					'prod_id = ?, store_id = ?, prod_quant = inventory.prod_quant + ?',
					[
						req.body.productName,
						req.body.moveTo,
						req.body.productQuantity,
						req.body.productName,
						req.body.moveTo,
						req.body.productQuantity
					],
					function (err, results, fields) {
						if (err) throw err;
						console.log("results----------0", results);
						res.send(JSON.stringify({ "results": results }));

					}
				)

			}
			else {
				console.log("outside-----")
			}
		}
	);

})

app.post('/api/order', (req, res) => {
	console.log('body-------', req.body);
	connection.query(
		'INSERT INTO orders SET ?', {
			order_id: '1',
			user_id: req.body.billingDetails.user_id,
			o_amount: req.body.o_amount,
			bname: req.body.billingDetails.f_name,
			blname: req.body.billingDetails.l_name,
			baddress: req.body.billingDetails.address,
			blandmark: req.body.billingDetails.landmark,
			bphone: req.body.billingDetails.contact,
			bcity: req.body.billingDetails.city,
			bcountry: req.body.billingDetails.country,
			bstate: req.body.billingDetails.state,
			bpincode: req.body.billingDetails.pincode,
			sname: req.body.sname,
			slname: req.body.slname,
			saddress: req.body.saddress,
			slandmark: req.body.slandmark,
			sphone: req.body.sphone,
			scity: req.body.scity,
			scountry: req.body.scountry,
			sstate: req.body.sstate,
			spincode: req.body.spincode,
			paymethod: '2',
			salesperson: req.body.billingDetails.user_id

		},
		function (err, result) {
			//var i = 0;
			console.log("result", result, "err", err);
			// console.log("req.body.cart--------", req.body.cart)
			var insertedId = result.insertId;
			async.forEachOf(req.body.cart, function(value, i, callback) {
				console.log('value-------',value);
				 connection.query(
					'INSERT INTO Orderitem SET ?', {
						oi_id: i,
						order_id: 1,
						prod_id:value.productId,
						p_quantity: value.quantity,
						subtotal: value.totalCost
					},
					function (err, result) {
						console.log("result", result, "err", err);
						res.send("Order placed successfully");
					}
				) 
			})
		}
	);

})

app.get('/api/measlist', function (req, res, next) {
	// SELECT Users.*, Cities.*, States.*, Countries.* FROM Users JOIN Cities 
	// ON Users.city = Cities.city_id JOIN States ON Users.state = States.state_id 
	// JOIN Countries ON Users.country = Countries.country_id WHERE Users.user_id=?",[userid],

	connection.query('SELECT * FROM measure', function (error, results, fields) {
		if (error) throw error;
		var measures = results[0];
		res.send(results);
		//res.send(JSON.stringify({"results": results}));
	});
});

app.get('/api/quantlist', function (req, res, next) {
	// SELECT Users.*, Cities.*, States.*, Countries.* FROM Users JOIN Cities 
	// ON Users.city = Cities.city_id JOIN States ON Users.state = States.state_id 
	// JOIN Countries ON Users.country = Countries.country_id WHERE Users.user_id=?",[userid],

	connection.query('SELECT * FROM quantity', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({ "results": results }));
	});
});

app.get('/api/currlist', function (req, res, next) {
	// SELECT Users.*, Cities.*, States.*, Countries.* FROM Users JOIN Cities 
	// ON Users.city = Cities.city_id JOIN States ON Users.state = States.state_id 
	// JOIN Countries ON Users.country = Countries.country_id WHERE Users.user_id=?",[userid],

	connection.query('SELECT * FROM currency', function (error, results, fields) {
		if (error) throw error;
		var currencies = results[0];
		res.send(results);
	});
});

app.get('/api/citylist', function (req, res, next) {
	connection.query('SELECT * FROM Cities where state_id = ?', [req.query.state_id], function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({ "results": results }));
	});
});

app.get('/api/statelist', function (req, res, next) {
	console.log(req.query)
	connection.query('SELECT * FROM States where country_id = ?', [req.query.country_id], function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({ "results": results }));
	});
});

app.get('/api/countrylist', function (req, res, next) {
	connection.query('SELECT * FROM Countries', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({ "results": results }));
	});
});

//our file upload function.
app.post('/api/imageupload', function (req, res, next) { 
	console.log("request body", req.body);
	var upload = multer({
		storage: storage
	}).single('photo')
	upload(req, res, function (err) {
		console.log("request body inside", req.body);
		//console.log("response body inside",res);
		console.log("response file info", res.req.file);
		//console.log('upload response', res);
		//res.end('File is uploaded')
		//run query to insert data into database
		var path = res.req.file.path;
		const product = { p_title: 'dal', p_price: 123 };
		var query = connection.query('INSERT INTO product SET ?', { imagepath: res.req.file.path },
			//var query = connection.query("INSERT INTO tbl_product (p_title,p_price) VALUES ('daal',123)",
			function (err, result) {
				console.log("result", result, "err", err);
			});
	});

});


//local login-------------------------------------------------------------------------
//const app = express();
const BodyParser = require('body-parser');
const CookieParser = require('cookie-parser');
const { userResponse, validateUser, secret } = require('./config/config');
//const passport = require('passport');
const passportConfig = require('./config/passport');

app.use(BodyParser.json());
app.use(CookieParser());
app.use(BodyParser.urlencoded({ extended: true }));
var configDB = require('./config/config.js');
var flash = require("connect-flash");
app.use(flash());

passportConfig(passport);

app.use(session({
	secret: 'anjali'
}));
app.use(passport.initialize());
app.use(passport.session());
// process the login form
app.post('/api/login',
	function (req, res, next) {

		passport.authenticate('local-login', function (err, user, info) {
			//console.log('request----------------',req);
			console.log("errrrrrorrrrrrrrrrr", err);
			console.log("yayyyyyyyyyy", user);
			console.log("infoooooooooo", info);

			if (err) { return next(err); }
			if (!user) {
				res.status(401);
				res.json({ "reason": "Invalid credentials" });
			} else {
				res.status(200);
				user.token = 'jwt-token';
				res.json({ "login": user })
				console.log("successful login", user);
			}
		})(req, res, next);
	});

app.post('/api/signup',
	function (req, res, next) {
		console.log('request----------------', req.body);
		console.log('request----------------', req.body.username);

		passport.authenticate('local-signup', function (err, user, info) {
			//console.log('request----------------',req);
			console.log("errrrrrorrrrrrrrrrr", err);
			console.log("yayyyyyyyyyy", user);
			console.log("infoooooooooo", info);

			if (err) { return next(err); }
			if (!user) {
				res.status(401);
				res.json({ "reason": "Invalid credentials" });
			} else {
				res.status(200);
				res.json({ "signup": user })
				console.log("successful signup", user);
			}
		})(req, res, next);
	});



app.get('/api/auth/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));


app.get('/api/auth/facebook/callback',
	passport.authenticate('facebook', function (err, user, info) {
		//console.log('request----------------',req);
		console.log("errrrrrorrrrrrrrrrr", err);
		console.log("yayyyyyyyyyy", user);
		console.log("infoooooooooo", info);

		if (err) { return next(err); }
		if (!user) {
			res.status(401);
			res.json({ "reason": "Invalid credentials" });
		} else {
			res.status(200);
			res.json({ "login": user })
			console.log("successful login", user);
		}
	})
);




app.listen(port, () => {
	console.log("Server listening on port " + port);
});
