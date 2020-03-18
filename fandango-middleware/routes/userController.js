// User Controller - Handles Registration, Login, Logout
const {getExtraForAnalytics} =require( "../resources/middleware/helper");
const        express                = require('express');
const       passport                = require('passport');
require('../resources/middleware/passport');
const       router                  = express.Router();
const          _                    = require('lodash');
const        kafka                  = require('../resources/kafka/client');
const { authenticationMiddleware }  = require('../resources/middleware/session-authenticator');
const { uploadProfileImage }        = require('../resources/middleware/file.storage');

// Response Structure
// Backend Errors
// 400 - Email already registered! -> Frontend -> response.data.message = "Email already registered!"
// Success
// response: {
//      data: {
//              message: "STRING"
//      }
//  }

// REGISTRATION - POST: '/register'
router.post('/register', function(req,res) {

    let registrationInfo = _.pick(req.body, ['email', 'password']);
    _.assign(registrationInfo, { "extras"  : getExtraForAnalytics(req) });

    kafka.make_request('user_register_topic', registrationInfo, function(err,results) {
        if (err) {
            // Kafka Error - 500
            return res.status(500).send(responseJSON("SERVER_someError"));
        }
        return res.status(results.code).send(results.value);
    });
});

// Response Structure
/*
response: {
    data: {
        "user": {
            "email"    : "relansaket@gmail.com",
            "firstname": null,
            "lastname" : null,
            "phone"    : null,
            "address"  : null,
            "city"     : null,
            "state"    : null,
            "zip"      : null,
            "type"     : null
        }
    }
}
*/
// Login - POST: '/login'
router.post('/login', function (req, res) {

    passport.authenticate('login', function (err, results) {
        if (err) {
            switch (err.name) {
                case 401:
                    return res.status(401).send(err.message);   // Invalid password
                case 404:
                    return res.status(404).send(err.message);   // User doesn't exist
                default:
                    return res.status(500).send(responseJSON("SERVER_someError"));
            }
        }
        req.login(results.user, function (err) {
            if(err) {
                console.log(err);
            }
            req.session.user = results.user.email;
            req.session.userType = results.user.type;
        });
        res.status(200).send(results);
    })(req, res);
});

// Response Structure
// Backend Errors
// Success
// response: {
//      data: {
//              message: "Account deleted successfully."
//      }
//  }

// DELETE - POST: '/delete'
router.post('/delete', authenticationMiddleware(), function(req,res) {

    let email = req.session.user;

    kafka.make_request('user_delete_topic', { email : email,extras:getExtraForAnalytics(req) }, function(err,results) {
        if (err) {
            // Kafka Error - 500
            return res.status(500).send(responseJSON("SERVER_someError"));
        }
        if (results.code == 200) {
            req.logout();
            req.session.destroy();
        }

        return res.status(results.code).send(results.value);
    });
});


// DELETE ADMIN Flow- POST: '/adminDelete'
router.post('/adminDelete', authenticationMiddleware(), function(req,res) {

    let email = req.body.email;

    kafka.make_request('user_delete_topic', { email : email,extras:getExtraForAnalytics(req) }, function(err,results) {
        if (err) {
            // Kafka Error - 500
            return res.status(500).send(responseJSON("SERVER_someError"));
        }

        return res.status(results.code).send(results.value);
    });
});

// Response Structure
/*
response: {
    data: {
        "user": {
            "email"    : "relansaket@gmail.com",
            "firstname": null,
            "lastname" : null,
            "phone"    : null,
            "address"  : null,
            "city"     : null,
            "state"    : null,
            "zip"      : null,
            "type"     : null
        }
    }
}
*/
// Get user info - POST: '/authenticateUser'
router.post('/authenticateUser', authenticationMiddleware(), function(req,res) {

    let email = req.session.user;

    kafka.make_request('user_authenticate_topic', { email: email }, function(err,results){
        if(err){
            return res.status(500).send(responseJSON("SERVER_someError"));
        }
        return res.status(results.code).send(results.value);
    });
});

// Response Structure
/*
response: {
    data: {
        "message": "User Basic Information Updated!"
    }
}
*/
// Update user info - POST: '/updateInfo'
router.post('/updateInfo', authenticationMiddleware(), function(req,res) {

    console.log("/updateInfo body: ",req.body);
    let basicInfo = _.pick(req.body, ['firstname', 'lastname', 'phone']);
    _.assign(basicInfo, { "email"  : req.session.user });
    _.assign(basicInfo, { "extras"  : getExtraForAnalytics(req) });

    console.log("/updateInfo basicInfo: ",basicInfo);
    kafka.make_request('user_update_basic_info_topic', basicInfo, function(err,results){
        if(err){
            return res.status(500).send(responseJSON("SERVER_someError"));
        }
        return res.status(results.code).send(results.value);
    });
});

// Response Structure
/*
response: {
    data: {
        "message": "User Address Updated!"
    }
}
*/
// Update user address - POST: '/updateAddress'
router.post('/updateAddress', authenticationMiddleware(), function(req,res) {

    let addressInfo = _.pick(req.body, ['address', 'city', 'state', 'zip']);
    _.assign(addressInfo, { "email"  : req.session.user });
    _.assign(addressInfo, { "extras"  : getExtraForAnalytics(req) });

    kafka.make_request('user_update_address_topic', addressInfo, function(err,results){
        if(err){
            return res.status(500).send(responseJSON("SERVER_someError"));
        }
        return res.status(results.code).send(results.value);
    });
});

// Response Structure
/*
response: {
    data: {
        "message": "User Card Details Updated!"
    }
}
*/
// Update user card - POST: '/updateCard'
router.post('/updateCard', authenticationMiddleware(), function(req,res) {

    let paymentInfo = _.pick(req.body, ['cardnumber', 'cardmonth', 'cardyear', 'cardzip']);
    _.assign(paymentInfo, { "email"  : req.session.user });
    _.assign(paymentInfo, { "extras"  : getExtraForAnalytics(req) });

    kafka.make_request('user_update_payment_topic', paymentInfo, function(err,results){
        if(err){
            return res.status(500).send(responseJSON("SERVER_someError"));
        }
        return res.status(results.code).send(results.value);
    });
});

// Response Structure
/*
response: {
    data: [
            {
                "_id": "5add11d936a45c8952e0436a",
                "title": "Black Panther",
                "genre": "Action,Adventure",
                "characters": "Chadwick Boseman,Michael B. Jordan,Lupita Nyong'o,Danai Gurira",
                "duration": "2 hr 14 min",
                "ratingType": "PG-13",
                "rating": 3
            }
        ]
}
*/
// Search by Movie Name - GET - '/searchMovie?movieName=<movieName>'
router.get('/searchMovie', authenticationMiddleware(), function(req,res) {

    let fetchMovieDetails = _.pick(req.query, ['movieName']);
    _.assign(fetchMovieDetails,{extras:getExtraForAnalytics(req)})

    kafka.make_request('search_movie_topic', fetchMovieDetails, function(err,results){
        if(err){
            return res.status(500).send(responseJSON("SERVER_someError"));
        }
        return res.status(results.code).send(results.value);
    });

});

// Response Structure
/*
response: {
    data: [
            {
                "_id": "5add22f336a45cbd55fd51f2",
                "name": "Town 3 Cinema",
                "address": "1330 The Alameda",
                "phone": "456765456",
                "screenCount": 2
            }
        ]
}
*/
// Search by Movie Hall - GET - '/searchHall?hallName=<hallName>'
router.get('/searchHall', authenticationMiddleware(), function(req,res) {

    let fetchHallDetails = _.pick(req.query, ['hallName']);
    _.assign(fetchHallDetails,{extras:getExtraForAnalytics(req)})

    kafka.make_request('search_hall_topic', fetchHallDetails, function(err,results){
        if(err){
            return res.status(500).send(responseJSON("SERVER_someError"));
        }
        return res.status(results.code).send(results.value);
    });

});


// Response Structure
/*
response: {
    data: [
            {
                "message": "Movie booked successfully"
            }
        ]
}
*/
// Book a movie - POST - '/bookmovie'
router.post('/bookmovie', authenticationMiddleware(), function(req,res) {

    let bookMovieInfo = _.pick(req.body, ['movie_id', 'hall_id', 'city', 'show_time', 'show_date', 'quantity', 'amount', 'tax', 'screenNumber', 'totalSeats']);
    _.assign(bookMovieInfo, { "email"  : req.session.user });
    _.assign(bookMovieInfo, { "extras"  : getExtraForAnalytics(req) });

    kafka.make_request('book_movie_topic', bookMovieInfo, function(err,results){
        if(err){
            return res.status(500).send(responseJSON("SERVER_someError"));
        }
        return res.status(results.code).send(results.value);
    });

});

// Post a review - POST - '/saveReview'
router.post('/saveReview', authenticationMiddleware(), function(req,res) {

    let saveReview = _.pick(req.body, ['movie_id', 'email', 'name', 'rating', 'title', 'comment']);
    _.assign(saveReview,{extras:getExtraForAnalytics(req)})
    kafka.make_request('user_post_review_topic', saveReview, function(err,results){
        if(err){
            return res.status(500).send(responseJSON("SERVER_someError"));
        }
        return res.status(results.code).send(results.value);
    });

});

// Fetch movie checkout-booking details - POST - '/checkoutDetails'
router.post('/checkoutDetails', authenticationMiddleware(), function(req,res) {

    let checkoutDetails = _.pick(req.body, ['movie_id', 'hall_id', 'screenNumber', 'showDate', 'showTime']);
    _.assign(checkoutDetails,{extras:getExtraForAnalytics(req)})

    kafka.make_request('user_checkout_details_topic', checkoutDetails, function(err,results){
        if(err){
            return res.status(500).send(responseJSON("SERVER_someError"));
        }
        return res.status(results.code).send(results.value);
    });

});

// Response Structure
/*
response: {
    data: [
            {
                "billing_id": 20,
                "amount": 40.19,
                "tax": 6.69,
                "email": "relansaket@gmail.com",
                "movie_id": "5add11d936a45c8952e0436a",
                "hall_id": "5add22f336a45cbd55fd51f2",
                "show_time": "22:00",
                "show_date": "2018-04-29T07:00:00.000Z",
                "quantity": 2,
                "transaction_date": "2018-04-22T07:00:00.000Z",
                "status": "BOOKED",
                "city": "San Jose"
            }
        ]
}
*/
// Fetch movie past purchases - GET - '/purchases'
router.get('/purchases', authenticationMiddleware(), function(req,res) {

    let fetchUserPurchases = { email: req.session.user };
    _.assign(fetchUserPurchases,{"extras":getExtraForAnalytics(req)})

    kafka.make_request('user_billing_topic', fetchUserPurchases, function(err,results){
        if(err){
            return res.status(500).send(responseJSON("SERVER_someError"));
        }
        return res.status(results.code).send(results.value);
    });

});

// Response Structure
/*
response: {
    "result": "Image uploaded successfully!!!"
}
*/
// Profile image update request
router.post('/saveProfileImage', authenticationMiddleware(), uploadProfileImage.any(), function(req, res, next) {

    return res.status(200).send({ result : "Image uploaded successfully!!!"});
});

// LOGOUT - POST: '/logout'
router.post('/logout', authenticationMiddleware(), function (req, res) {
    req.logout();
    req.session.destroy();
    return res.status(200).send(responseJSON("LOGOUT_success"));
});

// method to serialize user for storage
passport.serializeUser(function(data, done) {
    console.log("serialize");
    // console.log(data);
    done(null, data);
});

// method to de-serialize back for auth
passport.deserializeUser(function(data, done) {
    console.log("deserialize")
    // console.log(data)
    done(null, data);
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

router.get('/getOtherUser/:email', authenticationMiddleware(), function(req,res) {

    let email = req.params.email;

    kafka.make_request('get_other_user_topic', { email: email ,extras:getExtraForAnalytics(req)}, function(err,results){
        if(err){
            return res.status(500).send(responseJSON("SERVER_someError"));
        }
        return res.status(results.code).send(results.value);
    });
});

module.exports = router;