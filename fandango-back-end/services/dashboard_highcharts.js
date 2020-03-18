const mysql_pool = require('../database/mysql/mysql-pool');
var Movie = require('../database/mongo/model/movie');
var MovieHall = require('../database/mongo/model/movie_hall');
var Analytics = require('../database/mongo/model/analytics');
const mongoose = require("mongoose");
const moment = require("moment");


function top_ten_movies(msg, callback) {

    let result = {};


    let fetchPurchases = "SELECT movie_id,sum(amount) as y FROM billing where status=\"BOOKED\" group by(movie_id) ORDER BY y desc limit 10;";

    mysql_pool.fetchData(function (err, results) {
        if (err) {
            result.code = 500;
            result.value = {message: "There is some issue in server. Please try again later."};
            return callback(null, result);
        }

        let movieids = [];
        results.map((item) => {
            movieids.push(mongoose.Types.ObjectId(item.movie_id))
        });
        console.log("movieids", movieids);
        Movie.find({_id: {$in: movieids}})
            .then((movies) => {
                let hash = {};
                movies.map((item) => {
                    hash[item._id] = item.title;
                })
                results.map((item) => {
                    item.name = hash[item.movie_id];
                })
                console.log(results)
                result.code = 200;
                result.value = results;
                return callback(null, result);
            })
            .catch((error) => {
                console.log("###8", error);
                result.code = 500;
                result.value = {message: "There is some issue in server. Please try again later."};
                return callback(null, result);
            })
    }, fetchPurchases);

}

exports.top_ten_movies = top_ten_movies;


function top_ten_city(msg, callback) {

    let result = {};


    let fetchRevenue1 = "SELECT city as name,sum(amount) as year_2016 FROM billing where status=\"BOOKED\" AND EXTRACT(YEAR FROM transaction_date)= '2016' group by city limit 10;";

    mysql_pool.fetchData(function (err, results1) {
        if (err) {
            result.code = 500;
            result.value = {message: "There is some issue in server. Please try again later."};
            return callback(null, result);
        }


        let fetchRevenue2 = "SELECT city as name,sum(amount) as year_2017  FROM billing where status=\"BOOKED\" AND EXTRACT(YEAR FROM transaction_date)= '2017' group by city limit 10;";

        mysql_pool.fetchData(function (err, results2) {
            if (err) {
                result.code = 500;
                result.value = {message: "There is some issue in server. Please try again later."};
                return callback(null, result);
            }


            let fetchRevenue3 = "SELECT city as name,sum(amount) as year_2018  FROM billing where status=\"BOOKED\" AND EXTRACT(YEAR FROM transaction_date)= '2018' group by city limit 10;";

            mysql_pool.fetchData(function (err, results3) {
                if (err) {
                    result.code = 500;
                    result.value = {message: "There is some issue in server. Please try again later."};
                    return callback(null, result);
                }

                let city = [];

                var names = new Set();

                results1.map((d) => {
                    names.add(d.name);
                })
                results2.map((d) => {
                    names.add(d.name);
                })
                results3.map((d) => {
                    names.add(d.name);
                })

                console.log("names-");


                let tempname = [];
                let temp1 = [];
                let temp2 = [];
                let temp3 = [];

                for (var it = names.values(), val = null; val = it.next().value;) {
                    console.log(val);

                    tempname.push(val);
                    let f1 = true;
                    results1.map((d) => {
                        if (d.name === val) {
                            f1 = false;
                            temp1.push(d.year_2016)

                        }

                    })
                    if (f1) {
                        temp1.push(0)
                    }


                    let f2 = true;
                    results2.map((d) => {
                        if (d.name === val) {
                            f2 = false;
                            temp2.push(d.year_2017)

                        }

                    })
                    if (f2) {
                        temp2.push(0)
                    }


                    let f3 = true;
                    results3.map((d) => {
                        if (d.name === val) {
                            f3 = false;
                            temp3.push(d.year_2018)

                        }

                    })
                    if (f3) {
                        temp3.push(0)
                    }


                }
                city.push(tempname);
                city.push(temp1);
                city.push(temp2);
                city.push(temp3);


                console.log(city)
                result.code = 200;
                result.value = city;
                return callback(null, result);

            }, fetchRevenue3);


        }, fetchRevenue2);


    }, fetchRevenue1);

}

exports.top_ten_city = top_ten_city;


function top_ten_hall(msg, callback) {

    let result = {};


    let fetchPurchases = "SELECT hall_id,sum(quantity) as ticket_count,sum(amount) as revenue FROM billing where status=\"BOOKED\" group by hall_id order by ticket_count desc limit 10;";

    mysql_pool.fetchData(function (err, results) {
        if (err) {
            result.code = 500;
            result.value = {message: "There is some issue in server. Please try again later."};
            return callback(null, result);
        }

        let moviehallids = [];
        results.map((item) => {
            moviehallids.push(mongoose.Types.ObjectId(item.hall_id))
        });
        console.log("moviehallids", moviehallids);
        MovieHall.find({_id: {$in: moviehallids}})
            .then((halls) => {
                let hash = {};
                halls.map((item) => {
                    hash[item._id] = item.name;
                })
                results.map((item) => {
                    item.name = hash[item.hall_id];
                })
                console.log(results)
                result.code = 200;
                result.value = results;
                return callback(null, result);
            })
            .catch((error) => {
                console.log("###8", error);
                result.code = 500;
                result.value = {message: "There is some issue in server. Please try again later."};
                return callback(null, result);
            })
    }, fetchPurchases);

}

exports.top_ten_hall = top_ten_hall;


function top_ten_pages(msg, callback) {

    let result = {};

    var pipeline = [
        {
            "$group": {
                "_id": {
                    "page": "$page"
                },
                "y": {
                    "$sum": 1.0
                }
            }
        },
        {
            "$sort": {
                "y": -1.0
            }
        }
        ,
        {
            "$limit": 10

        }
    ];

    var promise = Analytics.aggregate(pipeline).exec();

    promise.then(function (data) {
        console.log(" data-");
        console.log(data);
        result.value = data;

        data.map((item) => {
            item.name = item._id.page;
        });

        if (data) {
            result.code = 200;
            return callback(null, result);
        }
    }).catch(function (err) {
        // just need one of these
        console.log('error:', err.message);
        result.code = '400';
        return callback(err, result);
    });

}

exports.top_ten_pages = top_ten_pages;


function movies_clicks(msg, callback) {

    let result = {};

    var pipeline = [
        {
            "$match": {
                "page": "\/movie-detail"
            }
        },
        {
            "$group": {
                "_id": {
                    "movie": "$movieName"
                },
                "y": {
                    "$sum": 1.0
                }
            }
        },
        {
            "$sort": {
                "y": -1.0
            }
        }
        ,
        {
            "$limit": 10

        }
    ];

    var promise = Analytics.aggregate(pipeline).exec();

    promise.then(function (data) {
        console.log(" data-");
        console.log(data);
        result.value = data;

        data.map((item) => {
            item.name = item._id.movie;
        });

        if (data) {
            result.code = 200;
            return callback(null, result);
        }
    }).catch(function (err) {
        // just need one of these
        console.log('error:', err.message);
        result.code = '400';
        return callback(err, result);
    });

}

exports.movies_clicks = movies_clicks;


function less_seen_Area(msg, callback) {

    let result = {};

    var pipeline = [
        {
            "$group": {
                "_id": {
                    "page": "$page"
                },
                "y": {
                    "$sum": 1.0
                }
            }
        },
        {
            "$sort": {
                "y": 1.0
            }
        }
        ,
        {
            "$limit": 5

        }
    ];

    var promise = Analytics.aggregate(pipeline).exec();

    promise.then(function (data) {
        console.log(" data-");
        console.log(data);
        result.value = data;

        data.map((item) => {
            item.name = item._id.page;
        });

        if (data) {
            result.code = 200;
            return callback(null, result);
        }
    }).catch(function (err) {
        // just need one of these
        console.log('error:', err.message);
        result.code = '400';
        return callback(err, result);
    });

}

exports.less_seen_Area = less_seen_Area;


function reviews_on_movies(msg, callback) {

    let result = {};

    var pipeline = [
        {
            "$unwind": {
                "path": "$reviews",
                "preserveNullAndEmptyArrays": false
            }
        },
        {
            "$group": {
                "_id": {
                    "name": "$title"
                },
                "y": {
                    "$avg": "$reviews.rating"
                }
            }
        }
    ];

    var promise = Movie.aggregate(pipeline).exec();

    promise.then(function (data) {
        console.log(" data-");
        console.log(data);
        result.value = data;

        data.map((item) => {
            item.name = item._id.name;
        });

        if (data) {
            result.code = 200;
            return callback(null, result);
        }
    }).catch(function (err) {
        // just need one of these
        console.log('error:', err.message);
        result.code = '400';
        return callback(err, result);
    });

}

exports.reviews_on_movies = reviews_on_movies;


function trace_user(msg, callback) {

    let result = {};
    console.log(msg.email);

    var pipeline = [
        {
            "$match": {
                "userEmail": msg.email
            }
        },
        {
            "$sort": {
                "updatedAt": 1.0
            }
        },
        {
            "$project": {
                "page": 1.0,
                "updatedAt": 1.0,
                "action":1.0,
                "linkClicked":1.0,
            }
        }
    ];

    var promise = Analytics.aggregate(pipeline).exec();


    promise.then(function (data) {
        console.log(" data-");
        console.log(data);
        result.value = data;


        //----

        var tempset = new Set();


        let temp2 = [];
        let temp3 = [];

        var index = 0;
        data.map((d) => {
            tempset.add(d.page);
            // console.log(d.page);

            temp2[index] = moment(d.updatedAt).format("MMM-DD hh:mm a");
            temp3[index] = d.linkClicked;
            index++;
        })

        console.log("names-");

        let pages = [];


        for (var it = tempset.values(), val = null; val = it.next().value;) {


            pages.push(val);   //convert set to array


        }

        let temp1 = [];
        let index2 = 0;
        data.map((d) => {


            let cnt = 0;
            for (var it = tempset.values(), val = null; val = it.next().value;) {

                if (val === d.page) {
                    temp1[index2] = cnt;
                    index2++;
                    break;
                }

                cnt++;


                //convert set to array

            }

        })

        var combineresult=[];
        combineresult.push(pages);

        combineresult.push(temp1);

        combineresult.push(temp2);
        combineresult.push(temp3);


        //------


        if (data) {
            result.code = 200;
            result.value = combineresult;
            return callback(null, result);
        }
    }).catch(function (err) {
        // just need one of these
        console.log('error:', err.message);
        result.code = '400';
        return callback(err, result);
    });

}

exports.trace_user = trace_user;


