// config/passport.js
				
// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

var mysql = require('mysql');

var connection = mysql.createConnection({
				  host     : 'localhost',
				  user     : 'root',
				  password : ''
				});

connection.query('USE simplyorganics_new');	

// expose this function to our app using module.exports
module.exports = function(passport) {

	// =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        console.log('serializeeeeeeeee',user);
		done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
		connection.query("select * from localusers where id = "+id,function(err,rows){	
			done(err, rows[0]);
		});
    });
	

 	// =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

		// find a user whose email is the same as the forms email
		// we are checking to see if the user trying to login already exists
        connection.query("select * from localusers where email = '"+email+"'",function(err,rows){
			console.log(rows);
			console.log("above row object");
			if (err)
                return done(err);
			 if (rows.length) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {

				// if there is no user with that email
                // create the user
                var newUserMysql = new Object();
				
				newUserMysql.email    = email;
                newUserMysql.password = password; // use the generateHash function in our user model
                
                console.log(newUserMysql.email, newUserMysql.password);
				var insertQuery = "INSERT INTO localusers ( email, pass ) values ('" + email +"','"+ password +"')";
					console.log(insertQuery);
				connection.query(insertQuery,function(err,rows){
                    console.log("rowssssssss",rows);
				newUserMysql.id = rows.insertId;
				console.log('newUserMysql.id',newUserMysql.id);
				return done(null, newUserMysql);
				});	
            }	
		});
    }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy(
    {
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req,username, password, done) { // callback with email and password from our form

        console.log('in passport local',username,password);
         connection.query("SELECT * FROM `users` WHERE `email` = '" + username + "'",function(err,rows){
            console.log("rowwwwwwwssssssssssss---------------------------",rows);
            console.log("rowwwwwwwssssssssssss[0]---------------------------",rows[0]);
            
            console.log("errorrrrrrrrrrrrrrrrrr", err);
			if (err)
                return done(err);
			 if (!rows.length) {
                 console.log(rows.length, "rows length");
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
            } 
			
			// if the user is found but the password is wrong
            if (!( rows[0].pass == password)) {
            console.log("ijijifjils");
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
            }
            // all is well, return successful user
            var user = rows[0]; 
            console.log(user,"userrrrrrrrrrrrrrrrrrrrrrrrrrr");
            return done(null, user);			
		
		});
		


    }));

};