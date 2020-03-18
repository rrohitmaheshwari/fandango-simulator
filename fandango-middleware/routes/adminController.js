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
// Response Structure
// Backend Errors
// 400 - Email already registered! -> Frontend -> response.data.message = "Email already registered!"
// Success
// response: {
//      data: {
//              message: "STRING"
//      }
//  }

//add movie
router.post('/movies', uploadImage.single('image'),function(req,res) {

    // let registrationInfo = _.pick(req.body, ['email', 'password']);

    kafka.make_request('admin_add_movie_topic', {body:req.body,file:req.file,user:req.user,params:req.params,extras:getExtraForAnalytics(req)}, function(err,results) {
        if (err) {
            // Kafka Error - 500
            return res.status(500).send(responseJSON("SERVER_someError"));
        }
        return res.status(results.code).send(results.value);
    });
});

//add halls
router.post('/halls', uploadImage.single('image'),function(req,res) {

    console.log(req.file);

    kafka.make_request('admin_add_hall_topic', {body:req.body,file:req.file,user:req.user,params:req.params,extras:getExtraForAnalytics(req)}, function(err,results) {
        if (err) {
            // Kafka Error - 500
            return res.status(500).send(responseJSON("SERVER_someError"));
        }
        return res.status(results.code).send(results.value);
    });
});

//edit hall
router.put('/halls/:hallId', uploadImage.single('image'),function(req,res) {


    kafka.make_request('admin_update_hall_topic', {body:req.body,file:req.file,user:req.user,params:req.params,extras:getExtraForAnalytics(req)}, function(err,results) {
        if (err) {
            // Kafka Error - 500
            return res.status(500).send(responseJSON("SERVER_someError"));
        }
        return res.status(results.code).send(results.value);
    });
});


//get all halls
router.get('/halls', function(req,res) {

    kafka.make_request('admin_search_hall_movie_topic', {body:req.body,file:req.file,user:req.user,params:req.params,extras:getExtraForAnalytics(req)}, function(err,results) {
        if (err) {
            // Kafka Error - 500
            return res.status(500).send(responseJSON("SERVER_someError"));
        }
        return res.status(results.code).send(results.value);
    });
});


//get movies
router.get('/movies',function(req,res) {

    // let registrationInfo = _.pick(req.body, ['email', 'password']);
    // console.log(req);
    kafka.make_request('admin_search_movie_topic', {body:req.body,file:req.file,user:req.user,params:req.params,extras:getExtraForAnalytics(req)}, function(err,results) {
        if (err) {
            // Kafka Error - 500
            return res.status(500).send(responseJSON("SERVER_someError"));
        }
        return res.status(results.code).send(results.value);
    });
});

//edit movie
router.put('/movies/:movieId', uploadImage.single('image'),function(req,res) {

    kafka.make_request('admin_update_movie_topic', {body:req.body,params:req.params,file:req.file,extras:getExtraForAnalytics(req)}, function(err,results) {
        if (err) {
            // Kafka Error - 500
            return res.status(500).send(responseJSON("SERVER_someError"));
        }
        return res.status(results.code).send(results.value);
    });
});

router.get('/movies/:movieId', function(req,res) {

    kafka.make_request('admin_get_movie_topic', {body:req.body,params:req.params,extras:getExtraForAnalytics(req)}, function(err,results) {
        if (err) {
            // Kafka Error - 500
            return res.status(500).send(responseJSON("SERVER_someError"));
        }
        return res.status(results.code).send(results.value);
    });
});

//get users
router.get('/users', function(req,res) {

    // let registrationInfo = _.pick(req.body, ['email', 'password']);
    // console.log(req);
    kafka.make_request('admin_search_user_topic', {body:req.body,file:req.file,user:req.user,params:req.params,extras:getExtraForAnalytics(req)}, function(err,results) {
        if (err) {
            // Kafka Error - 500
            return res.status(500).send(responseJSON("SERVER_someError"));
        }
        return res.status(results.code).send(results.value);
    });
});

//get revenue
router.get('/revenue', function(req,res) {

    // let registrationInfo = _.pick(req.body, ['email', 'password']);
    // console.log(req);
    kafka.make_request('admin_fetch_movie_revenue_topic', {body:req.body,file:req.file,user:req.user,params:req.params,extras:getExtraForAnalytics(req)}, function(err,results) {
        if (err) {
            // Kafka Error - 500
            return res.status(500).send(responseJSON("SERVER_someError"));
        }
        return res.status(results.code).send(results.value);
    });
});

//edit user
router.put('/users/:userId', uploadImage.single('image'),function(req,res) {

    // let registrationInfo = _.pick(req.body, ['email', 'password']);
    // console.log(req);
    kafka.make_request('admin_update_user_topic', {body:req.body,file:req.file,user:req.user,params:req.params,extras:getExtraForAnalytics(req)}, function(err,results) {
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
        case "LOGOUT_success":
            return { message: 'Logout successful.' };
        case "IMG_not_found":
            return { message: 'Profile image not found.' };
        case "IMAGE_successMsg":
            return { message: 'Profile images uploaded.' };
        default:
            return { message: 'Some error with database connection.' };
    }
}

module.exports = router;