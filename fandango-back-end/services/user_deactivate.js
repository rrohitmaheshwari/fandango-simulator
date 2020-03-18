const {storeUserDeactivate} =require( "./analytics");

const mysql_pool = require('../database/mysql/mysql-pool');

function handle_request(msg, callback) {

    storeUserDeactivate(msg)
    let result = {};
    let deleteUserAccount = "UPDATE `users` SET status='INACTIVE' WHERE `email`='" + msg.email + "'";

    mysql_pool.fetchData(function(err, results){
        if (err) {
            result.code  = 500;
            result.value = { message: "There is some issue in server. Please try again later." };
            callback(null, result);
        }
        //User deleted - status changed to INACTIVE
        result.code  = 200;
        result.value = { message: "User account deleted!" };
        callback(null, result);
    }, deleteUserAccount);
}

exports.handle_request = handle_request;