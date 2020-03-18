// User Controller - Handles Registration, Login, Logout
const        express                = require('express');
const       passport                = require('passport');
require('../resources/middleware/passport');
const       router                  = express.Router();
const          _                    = require('lodash');
const        kafka                  = require('../resources/kafka/client');
const { authenticationMiddleware }  = require('../resources/middleware/session-authenticator');
const {uploadImage}                 = require('../resources/middleware/file.storage');
const {getExtraForAnalytics}                 = require('../resources/middleware/helper');


//get top_ten_movies
router.get('/top_ten_movies', function(req,res) {

    kafka.make_request('dashboard_highcharts', {chartName:"top_ten_movies"}, function(err,results) {
        if (err) {
            // Kafka Error - 500
            return res.status(500).send(responseJSON("SERVER_someError"));
        }
        return res.status(results.code).send(results.value);
    });
});



//get top_ten_city
router.get('/top_ten_city', function(req,res) {

    kafka.make_request('dashboard_highcharts', {chartName:"top_ten_city"}, function(err,results) {
        if (err) {
            // Kafka Error - 500
            return res.status(500).send(responseJSON("SERVER_someError"));
        }
        return res.status(results.code).send(results.value);
    });
});





//get top_ten_hall
router.get('/top_ten_hall', function(req,res) {

    kafka.make_request('dashboard_highcharts', {chartName:"top_ten_hall"}, function(err,results) {
        if (err) {
            // Kafka Error - 500
            return res.status(500).send(responseJSON("SERVER_someError"));
        }
        return res.status(results.code).send(results.value);
    });
});



//get top_ten_pages

router.get('/top_ten_pages', function(req,res) {

    kafka.make_request('dashboard_highcharts', {chartName:"top_ten_pages"}, function(err,results) {
        if (err) {
            // Kafka Error - 500
            return res.status(500).send(responseJSON("SERVER_someError"));
        }
        return res.status(results.code).send(results.value);
    });
});


//get movies_clicks
router.get('/movies_clicks', function(req,res) {

    kafka.make_request('dashboard_highcharts', {chartName:"movies_clicks"}, function(err,results) {
        if (err) {
            // Kafka Error - 500
            return res.status(500).send(responseJSON("SERVER_someError"));
        }
        return res.status(results.code).send(results.value);
    });
});


//get less_seen_Area

router.get('/less_seen_Area', function(req,res) {

    kafka.make_request('dashboard_highcharts', {chartName:"less_seen_Area"}, function(err,results) {
        if (err) {
            // Kafka Error - 500
            return res.status(500).send(responseJSON("SERVER_someError"));
        }
        return res.status(results.code).send(results.value);
    });
});

//get reviews_on_movies


router.get('/reviews_on_movies', function(req,res) {

    kafka.make_request('dashboard_highcharts', {chartName:"reviews_on_movies"}, function(err,results) {
        if (err) {
            // Kafka Error - 500
            return res.status(500).send(responseJSON("SERVER_someError"));
        }
        return res.status(results.code).send(results.value);
    });
});

//get trace_user


router.get('/trace_user', function(req,res) {

    kafka.make_request('dashboard_highcharts', {chartName:"trace_user",email:req.query.email}, function(err,results) {
        if (err) {
            // Kafka Error - 500
            return res.status(500).send(responseJSON("SERVER_someError"));
        }
        return res.status(results.code).send(results.value);
    });
});


function responseJSON(responseType) {
    switch (responseType) {
        case "INVALID_session":
            return { message: 'Invalid Session. Please login again!' };
        case "SERVER_someError":
            return { message: 'There is some issue in server. Please try again later.' };
        default:
            return { message: 'Some error with database connection.' };
    }
}

module.exports = router;