// config/passport.js
				
// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var mysql = require('mysql');
var config = require('./config');
var connection = mysql.createConnection({
				  host     : 'localhost',
				  user     : 'root',
				  password : 'Anjal!22'
				});

connection.query('USE SO');	

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
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {

		// find a user whose email is the same as the forms email
		// we are checking to see if the user trying to login already exists
       // connection.query("select * from localusers where email = '"+username+"'",function(err,rows){
       connection.query("select * from users where email = '"+username+"'",function(err,rows){     
       console.log(rows,"rowssssssss");
			console.log("above row object");
			if (err)
                return done(err);
			 if (rows.length) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {

				// if there is no user with that email
                // create the user
                var newUserMysql = new Object();
				
				newUserMysql.username    = username;
                newUserMysql.password = password; // use the generateHash function in our user model
                
                console.log(newUserMysql.username, newUserMysql.password);
				//var insertQuery = "INSERT INTO localusers ( email, pass ) values ('" + username +"','"+ password +"')";
                var insertQuery = "INSERT INTO users ( email, pass ) values ('" + username +"','"+ password +"')";    
                console.log(insertQuery);
				connection.query(insertQuery,function(err,rows){
                    console.log("rowssssssss in else",rows);
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
              console.log("rowssssssss", rows);
            if(err) throw err;
            if(rows.length===0)
              {
                console.log(profile.id,profile.username,profile.emails[0].value,'profile.id, profile.username');
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



};