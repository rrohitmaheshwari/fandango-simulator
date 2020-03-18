const MovieHall      = require('../database/mongo/model/movie_hall');
const {storeUserSearchHall} = require('./analytics')

function handle_request(msg, callback) {

    storeUserSearchHall(msg)
    console.log(msg.hallName);
    var res = {};
    console.log("In post-freelancer.js handle_request():");
    var pipeline = [
        { "$match": { "name": new RegExp(msg.hallName, "ig") } },
        {
            "$project": {
                "_id"         : "$_id" ,
                "name"        : "$name" ,
                "address"     : "$address",
                "phone"       : "$phone" ,
                "image"    : "$image",
                "screenCount" : {
                    "$size": "$screens"
                }
            }
        }
    ];

    // Executing Pipeline code
    var promise = MovieHall.aggregate(pipeline).exec();    
    
    promise.then(function (data) {
        console.log(data);
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