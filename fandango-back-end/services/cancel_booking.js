const mysql_pool = require('../database/mysql/mysql-pool');

function handle_request(msg, callback) {

    let result = {};
    let cancelBooking = "UPDATE `billing` SET status='CANCELED' WHERE `billing_id`='" + msg.billing_id + "'";

    mysql_pool.fetchData(function(err, results){
        if (err) {
            result.code  = 500;
            result.value = { message: "There is some issue in server. Please try again later." };
            return callback(null, result);
        }
        
        //Booking cancelled - status changed to CANCELED
        result.code  = 200;
        result.value = { message: "Booking Cancelled successfully!!!" };
        return callback(null, result);
    }, cancelBooking);
}

exports.handle_request = handle_request;