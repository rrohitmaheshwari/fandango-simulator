const mysql_pool = require('../database/mysql/mysql-pool');
const {storeUserUpdateBasicInfo} = require('./analytics');
function handle_request(msg, callback) {

    storeUserUpdateBasicInfo(msg);

    let result = {};
    let updateUserAccount = "UPDATE `users` SET firstname ='" + msg.firstname +"', lastname ='" + msg.lastname +"', phone ='" + msg.phone +"' WHERE `email`='" + msg.email + "'";

    mysql_pool.fetchData(function(err, results){
        if (err) {
            result.code  = 500;
            result.value = { message: "There is some issue in server. Please try again later." };
            callback(null, result);
        }
        //User updated - basic info changed
        result.code  = 200;
        result.value = { message: "User Basic Information Updated!" };
        callback(null, result);
    }, updateUserAccount);
}

exports.handle_request = handle_request;