const redis = require('redis');
const client =redis.createClient('6379','54.176.242.8');

client.on("error", function (err) {
    console.log("redis Error " + err);
});

client.on("connect", function () {
    console.log("redis connected");
});

const KEY_CONSTANTS = {
    ALL_MOVIES:"REDIS_ALL_MOVIES",
    ALL_MOVIE_HALLS:"REDIS_ALL_MOVIE_HALLS",
    ALL_NORMAL_USERS:"REDIS_ALL_NORMAL_USERS,"
}

//30 minutes
const EXPIRE_TIME = 30*60;

module.exports={
    client,
    KEY_CONSTANTS,
    EXPIRE_TIME
}

//
// var redis = require('../database/redis');
// redis.client.get(redis.KEY_CONSTANTS.ALL_MOVIES,function(err,reply){
//     if(err || !reply){
//         //miss
//     }
//     else{
//         //hit
//     }
// }

