const {storeUserFetchPurchases} =require( "./analytics");

const mysql_pool = require('../database/mysql/mysql-pool'      );
var   Movie      = require('../database/mongo/model/movie'     );
var   MovieHall  = require('../database/mongo/model/movie_hall');
const mongoose = require("mongoose");
function handle_request(msg, callback) {

    let result = {};
    storeUserFetchPurchases(msg)

    if(msg.userType == "HALL_OWNER") {
        console.log("hall owner")

        MovieHall.findOne({ownerEmail : msg.email})
        .populate('screens.movieId')
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
            
                let fetchPurchases = "SELECT billing_id, amount, tax, email, movie_id, show_time, show_date, quantity,screen_number, status FROM `billing` WHERE `hall_id` = '" + moviehall._id + "'";

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
                        result.value = results;
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
    } else if(msg.userType == "ADMIN") {
        console.log("admin")
        let fetchPurchases = "SELECT billing_id, amount, tax, email, movie_id, show_time, show_date, quantity,screen_number,status FROM `billing` ";

        mysql_pool.fetchData(function(err, results) {
            if (err) {
                result.code  = 500;
                result.value = { message: "There is some issue in server. Please try again later." };
                return callback(null, result);
            }

            let movieids = [];
            results.map((item)=>{
                movieids.push(mongoose.Types.ObjectId(item.movie_id))
            });
            console.log("movieids",movieids);
            Movie.find({_id : { $in : movieids }})
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
                result.value = results;
                return callback(null, result);                
            })
            .catch((error) => {
                console.log("###5", error);
                result.code  = 500;
                result.value = { message: "There is some issue in server. Please try again later." };
                return callback(null, result);
            })
        }, fetchPurchases);
    } else {
        console.log("normal")
        let fetchPurchases = "SELECT billing_id, amount, tax, email, movie_id, show_time, show_date, quantity, status,screen_number FROM `billing` WHERE `email` = '" + msg.email + "'";

        mysql_pool.fetchData(function(err, results) {
            if (err) {
                result.code  = 500;
                result.value = { message: "There is some issue in server. Please try again later." };
                return callback(null, result);
            }

            let movieids = [];
            results.map((item)=>{
                movieids.push(mongoose.Types.ObjectId(item.movie_id))
            });
            console.log("movieids",movieids);
            Movie.find({_id : { $in : movieids }})
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
                result.value = results;
                return callback(null, result);                
            })
            .catch((error) => {
                console.log("###8", error);
                result.code  = 500;
                result.value = { message: "There is some issue in server. Please try again later." };
                return callback(null, result);
            })
        }, fetchPurchases);
    }
}

exports.handle_request = handle_request;