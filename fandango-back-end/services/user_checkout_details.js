const mysql_pool = require('../database/mysql/mysql-pool');
const {storeUserCheckout} = require('./analytics')
function handle_request(msg, callback) {

    storeUserCheckout(msg);
    let result = {};

    let fetchPurchases = "SELECT (IFNULL(SUM(quantity), 0)) as ticketsBooked  " +
        "FROM `billing` " +
        "WHERE `movie_id` = '"      + msg.movie_id      + "' " +
        "AND `hall_id` = '"         + msg.hall_id       + "' " +
        "AND `show_date` = '"       + msg.showDate      + "' " +
        "AND `show_time` = '"       + msg.showTime      + "' " +
        "AND `screen_number` = '"   + msg.screenNumber  + "' " +
        "AND `status` = 'BOOKED'";

    mysql_pool.fetchData(function(err, results){
        if (err) {
            result.code  = 500;
            result.value = { message: "There is some issue in server. Please try again later." };
            callback(null, result);
        }
        //Existing movie booking tickets fetched
        result.code = 200;
        result.value = {
            ticketsBooked: results[0].ticketsBooked
        };
        return callback(null, result);

    }, fetchPurchases);
}

exports.handle_request = handle_request;