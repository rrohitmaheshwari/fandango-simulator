const mysql_pool = require('../database/mysql/mysql-pool'      );
var   Movie      = require('../database/mongo/model/movie'     );
var   MovieHall  = require('../database/mongo/model/movie_hall');
const mongoose = require("mongoose");

function handle_request(msg, callback) {

    let result = {};

        MovieHall.findOne({ownerEmail : msg.user.email})
            .lean(true)
            .exec((err, moviehall)=>{
                console.log(moviehall);
                if(err){
                    console.log("###1");
                    result.code = 500;
                    result.value = {message:"There is some issue in server. Please try again later.", error : err};
                    return callback(null, result);
                }
                else {

                    let fetchPurchases = "SELECT movie_id,sum(amount+tax) as revenue,sum(quantity) as tickets FROM fandangodb.billing WHERE `hall_id` = '" + moviehall._id + "' and `status`='BOOKED' GROUP BY movie_id  ";

                    mysql_pool.fetchData(function(err, results) {
                        if (err) {
                            console.log("###2");
                            result.code  = 500;
                            result.value = { message: "There is some issue in server. Please try again later." };
                            return callback(null, result);
                        }

                        let movieids = [];
                        results.map((item)=>{
                            movieids.push(item.movie_id)
                        });
                        Movie.find({_id:{$in:movieids}})
                            .then((movies)=>{
                                let hash = {};
                                movies.map((item)=>{
                                    hash[item._id]=item;
                                })
                                results.map((item)=>{
                                    item.movie=hash[item.movie_id];
                                })
                                console.log(results)
                                result.code  = 200;
                                result.value = {revenues:results};
                                return callback(null, result);
                            })
                            .catch((error) => {
                                console.log("###3");
                                result.code  = 500;
                                result.value = { message: "There is some issue in server. Please try again later." };
                                return callback(null, result);
                            })

                    }, fetchPurchases);
                }
            })
}


function getAdminRevenue(msg, callback) {

    let result = {};

    let fetchPurchases = "SELECT movie_id,sum(amount+tax) as revenue,sum(quantity) as tickets FROM fandangodb.billing WHERE `status`='BOOKED' GROUP BY movie_id; SELECT hall_id,sum(amount+tax) as revenue,sum(quantity) as tickets FROM fandangodb.billing WHERE `status`='BOOKED' GROUP BY hall_id";

    mysql_pool.fetchData(function(err, results) {
        if (err) {
            console.log("###2");
            result.code  = 500;
            result.value = { message: "There is some issue in server. Please try again later." };
            return callback(null, result);
        }

        let movieids = [];
        let hallids = [];
        results[0].map((item)=>{
            movieids.push(item.movie_id)
        });

        results[1].map((item)=>{
            hallids.push(item.hall_id)
        });
        Movie.find({_id:{$in:movieids}})
            .then((movies)=>{
                let hash = {};
                movies.map((item)=>{
                    hash[item._id]=item;
                })
                results[0].map((item)=>{
                    item.movie=hash[item.movie_id];
                })

                MovieHall.find({_id:{$in:hallids}})
                    .then((moviehalls)=>{
                        let hash1 = {};
                        moviehalls.map((item)=>{
                            hash1[item._id]=item;
                        })
                        results[1].map((item)=>{
                            item.moviehall=hash1[item.hall_id];
                        })


                        console.log(results)
                        result.code  = 200;
                        result.value = {movieRevenues:results[0],moviehallRevenues:results[1]};
                        return callback(null, result);
                    })
                    .catch((error) => {
                        console.log("###3");
                        result.code  = 500;
                        result.value = { message: "There is some issue in server. Please try again later." };
                        return callback(null, result);
                    })

            })
            .catch((error) => {
                console.log("###3");
                result.code  = 500;
                result.value = { message: "There is some issue in server. Please try again later." };
                return callback(null, result);
            })

    }, fetchPurchases);
}

exports.handle_request = handle_request;
exports.getAdminRevenue = getAdminRevenue;