const LocalStrategy   = require("passport-local").Strategy;
const kafka           = require('../kafka/client');
const {getExtraForAnalytics} =require( "./helper");

module.exports = function(passport) {
    passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,

    },function(req,username , password, done) {

        kafka.make_request('user_login_topic',{"email":username,"password":password,extras:getExtraForAnalytics(req)}, function(err,results){

            if(err){
                done(err,{});
            }
            else
            {
                const error = new Error();
                switch(results.code) {
                    case 200:
                        return done(null, results.value);
                    default:
                        error.message = results.value;
                        error.name    = results.code;
                        return done(error); // Invalid password (401) or User doesn't exist (404)
                }
            }
        });
    }));
};