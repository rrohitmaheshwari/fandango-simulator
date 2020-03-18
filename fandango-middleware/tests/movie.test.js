const  expect       = require('expect');
const  request      = require('supertest');
const   app         = require('../app');
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


describe('POST: /admin/movies', () => {

    it('Should login ADMIN', (done) => {

        let testValidUser = {
            email: 'admin@fandango.com',
            password: '12345'
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

    it('Should allow ADMIN to add VALID MOVIE', (done) => {

        let newMovie = {
            title: "Flash vs Batman",
            genre: "Action",
            characters: "Clark Kent,Bruce Wayne",
            duration: "120",
            ratingType: "PG-13",
        };

        request(app)
            .post('/admin/movies')
            .send(newMovie)
            .expect(201)
            .expect((res) => {
                expect(res.body.message).toBe("Movie created Successfully");
                expect(res.body.movie.title).toBe("Flash vs Batman");
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });

    it('Should allow ADMIN to Add Halls', (done) => {

        let newMovie = {
            name: "CinemaxX",
            address: "1330 The Alam",
            ownerEmail: "cine@max.com",
            phone: "87263745234",
            city:"New York (NY)",
            state:"NY",
            zip:"95125",
        };

        request(app)
            .post('/admin/halls')
            .send(newMovie)
            .expect(201)
            .expect((res) => {
                expect(res.body.message).toBe("Movie Hall created Successfully");
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });

    it('Should not allow ADMIN to update User', (done) => {

        let newMovie = {
            title: "Flash vs Reverse Flash",
            genre: "Action",
            characters: "Barry Allen",
            duration: "120",
            ratingType: "PG-13",
        };

        request(app)
            .put('/admin/users/1')
            .send(newMovie)
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });

});

describe('POST: /users/logout', () => {

    it('Should logout ADMIN', (done) => {

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