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

//edit hall info
router.put('/', uploadImage.single('image'),function(req,res) {

    kafka.make_request('hall_update_topic', {body:req.body,file:req.file,user:req.user,params:req.params,extras:getExtraForAnalytics(req)}, function(err,results) {
        if (err) {
            // Kafka Error - 500
            return res.status(500).send(responseJSON("SERVER_someError"));
        }
        return res.status(results.code).send(results.value);
    });
});


//get hall info
router.get('/', function(req,res) {

    kafka.make_request('hall_get_data_topic', {body:req.body,file:req.file,user:req.user,params:req.params,extras:getExtraForAnalytics(req)}, function(err,results) {
        if (err) {
            // Kafka Error - 500
            return res.status(500).send(responseJSON("SERVER_someError"));
        }
        return res.status(results.code).send(results.value);
    });
});

//get bookings info
router.get('/fetchBookings', function(req,res) {

    kafka.make_request('admin_view_purchase_topic', { "email"  : req.session.user, "userType"  : req.session.userType,extras:getExtraForAnalytics(req)}, function(err,results) {
        console.log("###results", results);
        if (err) {
            // Kafka Error - 500
            return res.status(500).send(responseJSON("SERVER_someError"));
        }
        return res.status(results.code).send(results.value);
    });
});

//Cancel user booking
router.post('/cancelBooking', function(req,res) {

    let bookingInfo= _.pick(req.body, ['billing_id']);
    _.assign(bookingInfo, { "email"  : req.session.user });
    
    kafka.make_request('hall_cancel_booking_topic', bookingInfo, function(err,results) {
        if (err) {
            // Kafka Error - 500
            return res.status(500).send(responseJSON("SERVER_someError"));
        }
        return res.status(results.code).send(results.value);
    });
});

//get hall info
router.get('/revenue', function(req,res) {

    kafka.make_request('hall_fetch_movie_revenue_topic', {body:req.body,file:req.file,user:req.user,params:req.params,extras:getExtraForAnalytics(req)}, function(err,results) {
        if (err) {
            // Kafka Error - 500
            return res.status(500).send(responseJSON("SERVER_someError"));
        }
        return res.status(results.code).send(results.value);
    });
});

// router.post('/movies', function(req,res) {
//
//     // let registrationInfo = _.pick(req.body, ['email', 'password']);
//
//     kafka.make_request('admin_add_movie_topic', {body:req.body}, function(err,results) {
//         if (err) {
//             // Kafka Error - 500
//             return res.status(500).send(responseJSON("SERVER_someError"));
//         }
//         return res.status(results.code).send(results.value);
//     });
// });
//
// router.post('/halls', function(req,res) {
//
//
//     kafka.make_request('admin_add_hall_topic', {body:req.body}, function(err,results) {
//         if (err) {
//             // Kafka Error - 500
//             return res.status(500).send(responseJSON("SERVER_someError"));
//         }
//         return res.status(results.code).send(results.value);
//     });
// });
//
// router.put('/halls/:hallId', function(req,res) {
//
//
//     kafka.make_request('admin_update_hall_topic', {body:req.body,params:req.params}, function(err,results) {
//         if (err) {
//             // Kafka Error - 500
//             return res.status(500).send(responseJSON("SERVER_someError"));
//         }
//         return res.status(results.code).send(results.value);
//     });
// });
//
// router.get('/halls', function(req,res) {
//
//     kafka.make_request('admin_search_hall_movie_topic', {body:req.body}, function(err,results) {
//         if (err) {
//             // Kafka Error - 500
//             return res.status(500).send(responseJSON("SERVER_someError"));
//         }
//         return res.status(results.code).send(results.value);
//     });
// });
//
//
// router.get('/movies', function(req,res) {
//
//     // let registrationInfo = _.pick(req.body, ['email', 'password']);
//
//     kafka.make_request('admin_search_movie_topic', {body:req.body}, function(err,results) {
//         if (err) {
//             // Kafka Error - 500
//             return res.status(500).send(responseJSON("SERVER_someError"));
//         }
//         return res.status(results.code).send(results.value);
//     });
// });


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