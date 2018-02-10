var mysql = require('mysql');
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var passport          =     require('passport')
, util              =     require('util')
, FacebookStrategy  =     require('passport-facebook').Strategy
, session           =     require('express-session')
, cookieParser      =     require('cookie-parser')
, config            =     require('./configuration/config')

var port = 3002;
//require multer for the file uploads
var multer = require('multer');
// set the directory for the uploads to the uploaded to
var DIR = './uploads/';
//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
//var upload = multer({dest: DIR}).single('photo');
//var config = require('./config.json');

// var Sequelize = require('sequelize');  

// var sequelize = new Sequelize(  
//     'test', 'root', 'Anjal!22', {
// 		host: 'localhost',
// 		dialect: 'mysql',
	  
// 		pool: {
// 		  max: 5,
// 		  min: 0,
// 		  acquire: 30000,
// 		  idle: 10000
// 		},
	  
// 		// SQLite only
// 		storage: 'path/to/database.sqlite',
	  
// 		// http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
// 		operatorsAliases: false
// 	// {
// 	// 	host: 'localhost',
// 	// 	dialect: 'mysql',
	  
// 	// 	pool: {
// 	// 	  max: 5,
// 	// 	  min: 0,
// 	// 	  acquire: 30000,
// 	// 	  idle: 10000
// 	// 	},
	  
// 	// 	// SQLite only
// 	// 	storage: 'path/to/database.sqlite',
	  
// 	// 	// http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
// 	// 	operatorsAliases: false
	  
// 	// });  
// 	});

// 	const User = sequelize.define('user', {
// 		username: Sequelize.STRING,
// 		birthday: Sequelize.DATE
// 	  });

	  
var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './uploads')
	},
	filename: function(req, file, callback) {
		console.log(file)
		callback(null, file.originalname)
		
		//callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
})
//app.use(express.bodyParser());
 // parse application/json
app.use(bodyParser.json());                        
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(function(req, res, next) {
// 	//set headers to allow cross origin request.
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
// 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// 	next();
// });

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

app.use(function(req, res, next){
	global.connection = mysql.createConnection({
		host     : config.host,
		user     : config.username,
		password : config.password,
		database : config.database
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
passport.serializeUser(function(user, done) {
  console.log("user------", user)
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


// Use the FacebookStrategy within Passport.

passport.use(new FacebookStrategy({
    clientID: config.facebook_api_key,
    clientSecret:config.facebook_api_secret ,
    callbackURL: config.callback_url
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile,'profile')
    process.nextTick(function () {
      //Check whether the User exists or not using profile.id
      if(config.use_database==='true')
      {
        console.log(profile.id,'profileeeeeeeeeee');
      connection.query("SELECT * from fbusers where fb_id="+profile.id,function(err,rows,fields){
        if(err) throw err;
        if(rows.length===0)
          {
            console.log(profile.id,profile.username,'profileeeeeeeeeee')
            console.log("There is no such user, adding now");
            connection.query("INSERT into fbusers(fb_id,fb_name) VALUES('"+profile.id+"','"+profile.username+"')");
          }
          else
            {
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
app.use(session({ secret: 'keyboard cat', key: 'sid',resave: true,
saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
// Set our api routes
//app.use('/api', api);

app.get('/api', function(req, res){
  res.render('index', { user: req.user });
});

app.get('/api/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

app.get('/api/auth/facebook', passport.authenticate('facebook',{scope:'email'}));


app.get('/api/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect : 'http://localhost:8085/welcome', failureRedirect: '/api' }),
  function(req, res) {
    res.redirect('/api');
  });

app.get('/api/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

app.get('/', function(req, res, next) {
	connection.query('SELECT * from users', function (error, results, fields) {
		if (error) throw error;
        res.send(JSON.stringify({"results": results}));	});
});

app.get('/api/adminlist', function(req, res, next) {
	connection.query("SELECT * from users where role='admin'", function (error, results, fields) {
		if (error) throw error;
        res.send(JSON.stringify({"results": results}));	});
});

app.get('/api/salespersonlist', function(req, res, next) {
	connection.query("SELECT * from users where role='salesperson'", function (error, results, fields) {
		if (error) throw error;
        res.send(JSON.stringify({"results": results}));	});
});

app.get('/api/customerlist', function(req, res, next) {
	connection.query("SELECT * from users where role='customer'", function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"results": results}));
	});
});

app.get('/api/salespersonlist', function(req, res, next) {
	connection.query("SELECT * from users where role='salesperson'", function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"results": results}));
	});
});

app.get('/api/productslist', function(req, res, next) {
	// SELECT Users.*, Cities.*, States.*, Countries.* FROM Users JOIN Cities 
	// ON Users.city = Cities.city_id JOIN States ON Users.state = States.state_id 
	// JOIN Countries ON Users.country = Countries.country_id WHERE Users.user_id=?",[userid],

	connection.query('SELECT Product.*, Category.*, Currency.*, Quantity.*, Measure.* FROM Product JOIN Category ON Product.cat_id = Category.cat_id JOIN Currency ON Product.curr_id = Currency.cur_id JOIN Quantity ON Product.quant_id = Quantity.quant_id JOIN Measure ON Product.measure_id = Measure.m_id', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"results": results}));
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
    console.log(req.body.f_name,'fnameeeeeeeeeeeeeee');
    // f_name
    // l_name
    // addedBy
    // address
    // city_name
    // contact
    // country_name
    // dateAdded
    // email
    // landmark
    // pincode
    // state_name
    
    //const product = { p_title: 'dal', p_price: 123 };

	connection.query('SELECT country_id FROM Countries where country_name= ?', [req.body.country_name], function (error, results, fields) {
		if (error) throw error;
        console.log(results);
        this.country_id = results;
        console.log(this.country_id,'countryyyyyyyyyyyiddddddddddddddddddd')
		//res.send(JSON.stringify({"results": results}));
    });

    connection.query('SELECT state_id FROM States where state_name= ?', [req.body.state_name], function (error, results, fields) {
		if (error) throw error;
        console.log(results);
        this.state_id = results;
        console.log(this.state_id,'stateeeeeeeeeeeeeeeeee')
		//res.send(JSON.stringify({"results": results}));
    });

    connection.query('SELECT city_id FROM Cities where city_name= ?', [req.body.city_name], function (error, results, fields) {
		if (error) throw error;
        console.log(results);
        this.city_id = results;
        console.log(this.city_id,'citiiiiiiiiiiiiiiiiii')
		//res.send(JSON.stringify({"results": results}));
    });
    
	var sql = 'update Users SET f_name=?, l_name=?, addedBy=?,address=?, city=?,contact=?,country=?,dateAdded=?,email=?,landmark=?,pincode=?,state=? where user_id=?';
    
//    // var params = '[req.body.f_name,req.body.l_name,req.body.addedBy, req.body.address, req.body.city_name,req.body.contact, req.body.country_name, req.body.dateAdded, req.body.email, req.body.landmark,req.body.pincode,req.body.state_name,req.body.user_id]';
        
        
	var query = connection.query(sql,[req.body.f_name,req.body.l_name,req.body.addedBy, req.body.address, this.city_id,req.body.contact, this.country_id, req.body.dateAdded, req.body.email, req.body.landmark,req.body.pincode,this.state_id,req.body.user_id],function(err, result) {
	       console.log("result",result, "err", err);
	   });
});

app.get("/api/customerdetail",(req, res) => {
	//console.log("req", req)
	console.log(req.query.userid);
    var userid = req.query.userid;
   // connection.query("SELECT Users.*, Cities.*, States.*, Countries.* FROM Users JOIN Cities ON Users.city = Cities.city_id JOIN States ON Users.state = States.state_id JOIN Countries ON Users.country = Countries.country_id WHERE Users.user_id=?",[userid])
    connection.query('SELECT users.*, Cities.*, States.*, Countries.* FROM Users JOIN Cities ON Users.city = Cities.city_id JOIN States ON Users.state = States.state_id JOIN Countries ON Users.country = Countries.country_id WHERE Users.user_id=?',[userid], function (error, results, fields) {
		if (error) throw error;
		console.log(results);
		res.send(JSON.stringify({"results": results}));
	});
});

app.post("/api/productedit", (req, res) => {
	console.log(req.body.title,"title");
	console.log(req.body.price);
	const product = { p_title: 'dal', p_price: 123 };
	var query = connection.query('INSERT INTO Product SET ?',{description:req.body.title},
	//var query = connection.query("INSERT INTO tbl_product (p_title,p_price) VALUES ('daal',123)",
	function(err, result) {
        console.log("result",result, "err", err);
    });
    // connection.query("insert into tbl_product(p_title,p_price) values(?,?)",[product], function (error, results, fields) {
	// 	if (error) throw error;
	// 	console.log(results);
	// 	console.log('inserted');
	// 	//res.send(JSON.stringify({"results": results}));
	// })
});

app.get("/api/productdetail",(req, res) => {
	//console.log("req", req)
	console.log(req.query.productid);
	var p_id = req.query.productid;
	connection.query('SELECT * FROM Product where prod_id= ?', [p_id], function (error, results, fields) {
		if (error) throw error;
		console.log(results);
		res.send(JSON.stringify({"results": results}));
	});
});


app.get('/api/storeview', function(req, res, next) {
	// SELECT Users.*, Cities.*, States.*, Countries.* FROM Users JOIN Cities 
	// ON Users.city = Cities.city_id JOIN States ON Users.state = States.state_id 
	// JOIN Countries ON Users.country = Countries.country_id WHERE Users.user_id=?",[userid],

	connection.query('SELECT * FROM Store', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"results": results}));
	});
});

app.post("/api/storeedit", (req, res) => {
	
	console.log(req.body,"bodyyyyyyyyyyyyyyyyyyyyyyyyyyy");
	//const product = { p_title: 'dal', p_price: 123 };
	// var query = connection.query('INSERT INTO Store SET ?',{name:req.body.name, description: req.body.description, address: req.body.address, pincode: req.body.pincode, city: req.body.city, state: req.body.state, country: req.body.country, contact: req.body.contact, date: req.body.date },
	// //var query = connection.query("INSERT INTO tbl_product (p_title,p_price) VALUES ('daal',123)",
	// function(err, result) {
    //     console.log("result",result, "err", err);
	// });
	var query = connection.query(
		'INSERT INTO Store SET ?', {
			name:req.body.name, 
			description: req.body.description, 
			address: req.body.address, 
			pincode: req.body.pincode, 
			city: req.body.city, 
			state: req.body.state, 
			country: req.body.country, 
			contact: req.body.contact, 
			date: req.body.date 
		},
		function(err, result) {
			console.log("result",result, "err", err);
		}
	);
});


app.get('/api/catlist', function(req, res, next) {
	// SELECT Users.*, Cities.*, States.*, Countries.* FROM Users JOIN Cities 
	// ON Users.city = Cities.city_id JOIN States ON Users.state = States.state_id 
	// JOIN Countries ON Users.country = Countries.country_id WHERE Users.user_id=?",[userid],

	connection.query('SELECT * FROM Category', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"results": results}));
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
							if(err) throw err;
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

app.get('/api/measlist', function(req, res, next) {
	// SELECT Users.*, Cities.*, States.*, Countries.* FROM Users JOIN Cities 
	// ON Users.city = Cities.city_id JOIN States ON Users.state = States.state_id 
	// JOIN Countries ON Users.country = Countries.country_id WHERE Users.user_id=?",[userid],

	connection.query('SELECT * FROM Measure', function (error, results, fields) {
		if (error) throw error;
		var measures=results[0];
		res.send(results);
		//res.send(JSON.stringify({"results": results}));
	});
});

app.get('/api/quantlist', function(req, res, next) {
	// SELECT Users.*, Cities.*, States.*, Countries.* FROM Users JOIN Cities 
	// ON Users.city = Cities.city_id JOIN States ON Users.state = States.state_id 
	// JOIN Countries ON Users.country = Countries.country_id WHERE Users.user_id=?",[userid],

	connection.query('SELECT * FROM Quantity', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"results": results}));
	});
});

app.get('/api/currlist', function(req, res, next) {
	// SELECT Users.*, Cities.*, States.*, Countries.* FROM Users JOIN Cities 
	// ON Users.city = Cities.city_id JOIN States ON Users.state = States.state_id 
	// JOIN Countries ON Users.country = Countries.country_id WHERE Users.user_id=?",[userid],

	connection.query('SELECT * FROM Currency', function (error, results, fields) {
		if (error) throw error;
		var currencies=results[0];
		res.send(results);
	});
});

app.get('/api/citylist', function(req, res, next) {
	connection.query('SELECT * FROM Cities where state_id = ?', [req.query.state_id], function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"results": results}));
	});
});

app.get('/api/statelist', function(req, res, next) {
	console.log(req.query)
	connection.query('SELECT * FROM States where country_id = ?', [req.query.country_id], function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"results": results}));
	});
});

app.get('/api/countrylist', function(req, res, next) {
	// SELECT Users.*, Cities.*, States.*, Countries.* FROM Users JOIN Cities 
	// ON Users.city = Cities.city_id JOIN States ON Users.state = States.state_id 
	// JOIN Countries ON Users.country = Countries.country_id WHERE Users.user_id=?",[userid],

	connection.query('SELECT * FROM Countries', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"results": results}));
	});
});

//our file upload function.
app.post('/api/imageupload', function (req, res, next) {
// 	var path = '';
// 	upload(req, res, function (err) {
// 	   if (err) {
// 		 // An error occurred when uploading
// 		 console.log(err);
// 		 return res.status(422).send("an Error occured")
// 	   }  
// 	  // No error occured.
// 	   path = req.file.path;
// 	   return res.send("Upload Completed for "+path); 
//  });     
console.log("request body",req.body);
var upload = multer({
	storage: storage
}).single('photo')
upload(req, res, function(err) {
	console.log("request body inside",req.body);
	//console.log("response body inside",res);
	console.log("response file info",res.req.file);
	//console.log('upload response', res);
	//res.end('File is uploaded')
	//run query to insert data into database
	var path = res.req.file.path;
	const product = { p_title: 'dal', p_price: 123 };
	var query = connection.query('INSERT INTO Product SET ?',{imagepath: res.req.file.path},
	//var query = connection.query("INSERT INTO tbl_product (p_title,p_price) VALUES ('daal',123)",
	function(err, result) {
        console.log("result",result, "err", err);
    });
});

});


//local login-------------------------------------------------------------------------
//const app = express();
const BodyParser = require('body-parser');
const CookieParser = require('cookie-parser');
const {userResponse, validateUser, secret} = require('./config/config');
//const passport = require('passport');
const passportConfig = require('./config/passport');

app.use(BodyParser.json());
app.use(CookieParser());
app.use(BodyParser.urlencoded({extended:true}));
var configDB = require('./config/config.js');
var flash=require("connect-flash");
app.use(flash());

passportConfig(passport);

app.use(session({
secret: 'anjali'
}));
app.use(passport.initialize());
app.use(passport.session());
// process the login form
app.post('/api/login', 
function(req, res, next) {
	console.log('request----------------',req.body);
	console.log('request----------------',req.body.username);

	passport.authenticate('local-login', function(err, user, info) {
		//console.log('request----------------',req);
		console.log("errrrrrorrrrrrrrrrr",err);
		console.log("yayyyyyyyyyy",user);
		console.log("infoooooooooo",info);
		
		if (err) { return next(err); }
	  if (!user) {
		res.status(401);
		res.json({"reason": "Invalid credentials"});
	  } else {
		  res.status(200);
		  res.json({"login": user})
		console.log("successful login", user);	
	  }
	})(req, res, next);
}
	  
);

app.listen(port, () => {
    console.log("Server listening on port " + port);
});
