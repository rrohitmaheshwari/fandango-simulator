const Movie      = require('../database/mongo/model/movie');
const {storeUserSearchMovie} = require('./analytics')
function handle_request(msg, callback) {
    storeUserSearchMovie(msg)
    var res = {};
    console.log("In post-freelancer.js handle_request():");
    var pipeline = [
        { "$match": { "title": new RegExp(msg.movieName, "ig") } },
        { "$unwind": { "path": "$reviews", "preserveNullAndEmptyArrays": true } }, 
        {
            "$group": {
                "_id": {
                    "_id"       : "$_id"       ,
                    "title"     : "$title"     ,
                    "genre"     : "$genre"     ,
                    "characters": "$characters",
                    "duration"  : "$duration"  ,
                    "ratingType": "$ratingType",
                    "image"    : "$image",
                },
                "rating": {
                    "$avg": "$reviews.rating"
                }
            }
        }
    ];

    // Executing Pipeline code
    var promise = Movie.aggregate(pipeline).exec();    
    
    promise.then(function (result) {
        let data = [];
        console.log(result);
        result.map((movie) => {
            let movieObj = movie._id;
            movieObj['rating'] = movie.rating;
            data.push(movieObj);
        });
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