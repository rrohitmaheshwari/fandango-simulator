const _ = require('lodash');
const bcrypt = require('bcryptjs');
const mysql_pool = require('../database/mysql/mysql-pool');
const {storeUserLogin} = require('./analytics')
function handle_request(msg, callback) {

    storeUserLogin(msg)
    let result = {};
    let getUser = "select * from users where email='" + msg.email + "' AND status = 'ACTIVE'";
    
	mysql_pool.fetchData(function(err, results){
		if (err) {
            result.code = 500;
            result.value = { message: "There is some issue in server. Please try again later." };
            return callback(null, result);
        }

        //Successfull fetch
        else if (results.length > 0) {
            bcrypt.compare(msg.password, results[0].password, function (err, resp) {
                if (resp) {
                    // Passwords match
                    let userInfo = _.pick(results[0], ['email', 'firstname', 'lastname', 'phone', 'address', 'city', 'state', 'zip', 'type', 'cardnumber', 'cardmonth', 'cardyear']);
                    result.value = { user: userInfo, message: "Login Successful"};
                    result.code = 200;
                    return callback(null, result);
                } else {
                    // Passwords doesn't match
                    result.code = 401;
                    result.value = { message: "The email and password you entered did not match our records. Please double-check and try again." };
                    return callback(null, result);
                }
            });
        } else {
            //user not found 404
            result.code = 404;
            result.value = { message: "This email does not exists. Please create an account" };
            return callback(null, result);
        }
    }, getUser);
}

exports.handle_request = handle_request;