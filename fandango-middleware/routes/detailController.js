// Detail Controller - fetch movie/ hall details
const   express                    = require       ('express'                                      );
const   router                     = express.Router(                                               );
const   _                          = require       ('lodash'                                       );
const   kafka                      = require       ('../resources/kafka/client'                    );
const { authenticationMiddleware } = require       ('../resources/middleware/session-authenticator');
const { getExtraForAnalytics    }  = require       ('../resources/middleware/helper'               );

// Response Structure
// Success
/*
response: {
    data: {
        "title": "Black Panther",
        "genre": "Action,Adventure",
        "characters": "Chadwick Boseman,Michael B. Jordan,Lupita Nyong'o,Danai Gurira",
        "duration": "2 hr 14 min",
        "ratingType": "PG-13",
        "trailerLink": "",
        "reviews": [
            {
                "email": "flash@dc.com",
                "name": "Flash",
                "rating": 1,
                "title": "Meh!",
                "comment": "Check out Batman vs Superman \\m/"
            },
            {
                "email": "tony@marvel.com",
                "name": "Tony Stark",
                "rating": 5,
                "title": "Black Panther \\m/",
                "comment": "Flash stfu!"
            }
        ],
        "_id": "5add11d936a45c8952e0436a"
    }
}
*/
// Fetch Movie by id - POST '/details/fetchMovie'
router.post('/fetchMovie', authenticationMiddleware(), function(req,res) {

    let movieInfo = _.pick(req.body, ['movie_id']);
    _.assign(movieInfo, {extras:getExtraForAnalytics(req)});

    kafka.make_request('get_movie_details_topic', movieInfo, function(err,results) {
        if (err) {
            // Kafka Error - 500
            return res.status(500).send(responseJSON("SERVER_someError"));
        }
        console.log(results.value);
        return res.status(results.code).send(results.value);
    });
});


// Response Structure
// Success
/*
response: {
    data: {

    }
}
*/
// Fetch Halls by Movie - POST '/details/fetchMovieHalls'
router.post('/fetchMovieHalls', authenticationMiddleware(), function(req,res) {

    let movieInfo = _.pick(req.body, ['movie_id']);

    kafka.make_request('halls_by_movie_topic', movieInfo, function(err,results) {
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
        "name": "Town 3 Cinema",
        "address": "1330 The Alameda",
        "screens": [
            {
                "showTimings": [
                    "10:30",
                    "13:00",
                    "18:00",
                    "21:00"
                ],
                "ticketPrice": 100,
                "totalSeats": 100,
                "screenNumber": 1
            },
            {
                "showTimings": [
                    "18:00",
                    "21:00"
                ],
                "ticketPrice": 100,
                "totalSeats": 50,
                "screenNumber": 2
            }
        ],
        "_id": "5add22f336a45cbd55fd51f2",
        "ownerEmail": "amey.nawale12@gmail.com",
        "phone": "456765456"
    }
}
*/
// Fetch Hall by id - POST - '/details/fetchHall'
router.post('/fetchHall', authenticationMiddleware(), function(req,res) {

    let hallInfo = _.pick(req.body, ['hall_id']);

    kafka.make_request('get_hall_details_topic', hallInfo, function(err,results) {
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