var mysql = require('mysql');
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var port = 3000;

//app.use(express.bodyParser());
 // parse application/json
 app.use(bodyParser.json());                        
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next){
	global.connection = mysql.createConnection({
		host: "localhost",
        user: "root",
        password: "Anjal!22",
        database: "simplyorganicsold"
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


app.get('/', function(req, res, next) {
	connection.query('SELECT * from tbl_users', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
});

app.get('/productslist', function(req, res, next) {
	connection.query('SELECT * FROM tbl_product', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"results": results}));
	});
});

app.get('/customerlist', function(req, res, next) {
	connection.query('SELECT * FROM tbl_users', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"results": results}));
	});
});

app.post("/customeradd", (req, res) => {
	console.log(req.body.fname);
	console.log(req.body.lname);
	//const product = { p_title: 'dal', p_price: 123 };
	var query = connection.query('INSERT INTO about_us SET ?',{description:req.body.fname},
	//var query = connection.query("INSERT INTO tbl_product (p_title,p_price) VALUES ('daal',123)",
	function(err, result) {
        console.log("result",result, "err", err);
    });
});

app.get("/customerdetail",(req, res) => {
	//console.log("req", req)
	console.log(req.query.userid);
	var userid = req.query.userid;
	connection.query('SELECT * FROM tbl_users where user_id= ?', [userid], function (error, results, fields) {
		if (error) throw error;
		console.log(results);
		res.send(JSON.stringify({"results": results}));
	});
});

app.post("/productedit", (req, res) => {
	console.log(req.body.title,"title");
	console.log(req.body.price);
	const product = { p_title: 'dal', p_price: 123 };
	var query = connection.query('INSERT INTO about_us SET ?',{description:req.body.title},
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

app.get("/productdetail",(req, res) => {
	//console.log("req", req)
	console.log(req.query.productid);
	var p_id = req.query.productid;
	connection.query('SELECT * FROM tbl_product where p_id= ?', [p_id], function (error, results, fields) {
		if (error) throw error;
		console.log(results);
		res.send(JSON.stringify({"results": results}));
	});
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});
