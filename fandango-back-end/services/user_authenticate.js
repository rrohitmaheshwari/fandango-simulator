const _ = require('lodash');
const bcrypt = require('bcryptjs');
const mysql_pool = require('../database/mysql/mysql-pool');

function handle_request(msg, callback) {

    let result = {};
    let getUser = "select * from users where email='" + msg.email + "'";
    
	mysql_pool.fetchData(function(err, results){
		if (err) {
            result.code = 500;
            result.value = { message: "There is some issue in server. Please try again later." };
            callback(null, result);
        }

        //Successfull fetch
        if (results.length > 0) {
            let userInfo = _.pick(results[0], ['email', 'firstname', 'lastname', 'phone', 'address', 'city', 'state', 'zip', 'type', 'cardnumber', 'cardmonth', 'cardyear']);
            result.value = {user: userInfo};
            result.code = 200;
            callback(null, result);
        } else {
            //user not found 404
            result.code = 404;
            result.value = { message: "This user does not exists." };
            callback(null, result);            
        }
    }, getUser);
}

exports.handle_request = handle_request;