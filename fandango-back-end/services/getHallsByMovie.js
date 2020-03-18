const MovieHall = require('../database/mongo/model/movie_hall');
const mongodb   = require("mongodb");

function handle_request(msg, callback) {


    console.log("herhehre", msg.movie_id);
    let res = {};
    console.log("In Get Halls By Movie ID.js handle_request():");

    let pipeline = [
        {
            "$unwind": {
                "path": "$screens",
                "preserveNullAndEmptyArrays": true
            }
        },
        {
            "$match": {
                "screens.movieId": new mongodb.ObjectID(msg.movie_id)
            }
        },
        {
            "$project": {
                "_id": "$_id",
                "name": "$name",
                "address": "$address",
                "showTimings": "$screens.showTimings",
                "phone": "$phone",
                "screenNumber": "$screens.screenNumber",
                "ticketPrice" : "$screens.ticketPrice",
                "totalSeats" : "$screens.totalSeats",
                "city"  : "$city"
            }
        }
    ];

    // Executing Pipeline code
    var promise = MovieHall.aggregate(pipeline).exec();

    promise.then(function (data) {
        console.log("CHECK THIS: ", data);
        res.value = data;
        res.code = 200;
        callback(null, res);
    }).catch(function (err) {

        console.log('error:', err.message);
        res.code = '500';
        callback(err, res);
    });
}

exports.handle_request = handle_request;