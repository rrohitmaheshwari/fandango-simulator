const mysql_pool = require('../database/mysql/mysql-pool');
const {storeUserUpdatePayment} = require('./analytics');

function handle_request(msg, callback) {

    storeUserUpdatePayment(msg);
    let result = {};
    let updateUserAccount = "UPDATE `users` SET cardnumber ='" + msg.cardnumber + "', cardmonth ='" + msg.cardmonth + "', cardyear ='" + msg.cardyear +"', cardzip ='" + msg.cardzip +"' WHERE `email`='" + msg.email + "'";

    mysql_pool.fetchData(function(err, results){
        if (err) {
            result.code  = 500;
            result.value = { message: "There is some issue in server. Please try again later." };
            callback(null, result);
        }
        //User updated - basic info changed
        result.code  = 200;
        result.value = { message: "User Card Details Updated!" };
        callback(null, result);
    }, updateUserAccount);
}

exports.handle_request = handle_request;