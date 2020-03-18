const mysql_pool = require('../database/mysql/mysql-pool');
const {storeUserUpdateAddress} = require('./analytics');

function handle_request(msg, callback) {

    storeUserUpdateAddress(msg);

    let result = {};
    let updateUserAccount = "UPDATE `users` SET address ='" + msg.address + "', city ='" + msg.city + "', state ='" + msg.state +"', zip ='" + msg.zip +"' WHERE `email`='" + msg.email + "'";

    mysql_pool.fetchData(function(err, results){
        if (err) {
            result.code  = 500;
            result.value = { message: "There is some issue in server. Please try again later." };
            callback(null, result);
        }
        //User updated - basic info changed
        result.code  = 200;
        result.value = { message: "User Address Updated!" };
        callback(null, result);
    }, updateUserAccount);
}

exports.handle_request = handle_request;