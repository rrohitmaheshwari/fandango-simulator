const mysql_pool = require('../database/mysql/mysql-pool');

function handle_request(msg, callback) {

    let result = {};
    let fetchPurchases = "SELECT * FROM `billing` WHERE `email` = '" + msg.email + "'";

    mysql_pool.fetchData(function(err, results){
        if (err) {
            result.code  = 500;
            result.value = { message: "There is some issue in server. Please try again later." };
            callback(null, result);
        }
        //User updated - basic info changed
        console.log(results)
        result.code  = 200;
        result.value = results;
        callback(null, result);
    }, fetchPurchases);
}

exports.handle_request = handle_request;