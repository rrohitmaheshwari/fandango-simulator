const mysql_pool    = require('../database/mysql/mysql-pool');
const moment        = require('moment');
const {storeUserBookMovie} = require('./analytics')

function handle_request(msg, callback) {

    let result = {};
    let transaction_date = moment().format("YYYY-MM-DD"); // Current Date


    storeUserBookMovie(msg)

    let fetchPurchases = "SELECT (IFNULL(SUM(quantity), 0)) as ticketsBooked  " +
        "FROM `billing` " +
        "WHERE `movie_id` = '"      + msg.movie_id      + "' " +
        "AND `hall_id` = '"         + msg.hall_id       + "' " +
        "AND `show_date` = '"       + msg.show_date      + "' " +
        "AND `show_time` = '"       + msg.show_time      + "' " +
        "AND `screen_number` = '"   + msg.screenNumber  + "' " +
        "AND `status` = 'BOOKED'";

    mysql_pool.fetchData(function(err, results){
        if (err) {
            result.code  = 500;
            result.value = { message: "There is some issue in server. Please try again later." };
            return callback(null, result);
        }
        //Existing movie booking tickets fetched
        let ticketsAvail = msg.totalSeats - results[0].ticketsBooked;
        console.log("tickets available: ", ticketsAvail);

        if(ticketsAvail >= msg.quantity) {

            console.log("Movie BookedMovie BookedMovie Booked: ", msg);

            let bookMovieQuery = "INSERT INTO `billing` " +
                "(`amount`, `tax`, `email`, `movie_id`, `hall_id`, `show_time`, `show_date`, `quantity`, `transaction_date`, `status`, `city`, `screen_number`) "
                + "VALUES ('"
                + msg.amount    + "', '"
                + msg.tax     + "', '"
                + msg.email     + "', '"
                + msg.movie_id  + "', '"
                + msg.hall_id   + "', '"
                + msg.show_time + "', '"
                + msg.show_date + "', '"
                + msg.quantity  + "', '"
                + transaction_date
                + "', 'BOOKED', '"
                + msg.city  + "', '"
                + msg.screenNumber
                + "')";

            mysql_pool.fetchData(function(err, results){
                if (err) {
                    result.code  = 500;
                    result.value = { message: "There is some issue in server. Please try again later." };
                    return callback(null, result);
                }
                //Movie Booked
                console.log("Movie Booked: ", results);
                result.code  = 200;
                result.value = { message : "Movie booked successfully" };
                return callback(null, result);
            }, bookMovieQuery);

        } else {
            result.code  = 400;
            result.value = { message: "No seats available. Please try different show time." };
            return callback(null, result);
        }

    }, fetchPurchases);


}

exports.handle_request = handle_request;