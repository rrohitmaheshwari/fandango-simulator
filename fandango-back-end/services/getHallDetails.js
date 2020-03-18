const MovieHall = require('../database/mongo/model/movie_hall');

function handle_request(msg, callback) {

    var res = {};
    console.log("In getHallDetails.js handle_request():");

    MovieHall.findOne({
        _id: msg.hall_id
    }, function(err, hall) {
        if (hall) {

            res.code = "200";
            res.value = hall;
            console.log(hall);
        } else {

            res.code = "404";
            res.value = "Could not find Movie - Hall details.";
            console.log(res.value);
        }

        callback(null, res);
    });
}

exports.handle_request = handle_request;