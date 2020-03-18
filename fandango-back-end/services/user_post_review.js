const Movie = require('../database/mongo/model/movie');
const redis = require('../database/redis');
const {storeUserPostReview} = require('./analytics');

function handle_request(msg, callback) {

    storeUserPostReview(msg);
    console.log("post review :",msg);
    const result = {};

    let writeResult = Movie.update(
        { _id: msg.movie_id, "reviews.email": msg.email },
        {
            $set: {
                "reviews.$.email"   : msg.email,
                "reviews.$.name"    : msg.name,
                "reviews.$.rating"  : msg.rating,
                "reviews.$.title"   : msg.title,
                "reviews.$.comment" : msg.comment,
            }
        },
        { "upsert": true },
        function (err, doc) {
            if (err) {
                result.code     = 500;
                result.value    = { message: "User review update failed" };
                console.log(err);
                return callback(err, result);
            }
            result.code  = 200;
            result.value = { message: "User review updated successfully."};
            console.log('redis delete: '+ redis.KEY_CONSTANTS.ALL_MOVIES);
            redis.client.del(redis.KEY_CONSTANTS.ALL_MOVIES);
            console.log("###doc");
            console.log(doc);
            return callback(null, result);
        }
    );

    if(!writeResult.nModified) {
        Movie.update(
            {
                _id: msg.movie_id,
                "reviews.email": {
                    $ne: msg.email
                }
            },
            {
                "$push" : {
                    "reviews": {
                        "email"   : msg.email,
                        "name"    : msg.name,
                        "rating"  : msg.rating,
                        "title"   : msg.title,
                        "comment" : msg.comment

                    }
                }
            },
            { "upsert": true },
            function (err, doc) {
                if (err) {
                    result.code  = 500;
                    result.value = { message: "User review updated failed."};
                    console.log(err);
                    return callback(err, result);
                }
                result.code  = 200;
                result.value = { message: "User review updated successfully."};
                console.log('redis delete: '+ redis.KEY_CONSTANTS.ALL_MOVIES);
                redis.client.del(redis.KEY_CONSTANTS.ALL_MOVIES);
                console.log(doc);
                return callback(null, result);
            }
        )
    }
}

exports.handle_request = handle_request;