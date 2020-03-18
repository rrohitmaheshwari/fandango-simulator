const connection =  new require('./kafka/Connection');
const producer = connection.getProducer();

// Services
const user_register          = require('./services/user_register'        );
const user_login             = require('./services/user_login'           );
const user_deactivate        = require('./services/user_deactivate'      );
const user_authenticate      = require('./services/user_authenticate'    );
const user_update_basic_info = require('./services/user_basic_info'      );
const user_update_address    = require('./services/user_update_address'  );
const user_update_payment    = require('./services/user_update_payment'  );
const user_fetch_purchases   = require('./services/user_fetch_purchases' );
const book_movie             = require('./services/book_movie'           );
const search_movie_title     = require('./services/search_movie_title'   );
const search_hall_title      = require('./services/search_hall_title'    );
const movies                 = require('./services/movies'               );
const movie_details          = require('./services/getMovieDetails'      );
const hall_details           = require('./services/getHallDetails'       );
const movieHalls             = require('./services/moviehalls'           );
const adminViewPurchase      = require('./services/adminViewPurchase'    );
const users                  = require('./services/users'    );
const get_halls_by_movie     = require('./services/getHallsByMovie'      );
const cancelBooking          = require('./services/cancel_booking'       );
const get_other_user_details = require('./services/get_other_user_details'      );
const dashboard_highcharts = require('./services/dashboard_highcharts'      );
const revenues               = require('./services/revenues'       );
const user_checkout_details  = require('./services/user_checkout_details'      );
const user_post_review       = require('./services/user_post_review');

// var post_project        = require('./services/post-project');
// var updateAboutMe       = require('./services/updateAboutMe');
// var updateName          = require('./services/updateName');
// var updatePhone         = require('./services/updatePhone');
// var updateSummary       = require('./services/updateSummary');
// var updateSkills        = require('./services/updateSkills');
// var home_project        = require('./services/home_project');
// var dashboard_project   = require('./services/dashboard_project');
// var dashboard_bids      = require('./services/dashboard_bids');
// var project_details     = require('./services/project_details');
// var project_BidDetails  = require('./services/project_BidDetails');
// var post_bid            = require('./services/post-bid');
// var post_freelancer     = require('./services/post-freelancer');
// var relevant_projects   = require('./services/relevant_projects');
// var transaction         = require('./services/transaction');
// var transaction_details = require('./services/transaction_details');
// var submit_project      = require('./services/submit_project');


// Create Consumers - `module_action_topic` -> `user_register_topic`
const consumer_signup                 = connection.getConsumer('user_register_topic'           );
const consumer_login                  = connection.getConsumer('user_login_topic'              );
const consumer_delete                 = connection.getConsumer('user_delete_topic'             );
const consumer_user_authenticate      = connection.getConsumer('user_authenticate_topic'       );
const consumer_user_update_basic_info = connection.getConsumer('user_update_basic_info_topic'  );
const consumer_user_update_address    = connection.getConsumer('user_update_address_topic'     );
const consumer_user_update_payment    = connection.getConsumer('user_update_payment_topic'     );
const consumer_user_fetch_purchases   = connection.getConsumer('user_billing_topic'            );
const consumer_book_movie             = connection.getConsumer('book_movie_topic'              );
const consumer_search_movie           = connection.getConsumer('search_movie_topic'            );
const consumer_search_hall            = connection.getConsumer('search_hall_topic'             );
const consumer_admin_add_movie_topic  = connection.getConsumer('admin_add_movie_topic'         );
const consumer_get_movie_detail_topic = connection.getConsumer('get_movie_details_topic'       );
const consumer_get_hall_detail_topic  = connection.getConsumer('get_hall_details_topic'        );
const consumer_admin_search_movie     = connection.getConsumer('admin_search_movie_topic'      );
const consumer_admin_add_hall         = connection.getConsumer('admin_add_hall_topic'          );
const consumer_admin_search_hall      = connection.getConsumer('admin_search_hall_movie_topic' );
const consumer_admin_update_hall      = connection.getConsumer('admin_update_hall_topic'       );
const consumer_hall_update            = connection.getConsumer('hall_update_topic'             );
const consumer_hall_get_data          = connection.getConsumer('hall_get_data_topic'           );
const consumer_admin_update_movie     = connection.getConsumer('admin_update_movie_topic'      );
const consumer_admin_get_movie        = connection.getConsumer('admin_get_movie_topic'         );
const consumer_admin_view_purchase    = connection.getConsumer('admin_view_purchase_topic'     );
const consumer_admin_search_user      = connection.getConsumer('admin_search_user_topic'       );
const consumer_admin_update_user      = connection.getConsumer('admin_update_user_topic'       );
const consumer_get_halls_by_movie     = connection.getConsumer('halls_by_movie_topic'          );
const consumer_cancel_booking         = connection.getConsumer('hall_cancel_booking_topic'     );
const consumer_get_other_user     = connection.getConsumer('get_other_user_topic'     );
const consumer_dashboard_highcharts     = connection.getConsumer('dashboard_highcharts'     );
const consumer_hall_fetch_revenue     = connection.getConsumer('hall_fetch_movie_revenue_topic'     );
const consumer_admin_fetch_revenue     = connection.getConsumer('admin_fetch_movie_revenue_topic'     );
const consumer_user_checkout_details  = connection.getConsumer('user_checkout_details_topic'     );
const consumer_user_post_review  = connection.getConsumer('user_post_review_topic'     );

// var consumer_post_project       = connection.getConsumer('post-project_topic');
// var consumer_updateAboutMe      = connection.getConsumer('updateAboutMe_topic');
// var consumer_updateName         = connection.getConsumer('updateName_topic');
// var consumer_updatePhone        = connection.getConsumer('updatePhone_topic');
// var consumer_updateSummary      = connection.getConsumer('updateSummary_topic');
// var consumer_updateSkills       = connection.getConsumer('updateSkills_topic');
// var consumer_home_project       = connection.getConsumer('home_project_topic');
// var consumer_dashboard_project  = connection.getConsumer('dashboard_project_topic');
// var consumer_dashboard_bids     = connection.getConsumer('dashboard_project_bids');
// var consumer_project_details    = connection.getConsumer('project_details');
// var consumer_project_BidDetails = connection.getConsumer('project_BidDetails');
// var consumer_post_bid           = connection.getConsumer('post-bid_topic');
// var consumer_post_freelancer    = connection.getConsumer('post-freelancer_topic');
// var consumer_relevant_project   = connection.getConsumer('relevant_projects_topic');
// var consumer_transaction        = connection.getConsumer('post-transaction_topic');
// var consumer_transaction_detail = connection.getConsumer('transaction-details_topic');
// var consumer_submit_project     = connection.getConsumer('submit-project_topic');

// Check MongoDB - MLab connection
const mongoose = require('./database/mongo/mongoose');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Mlab Connection Successful!");
});


// User Consumers
consumer_signup.on('message', function (message) {
    console.log('user_register_topic message received');
    console.log(message.value);
    var data = JSON.parse(message.value);
    user_register.handle_request(data.data, function(err,res){
        console.log('after handle consumer_signup'+res);
        var payloads = [{
                topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer_login.on('message', function (message) {
    console.log("here");
    console.log('user_login_topic message received');
    console.log(message.value);
    var data = JSON.parse(message.value);
    user_login.handle_request(data.data, function(err,res){
        console.log('after handle user_login_topic');
        console.log(res);

        var payloads = [{
                topic:      data.replyTo,
                messages:   JSON.stringify({
                    correlationId : data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer_delete.on('message', function (message) {
    console.log('user_delete_topic message received');
    console.log(message.value);
    var data = JSON.parse(message.value);
    user_deactivate.handle_request(data.data, function(err,res){
        console.log('after handle user_delete_topic'+res);
        var payloads = [{
            topic:      data.replyTo,
            messages:   JSON.stringify({
                correlationId : data.correlationId,
                data : res
            }),
            partition : 0
        }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer_user_authenticate.on('message', function (message) {
    console.log('user_authenticate_topic message received');
    console.log(message.value);
    var data = JSON.parse(message.value);
    user_authenticate.handle_request(data.data, function(err,res){
        console.log('after handle user_authenticate_topic'+res);
        var payloads = [{
            topic:      data.replyTo,
            messages:   JSON.stringify({
                correlationId : data.correlationId,
                data : res
            }),
            partition : 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer_user_update_basic_info.on('message', function (message) {
    console.log('user_basic_info_topic message received');
    console.log(message.value);
    var data = JSON.parse(message.value);
    user_update_basic_info.handle_request(data.data, function(err,res){
        console.log('after handle user_basic_info_topic'+res);
        var payloads = [{
            topic:      data.replyTo,
            messages:   JSON.stringify({
                correlationId : data.correlationId,
                data : res
            }),
            partition : 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer_user_update_address.on('message', function (message) {
    console.log('user_update_address_topic message received');
    console.log(message.value);
    var data = JSON.parse(message.value);
    user_update_address.handle_request(data.data, function(err,res){
        console.log('after handle user_update_address_topic'+res);
        var payloads = [{
            topic:      data.replyTo,
            messages:   JSON.stringify({
                correlationId : data.correlationId,
                data : res
            }),
            partition : 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer_user_update_payment.on('message', function (message) {
    console.log('user_update_payment_topic message received');
    console.log(message.value);
    var data = JSON.parse(message.value);
    user_update_payment.handle_request(data.data, function(err,res){
        console.log('after handle user_update_payment_topic'+res);
        var payloads = [{
            topic:      data.replyTo,
            messages:   JSON.stringify({
                correlationId : data.correlationId,
                data : res
            }),
            partition : 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer_search_hall.on('message', function (message) {
    console.log('search_hall_topic message received');
    console.log(message.value);
    var data = JSON.parse(message.value);
    search_hall_title.handle_request(data.data, function(err,res){
        console.log('after handle search_hall_topic'+res);
        var payloads = [{
                topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer_search_movie.on('message', function (message) {
    console.log('search_movie_topic message received');
    console.log(message.value);
    var data = JSON.parse(message.value);
    search_movie_title.handle_request(data.data, function(err,res){
        console.log('after handle search_movie_topic'+res);
        var payloads = [{
                topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer_admin_add_movie_topic.on('message', function (message) {
    console.log('add_movie message received');
    console.log(message.value);
    var data = JSON.parse(message.value);
    movies.create(data.data, function(err,res){
        console.log('after handle add_movie');
        console.log(res);
        var payloads = [{
            topic:      data.replyTo,
            messages:   JSON.stringify({
                correlationId : data.correlationId,
                data : res
            }),
            partition : 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer_user_fetch_purchases.on('message', function (message) {
    console.log('user_billing_topic message received');
    console.log(message.value);
    var data = JSON.parse(message.value);
    user_fetch_purchases.handle_request(data.data, function(err,res){
        console.log('after handle user_billing_topic');
        console.log(res);
        var payloads = [{
            topic:      data.replyTo,
            messages:   JSON.stringify({
                correlationId : data.correlationId,
                data : res
            }),
            partition : 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer_book_movie.on('message', function (message) {
    console.log('book_movie_topic message received');
    console.log(message.value);
    var data = JSON.parse(message.value);
    book_movie.handle_request(data.data, function(err,res){
        console.log('after handle book_movie_topic');
        console.log(res);
        var payloads = [{
            topic:      data.replyTo,
            messages:   JSON.stringify({
                correlationId : data.correlationId,
                data : res
            }),
            partition : 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer_get_movie_detail_topic.on('message', function (message) {
    console.log('get_movie_details_topic message received');
    console.log(message.value);
    var data = JSON.parse(message.value);
    movie_details.handle_request(data.data, function(err,res){
        console.log('after handle get_movie_details_topic');
        console.log(res);
        var payloads = [{
            topic:      data.replyTo,
            messages:   JSON.stringify({
                correlationId : data.correlationId,
                data : res
            }),
            partition : 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer_get_hall_detail_topic.on('message', function (message) {
    console.log('get_hall_details_topic message received');
    console.log(message.value);
    var data = JSON.parse(message.value);
    hall_details.handle_request(data.data, function(err,res){
        console.log('after handle get_hall_details_topic');
        console.log(res);
        var payloads = [{
            topic:      data.replyTo,
            messages:   JSON.stringify({
                correlationId : data.correlationId,
                data : res
            }),
            partition : 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer_admin_search_movie.on('message', function (message) {
    console.log('admin_search_movie message received');
    console.log(message.value);
    var data = JSON.parse(message.value);
    movies.getAllMovies(data.data, function(err,res){
        console.log('after handle consumer_admin_search_movie');
        console.log(res);
        var payloads = [{
            topic:      data.replyTo,
            messages:   JSON.stringify({
                correlationId : data.correlationId,
                data : res
            }),
            partition : 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer_admin_add_hall.on('message', function (message) {
    console.log('admin_add_hall message received');
    console.log(message.value);
    var data = JSON.parse(message.value);
    movieHalls.create(data.data, function(err,res){
        console.log('after handle admin_add_hall');
        console.log(res);
        var payloads = [{
            topic:      data.replyTo,
            messages:   JSON.stringify({
                correlationId : data.correlationId,
                data : res
            }),
            partition : 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer_admin_search_hall.on('message', function (message) {
    console.log('admin_search_hall message received');
    console.log(message.value);
    var data = JSON.parse(message.value);
    movieHalls.getAllMovieHalls(data.data, function(err,res){
        console.log('after handle admin_search_hall');
        console.log(res);
        var payloads = [{
            topic:      data.replyTo,
            messages:   JSON.stringify({
                correlationId : data.correlationId,
                data : res
            }),
            partition : 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer_admin_update_hall.on('message', function (message) {
    console.log('consumer_admin_update_hall message received');
    console.log(message.value);
    var data = JSON.parse(message.value);
    movieHalls.update(data.data, function(err,res){
        console.log('after handle consumer_admin_update_hall');
        console.log(res);
        var payloads = [{
            topic:      data.replyTo,
            messages:   JSON.stringify({
                correlationId : data.correlationId,
                data : res
            }),
            partition : 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer_hall_get_data.on('message', function (message) {
    console.log('consumer_hall_get_data message received');
    console.log(message.value);
    var data = JSON.parse(message.value);
    movieHalls.getHallByOwner(data.data, function(err,res){
        console.log('after handle consumer_hall_get_data');
        console.log(res);
        var payloads = [{
            topic:      data.replyTo,
            messages:   JSON.stringify({
                correlationId : data.correlationId,
                data : res
            }),
            partition : 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});


consumer_admin_update_movie.on('message', function (message) {
    console.log('consumer_admin_update_movie message received');
    console.log(message.value);
    var data = JSON.parse(message.value);
    movies.update(data.data, function(err,res){
        console.log('after handle consumer_admin_update_movie');
        console.log(res);
        var payloads = [{
            topic:      data.replyTo,
            messages:   JSON.stringify({
                correlationId : data.correlationId,
                data : res
            }),
            partition : 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer_hall_update.on('message', function (message) {
    console.log('consumer_hall_update message received');
    console.log(message.value);
    var data = JSON.parse(message.value);
    movieHalls.updateHallByOwner(data.data, function(err,res){
        console.log('after handle consumer_hall_update');
        console.log(res);
        var payloads = [{
            topic:      data.replyTo,
            messages:   JSON.stringify({
                correlationId : data.correlationId,
                data : res
            }),
            partition : 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer_admin_get_movie.on('message', function (message) {
    console.log('consumer_admin_get_movie message received');
    console.log(message.value);
    var data = JSON.parse(message.value);
    movies.getMovie(data.data, function(err,res){
        console.log('after handle consumer_admin_get_movie');
        console.log(res);
        var payloads = [{
            topic:      data.replyTo,
            messages:   JSON.stringify({
                correlationId : data.correlationId,
                data : res
            }),
            partition : 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});
consumer_admin_view_purchase.on('message', function (message) {
    console.log('admin_view_purchase_topic message received');
    console.log(message.value);
    var data = JSON.parse(message.value);
    adminViewPurchase.handle_request(data.data, function(err,res){
        console.log('after handle admin_view_purchase_topic');
        console.log(res);
        var payloads = [{
            topic:      data.replyTo,
            messages:   JSON.stringify({
                correlationId : data.correlationId,
                data : res
            }),
            partition : 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer_admin_search_user.on('message', function (message) {
    console.log('consumer_admin_search_user message received');
    console.log(message.value);
    var data = JSON.parse(message.value);
    users.getAllNormalUsers(data.data, function(err,res){
        console.log('after handle consumer_admin_search_user');
        console.log(res);
        var payloads = [{
            topic:      data.replyTo,
            messages:   JSON.stringify({
                correlationId : data.correlationId,
                data : res
            }),
            partition : 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer_admin_update_user.on('message', function (message) {
    console.log('consumer_admin_update_user message received');
    console.log(message.value);
    var data = JSON.parse(message.value);
    users.updateByAdmin(data.data, function(err,res){
        console.log('after handle consumer_admin_update_user');
        console.log(res);
        var payloads = [{
            topic:      data.replyTo,
            messages:   JSON.stringify({
                correlationId : data.correlationId,
                data : res
            }),
            partition : 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer_get_halls_by_movie.on('message', function (message) {
    console.log('consumer_get_halls_by_movie message received');
    console.log(message.value);
    var data = JSON.parse(message.value);
    get_halls_by_movie.handle_request(data.data, function(err,res){
        console.log('after handle consumer_admin_update_user');
        console.log(res);
        var payloads = [{
            topic:      data.replyTo,
            messages:   JSON.stringify({
                correlationId : data.correlationId,
                data : res
            }),
            partition : 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer_cancel_booking.on('message', function (message) {
    console.log('hall_cancel_booking_topic message received');
    console.log(message.value);
    var data = JSON.parse(message.value);
    cancelBooking.handle_request(data.data, function(err,res){
        console.log('after handle hall_cancel_booking_topic');
        console.log(res);
        var payloads = [{
            topic:      data.replyTo,
            messages:   JSON.stringify({
                correlationId : data.correlationId,
                data : res
            }),
            partition : 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer_get_other_user.on('message', function (message) {
    console.log('get_other_user_topic message received');
    console.log(message.value);
    var data = JSON.parse(message.value);
    get_other_user_details.handle_request(data.data, function(err,res){
        console.log('after handle get_other_user_topic'+res);
        var payloads = [{
            topic:      data.replyTo,
            messages:   JSON.stringify({
                correlationId : data.correlationId,
                data : res
            }),
            partition : 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer_hall_fetch_revenue.on('message', function (message) {
    console.log('consumer_hall_fetch_revenue message received');
    console.log(message.value);
    var data = JSON.parse(message.value);
    revenues.handle_request(data.data, function(err,res){
        console.log('after handle consumer_hall_fetch_revenue');
        console.log(res);
        var payloads = [{
            topic:      data.replyTo,
            messages:   JSON.stringify({
                correlationId : data.correlationId,
                data : res
            }),
            partition : 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});


consumer_dashboard_highcharts.on('message', function (message) {
    console.log('dashboard_highcharts message received');
    console.log(message.value);
    var data = JSON.parse(message.value);

    switch(data.data.chartName) {
        case "top_ten_movies":
        dashboard_highcharts.top_ten_movies(data.data, function (err, res) {
                console.log('after handle dashboard_highcharts' + res);
                var payloads = [{
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }];
                producer.send(payloads, function (err, data) {
                    console.log(data);
                });
                return;
            });
                break;
        case "top_ten_city":
            dashboard_highcharts.top_ten_city(data.data, function (err, res) {
                console.log('after handle dashboard_highcharts' + res);
                var payloads = [{
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }];
                producer.send(payloads, function (err, data) {
                    console.log(data);
                });
                return;
            });

           case "top_ten_hall":
               dashboard_highcharts.top_ten_hall(data.data, function (err, res) {
                   console.log('after handle dashboard_highcharts' + res);
                   var payloads = [{
                       topic: data.replyTo,
                       messages: JSON.stringify({
                           correlationId: data.correlationId,
                           data: res
                       }),
                       partition: 0
                   }];
                   producer.send(payloads, function (err, data) {
                       console.log(data);
                   });
                   return;
               });
break;

        case "top_ten_pages":
                   dashboard_highcharts.top_ten_pages(data.data, function (err, res) {
                       console.log('after handle dashboard_highcharts' + res);
                       var payloads = [{
                           topic: data.replyTo,
                           messages: JSON.stringify({
                               correlationId: data.correlationId,
                               data: res
                           }),
                           partition: 0
                       }];
                       producer.send(payloads, function (err, data) {
                           console.log(data);
                       });
                       return;
                   });
        break;

        case "movies_clicks":
            dashboard_highcharts.movies_clicks(data.data, function (err, res) {
                console.log('after handle dashboard_highcharts' + res);
                var payloads = [{
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }];
                producer.send(payloads, function (err, data) {
                    console.log(data);
                });
                return;
            });
            break;

        case "less_seen_Area":
            dashboard_highcharts.less_seen_Area(data.data, function (err, res) {
                console.log('after handle dashboard_highcharts' + res);
                var payloads = [{
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }];
                producer.send(payloads, function (err, data) {
                    console.log(data);
                });
                return;
            });
            break;

        case "reviews_on_movies":
            dashboard_highcharts.reviews_on_movies(data.data, function (err, res) {
                console.log('after handle dashboard_highcharts' + res);
                var payloads = [{
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }];
                producer.send(payloads, function (err, data) {
                    console.log(data);
                });
                return;
            });
            break;
        case "trace_user":
            dashboard_highcharts.trace_user(data.data, function (err, res) {
                console.log('after handle dashboard_highcharts' + res);
                var payloads = [{
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }];
                producer.send(payloads, function (err, data) {
                    console.log(data);
                });
                return;
            });
            break;


        default:
            console.log("default case");
            break;

    }
});

consumer_admin_fetch_revenue.on('message', function (message) {
    console.log('consumer_admin_fetch_revenue message received');
    console.log(message.value);
    var data = JSON.parse(message.value);
    revenues.getAdminRevenue(data.data, function(err,res){
        console.log('after handle consumer_admin_fetch_revenue');
        console.log(res);
        var payloads = [{
            topic:      data.replyTo,
            messages:   JSON.stringify({
                correlationId : data.correlationId,
                data : res
            }),
            partition : 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer_user_checkout_details.on('message', function (message) {
    console.log('user_checkout_details_topic message received');
    console.log(message.value);
    let data = JSON.parse(message.value);
    user_checkout_details.handle_request(data.data, function(err,res){
        console.log('after user_checkout_details_topic'+res);
        let payloads = [{
            topic:      data.replyTo,
            messages:   JSON.stringify({
                correlationId : data.correlationId,
                data : res
            }),
            partition : 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

consumer_user_post_review.on('message', function (message) {
    console.log('user_post_review_topic message received');
    console.log(message.value);
    let data = JSON.parse(message.value);
    user_post_review.handle_request(data.data, function(err,res){
        console.log('after user_post_review_topic'+res);
        let payloads = [{
            topic:      data.replyTo,
            messages:   JSON.stringify({
                correlationId : data.correlationId,
                data : res
            }),
            partition : 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});