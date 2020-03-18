const Movie = require('../database/mongo/model/movie');
const {
    storeGetMovieHalls,
    storeFetchMovies
} = require('./analytics');

function handle_request(msg, callback) {

    var res = {};

    Movie.findOne({
        _id: msg.movie_id
    }, function(err, movie) {
        if (movie) {
            storeFetchMovies(msg, movie);
            res.code = "200";
            res.value = movie;
        } else {

            res.code = "404";
            res.value = "Could not find Movie";
        }

        callback(null, res);
    });
}

exports.handle_request = handle_request;