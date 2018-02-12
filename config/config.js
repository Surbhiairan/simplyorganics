module.exports={
    /*
    * This file contains the configurations information of Twitter login app.
    * It consists of Twitter app information, database information.
    */
    
        "facebook_api_key" 		: 			"531833047215910",
        "facebook_api_secret"	:			"6aec493c599b79dde7825a14e67f088f",
        "callback_url"			:			"http://localhost:3002/api/auth/facebook/callback",
        'profileURL'            : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields'         : ['id', 'email', 'name'], // For requesting permissions from Facebook API
        "use_database"			:			"true",
        "host"					:			"localhost",
        "username"				:			"root",
        "password"				:			"",
        "database"				:			"simplyorganics_new"
    }
    