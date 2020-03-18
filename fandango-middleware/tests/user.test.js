const  expect       = require('expect');
const  request      = require('supertest');
const   app         = require('../app');
// const   User        = require('../database/mongo/models/user');
const  Movie        = require('../database/mongo/model/movie');
const mongoose      = require('../database/mongo/mongoose');
const Mockgoose     = require('mockgoose').Mockgoose;
const mockgoose     = new Mockgoose(mongoose); //mockgoose intercepts that connection

let Cookies;

before(function(done) {
    mockgoose.prepareStorage().then(function() {
        //basically simulates your current database, so you can continue using the methods save, find, etc from mongoose.
        mongoose.connect('mongodb://test:test@ds263619.mlab.com:63619/fandangodbtest', function(err) {
            done(err);
        });
    });
});

after(function (done) {
    mockgoose.helper.reset().then(() => {
        done();
    });
});


describe('POST: /users/login', () => {

    it('should login valid user', (done) => {

        let testValidUser = {
            email: 'barry.allen@gmail.com',
            password: '123123'
        };

        request(app)
            .post('/users/login')
            .send(testValidUser)
            .expect(200)
            .expect((res) => {
                // save cookie for future use
                Cookies = res.headers['set-cookie'].pop().split(';')[0];
                console.log(Cookies);
                expect(res.body.message).toBe('Login Successful');
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });

    });

    it('should not udpate basic info', (done) => {

        let testInvalidLogin = {
            firstname: "barrry",
            lastname: "allen",
            phone:"72631526317"
        };

        request(app)
            .post('/users/updateInfo')
            .send(testInvalidLogin)
            .expect(401)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });


    it('should not udpate card info', (done) => {

        let testInvalidLogin = {
            cardnumber: "8273524364243946",
            cardmonth: "8",
            cardzip: "95126",
            cardyear:"2018"
        };

        request(app)
            .post('/users/updateCard')
            .send(testInvalidLogin)
            .expect(401)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });


    it('should not udpate address', (done) => {

        let testInvalidLogin = {
            address: "1330 the Alam",
            state: "CA"
        };

        request(app)
            .post('/users/updateAddress')
            .send(testInvalidLogin)
            .expect(401)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });

    it('should reject invalid user from logging in', (done) => {

        let testInvalidLogin = {
            email: 'barryallen@gmail.com',
            password: '123123'
        };

        request(app)
            .post('/users/login')
            .send(testInvalidLogin)
            .expect(404)
            .expect((res) => {
                expect(res.body.message).toBe("This email does not exists. Please create an account");
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });

    it('should reject invalid password logging in', (done) => {

        let testInvalidPassword = {
            email: 'barry.allen@gmail.com',
            password: '123123123'
        };

        request(app)
            .post('/users/login')
            .send(testInvalidPassword)
            .expect(401)
            .expect((res) => {
                expect(res.body.message).toBe("The email and password you entered did not match our records. Please double-check and try again.");
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });



});

describe('POST: /users/logout', () => {

    it('should logout user', (done) => {

        let req = request(app).post('/users/logout');
        // Set cookie to get saved user session
        req.cookies = Cookies;

        req.expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                expect(res.body.message).toBe('Logout successful.');
                done();
            });
    });

});