const mysql_pool = require('../database/mysql/mysql-pool');
var Movie = require('../database/mongo/model/movie');
var MovieHall = require('../database/mongo/model/movie_hall');
const bcrypt = require('bcryptjs');
const redis = require('../database/redis');
const {
    storeGetMovieHalls,
    storeAddMovieHall,
    storeAdminEditMovieHall,
    storeHallAdminEditMovieHall,
    storeHallAdminGetData,
} = require('./analytics');


function moviesAvgRating(movies,callback){

    movies.forEach(function(item){
        movieAvgRating(item);
    })

    callback();

}

function movieAvgRating(movie){

    let ans = 0.0;
    let count = 0;
    movie.reviews.forEach(function(item){
        ans+= item.rating? item.rating : 0;
        count++;
    })
    if(count>0)
        movie.rating=ans/count
    else
        movie.rating=0;
}

module.exports = {

    getAllMovieHalls(req,cb){

        storeGetMovieHalls(req);

        let res={}

        redis.client.get(redis.KEY_CONSTANTS.ALL_MOVIE_HALLS,function(err,reply) {
            if (err || !reply) {
                console.log('redis miss:'+redis.KEY_CONSTANTS.ALL_MOVIE_HALLS)

                MovieHall.find()
                    .populate('screens.movieId')
                    .lean(true)
                    .exec((err, moviehalls) => {
                        console.log(moviehalls);
                        if (err) {
                            res.code = 500;
                            res.value = {message: "There is some issue in server. Please try again later.", error: err};
                            cb(null, res);
                        }
                        else {
                            // moviesAvgRating(movies,function(){
                            res.code = 200;
                            res.value = {movieHalls: moviehalls};
                            cb(null, res);
                            // })

                            redis.client.set(redis.KEY_CONSTANTS.ALL_MOVIE_HALLS,JSON.stringify(moviehalls),'EX',redis.EXPIRE_TIME);

                        }
                    })

            }
            else {
                console.log('redis hit:'+redis.KEY_CONSTANTS.ALL_MOVIE_HALLS)
                // console.log(reply)
                res.code=200;
                res.value={movieHalls:JSON.parse(reply)};
                cb(null,res);
            }
        })

    },
    create(req, cb) {

        storeAddMovieHall(req)

        var res = {};
        console.log('create hall')
        console.log(req)

        if(!req.body){
            res.code = 500;
            res.value = { message: "There is some issue in server. Please try again later."};
            cb(null,res);
        }
        else if(req.body.ownerEmail===''){
            res.code = 400;
            res.value = { message: "Cannot have empty email"};
            cb(null,res);
        }
        else if(req.body.ownerPassword===''){
            res.code = 400;
            res.value = { message: "Cannot have empty password"};
            cb(null,res);
        }
        else if(req.body.name===''){
            res.code = 400;
            res.value = { message: "Cannot have empty name"};
            cb(null,res);
        }
        else if(req.body.address===''){
            res.code = 400;
            res.value = { message: "Cannot have empty address"};
            cb(null,res);
        }
        else if(req.body.phone===''){
            res.code = 400;
            res.value = { message: "Cannot have empty phone"};
            cb(null,res);
        }
        else if(req.body.city===''){
            res.code = 400;
            res.value = { message: "Cannot have empty zip"};
            cb(null,res);
        }
        else if(req.body.zip===''){
            res.code = 400;
            res.value = { message: "Cannot have empty zip"};
            cb(null,res);
        }
        else if(req.body.zip!=='' && /^\d{5}(-\d{4})?$/.test(req.body.zip)===false){
            res.code = 400;
            res.value = { message: "Zip format wrong!"};
            cb(null,res);
        }
        else if(req.body.state===''){
            res.code = 400;
            res.value = { message: "Cannot have empty state"};
            cb(null,res);
        }
        else {



            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.ownerPassword, salt, (err, hash) => {
                    // Store hash in database
                    let insertQuery = "INSERT INTO `users` (`email`, `password`, `status`, `type`,`address`,`city`,`state`,`zip`,`phone`) VALUES ('" + req.body.ownerEmail + "', '" + hash + "', 'ACTIVE', 'HALL_OWNER','"+req.body.address+"','"+req.body.city+"','"+req.body.state+"','"+req.body.zip+"','"+req.body.phone+"')";
                    console.log(insertQuery)
                    mysql_pool.fetchData(function (err, rows) {
                        if (err) {
                            if (err.code === "ER_DUP_ENTRY") {
                                if (err.sqlMessage.match(/email_UNIQUE/g) == "email_UNIQUE") {
                                    res.code = 400;
                                    res.value = { message: "Email already registered!" };
                                    cb(null, res);
                                }
                                else if (err.sqlMessage.match(/phone/g) == "phone") {
                                    res.code = 400;
                                    res.value = { message: "Phone already registered!" };
                                    cb(null, res);
                                }
                                else {
                                    res.code = 500;
                                    res.value = {message: "There is some issue in server. Please try again later."};
                                    cb(null, res);
                                }
                            }
                            else {
                                res.code = 500;
                                res.value = {message: "There is some issue in server. Please try again later."};
                                cb(null, res);
                            }
                        }
                        else {

                            let filePath="";
                            if(req.file) {
                                filePath="/images/"+req.file.filename;
                            }

                            let newMovieHall = {
                                name: req.body.name,
                                address: req.body.address,
                                ownerEmail: req.body.ownerEmail,
                                phone: req.body.phone,
                                city:req.body.city,
                                state:req.body.state,
                                zip:req.body.zip,
                            }
                            if(filePath!=="")
                                newMovieHall.image=filePath;

                            console.log(newMovieHall)

                            new MovieHall(
                                newMovieHall
                            )
                                .save()

                                .then(movieHall => {
                                    res.code = 201;
                                    res.value = { message: "Movie Hall created Successfully", movieHall:movieHall};
                                    cb(null,res);

                                    console.log('redis delete: '+ redis.KEY_CONSTANTS.ALL_MOVIE_HALLS);
                                    redis.client.del(redis.KEY_CONSTANTS.ALL_MOVIE_HALLS);

                                })
                                .catch(error => {
                                    res.code = 500;
                                    res.value = { message: "There is some issue in server. Please try again later.",error:error }
                                    cb(null,res);
                                });
                        }
                    }, insertQuery);
                });
            });


        }
    },
    update(req, cb) {

        storeAdminEditMovieHall(req);

        var res = {};
        console.log("updating hall")
        console.log(typeof (req.body.screens));

        if(!req.body){
            res.code = 500;
            res.value = { message: "There is some issue in server. Please try again later."};
            cb(null,res);
        }
        else if(req.body.ownerEmail===''){
            res.code = 400;
            res.value = { message: "Cannot have empty email"};
            cb(null,res);
        }
        else if(req.body.name===''){
            res.code = 400;
            res.value = { message: "Cannot have empty name"};
            cb(null,res);
        }
        else if(req.body.address===''){
            res.code = 400;
            res.value = { message: "Cannot have empty address"};
            cb(null,res);
        }
        else if(req.body.phone===''){
            res.code = 400;
            res.value = { message: "Cannot have empty phone"};
            cb(null,res);
        }
        else if(req.body.city===''){
            res.code = 400;
            res.value = { message: "Cannot have empty zip"};
            cb(null,res);
        }
        else if(req.body.zip===''){
            res.code = 400;
            res.value = { message: "Cannot have empty zip"};
            cb(null,res);
        }
        else if(req.body.zip!=='' && /^\d{5}(-\d{4})?$/.test(req.body.zip)===false){
            res.code = 400;
            res.value = { message: "Zip format wrong!"};
            cb(null,res);
        }
        else if(req.body.state===''){
            res.code = 400;
            res.value = { message: "Cannot have empty state"};
            cb(null,res);
        }
        else {

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.ownerPassword, salt, (err, hash) => {
                    // Store hash in database
                    let insertQuery = "UPDATE `users` SET `type`='HALL_OWNER',`address`='"+req.body.address+"',`phone`='"+req.body.phone+"',`city`='"+req.body.city+"',`zip`='"+req.body.zip+"',`state`='"+req.body.state+"'";
                    if(req.body.ownerPassword && req.body.ownerPassword!=""){
                        insertQuery+=",`password`='"+hash+"' ";
                        console.log("changing password");
                    }
                    insertQuery+=" WHERE `email`='"+req.body.ownerEmail+"'";
                    mysql_pool.fetchData(function (err, rows) {
                        if (err) {
                            console.log(err);
                            if (err.code === "ER_DUP_ENTRY") {
                                if (err.sqlMessage.match(/email_UNIQUE/g) == "email_UNIQUE") {
                                    res.code = 400;
                                    res.value = { message: "Email already registered!" };
                                    cb(null, res);
                                }
                                else if (err.sqlMessage.match(/phone/g) == "phone") {
                                    res.code = 400;
                                    res.value = { message: "Phone already registered!" };
                                    cb(null, res);
                                }
                                else {
                                    res.code = 500;
                                    res.value = {message: "There is some issue in server. Please try again later."};
                                    cb(null, res);
                                }
                            }
                            else {
                                res.code = 500;
                                res.value = {message: "There is some issue in server. Please try again later."};
                                cb(null, res);
                            }
                        }
                        else {

                            let filePath="";
                            if(req.file) {
                                filePath="/images/"+req.file.filename;
                            }

                            var newMovieHall = {
                                name: req.body.name,
                                address: req.body.address,
                                phone: req.body.phone,
                                city:req.body.city,
                                state:req.body.state,
                                zip:req.body.zip,
                            }
                            if(filePath!=="")
                                newMovieHall.image=filePath;

                            if(req.body.screens && req.body.screens!==""){
                                console.log("screens parsing")
                                req.body.screens= JSON.parse(req.body.screens);
                                newMovieHall.screens=req.body.screens;
                            }


                            MovieHall.findOneAndUpdate(
                                {_id:req.params.hallId},

                                    newMovieHall
                                ,
                                {new:true}
                            )
                                .populate('screens.movieId')
                                .exec()
                                .then(movieHall => {
                                    res.code = 200;
                                    res.value = { message: "Movie Hall updated Successfully", movieHall:movieHall};
                                    cb(null,res);

                                    console.log('redis delete: '+ redis.KEY_CONSTANTS.ALL_MOVIE_HALLS);
                                    redis.client.del(redis.KEY_CONSTANTS.ALL_MOVIE_HALLS);

                                })
                                .catch(error => {
                                    console.log(error);
                                    res.code = 500;
                                    res.value = { message: "There is some issue in server. Please try again later.",error:error }
                                    cb(null,res);
                                });
                        }
                    }, insertQuery);
                });
            });


        }
    },
    updateHallByOwner(req, cb) {

        storeHallAdminEditMovieHall(req);

        var res = {};
        console.log("updating halladmin")
        console.log(req)

        if(!req.body){
            res.code = 500;
            res.value = { message: "There is some issue in server. Please try again later."};
            cb(null,res);
        }
        else if(req.body.ownerEmail===''){
            res.code = 400;
            res.value = { message: "Cannot have empty email"};
            cb(null,res);
        }
        else if(req.body.name===''){
            res.code = 400;
            res.value = { message: "Cannot have empty name"};
            cb(null,res);
        }
        else if(req.body.address===''){
            res.code = 400;
            res.value = { message: "Cannot have empty address"};
            cb(null,res);
        }
        else if(req.body.phone===''){
            res.code = 400;
            res.value = { message: "Cannot have empty phone"};
            cb(null,res);
        }
        else if(req.body.city===''){
            res.code = 400;
            res.value = { message: "Cannot have empty zip"};
            cb(null,res);
        }
        else if(req.body.zip===''){
            res.code = 400;
            res.value = { message: "Cannot have empty zip"};
            cb(null,res);
        }
        else if(req.body.zip!=='' && /^\d{5}(-\d{4})?$/.test(req.body.zip)===false){
            res.code = 400;
            res.value = { message: "Zip format wrong!"};
            cb(null,res);
        }
        else if(req.body.state===''){
            res.code = 400;
            res.value = { message: "Cannot have empty state"};
            cb(null,res);
        }
        else {

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.ownerPassword, salt, (err, hash) => {
                    // Store hash in database
                    let insertQuery = "UPDATE `users` SET `type`='HALL_OWNER',`address`='"+req.body.address+"',`phone`='"+req.body.phone+"',`city`='"+req.body.city+"',`zip`='"+req.body.zip+"',`state`='"+req.body.state+"'";
                    if(req.body.ownerPassword && req.body.ownerPassword!=""){
                        insertQuery+=",`password`='"+hash+"' ";
                        console.log("changing password");
                    }
                    insertQuery+=" WHERE `email`='"+req.user.email+"'";
                    mysql_pool.fetchData(function (err, rows) {
                        if (err) {
                            console.log(err);
                            if (err.code === "ER_DUP_ENTRY") {
                                if (err.sqlMessage.match(/email_UNIQUE/g) == "email_UNIQUE") {
                                    res.code = 400;
                                    res.value = { message: "Email already registered!" };
                                    cb(null, res);
                                }
                                else if (err.sqlMessage.match(/phone/g) == "phone") {
                                    res.code = 400;
                                    res.value = { message: "Phone already registered!" };
                                    cb(null, res);
                                }
                                else {
                                    res.code = 500;
                                    res.value = {message: "There is some issue in server. Please try again later."};
                                    cb(null, res);
                                }
                            }
                            else {
                                res.code = 500;
                                res.value = {message: "There is some issue in server. Please try again later."};
                                cb(null, res);
                            }
                        }
                        else {

                            let filePath="";
                            if(req.file) {
                                filePath="/images/"+req.file.filename;
                            }

                            let newMovieHall = {
                                name: req.body.name,
                                address: req.body.address,
                                phone: req.body.phone,
                                city:req.body.city,
                                state:req.body.state,
                                zip:req.body.zip,
                            }
                            if(filePath!=="")
                                newMovieHall.image=filePath;

                            if(req.body.screens && req.body.screens!==""){
                                req.body.screens= JSON.parse(req.body.screens);
                                newMovieHall.screens=req.body.screens;
                            }


                            MovieHall.findOneAndUpdate(
                                {ownerEmail:req.user.email},

                                    newMovieHall
                                ,
                                {new:true}
                            )
                                .populate('screens.movieId')
                                .exec()
                                .then(movieHall => {
                                    res.code = 200;
                                    res.value = { message: "Movie Hall updated Successfully", movieHall:movieHall};
                                    cb(null,res);

                                    console.log('redis delete: '+ redis.KEY_CONSTANTS.ALL_MOVIE_HALLS);
                                    redis.client.del(redis.KEY_CONSTANTS.ALL_MOVIE_HALLS);

                                })
                                .catch(error => {
                                    res.code = 500;
                                    res.value = { message: "There is some issue in server. Please try again later.",error:error }
                                    cb(null,res);
                                });
                        }
                    }, insertQuery);
                });
            });


        }
    },
    getHallByOwner(req,cb){

        storeHallAdminGetData(req);

        let res={}

        console.log(req);

        if(!req.user){
            res.code = 400;
            res.value = { message: "Not logged in!"};
            cb(null,res);
        }
        else{

        MovieHall.findOne({ownerEmail:req.user.email})
            .populate('screens.movieId')
            .lean(true)
            .exec((err,moviehall)=>{
                console.log(moviehall);
                if(err){
                    res.code = 500;
                    res.value = {message:"There is some issue in server. Please try again later.",error:err};
                    cb(null,res);
                }
                else {
                    // moviesAvgRating(movies,function(){
                    res.code=200;
                    res.value={movieHall:moviehall};
                    cb(null,res);
                    // })

                }
            })
        }


    },

};