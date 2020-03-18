const Movie = require('../database/mongo/model/movie');
const redis = require('../database/redis');
const mysql_pool = require('../database/mysql/mysql-pool');
const bcrypt = require('bcryptjs');
const {storeAdminEditUser,storeAdminGetUsers} =require('./analytics');


module.exports = {
    getAllNormalUsers(req,cb){

        storeAdminGetUsers(req);

        let res={}

        redis.client.get(redis.KEY_CONSTANTS.ALL_NORMAL_USERS,function(err,reply){
            if(err || !reply){

                let getAllNormalUsers = "SELECT * from `users` WHERE `type`='NORMAL' and `status`='ACTIVE'";

                mysql_pool.fetchData(function(err, results){
                    if (err) {
                        res.code  = 500;
                        res.value = { message: "There is some issue in server. Please try again later.",error:err };
                        cb(null, res);
                    }
                    else {
                        //User updated - basic info changed
                        res.code = 200;
                        res.value = {message: "Fetched users!",users:results};
                        cb(null, res);
                        // redis.client.set(redis.KEY_CONSTANTS.ALL_MOVIES,JSON.stringify(movies),'EX',redis.EXPIRE_TIME);

                    }
                }, getAllNormalUsers);

            }
            else{
                console.log('redis hit:'+redis.KEY_CONSTANTS.ALL_NORMAL_USERS)
                // console.log(reply)
                res.code=200;
                res.value={movies:JSON.parse(reply)};
                cb(null,res);
            }
        })



    },
    updateByAdmin(req, cb) {

        storeAdminEditUser(req);

        var res = {};
        console.log("updating user")
        console.log(req.body);

        if(!req.body){
            res.code = 500;
            res.value = { message: "There is some issue in server. Please try again later."};
            cb(null,res);
        }
        else if(req.body.firstname===''){
            res.code = 400;
            res.value = { message: "Cannot have empty first name"};
            cb(null,res);
        }
        else if(req.body.zip!=='' && /^\d{5}(-\d{4})?$/.test(req.body.zip)===false){
            res.code = 400;
            res.value = { message: "Zip format wrong!"};
            cb(null,res);
        }
        else {

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    // Store hash in database
                    let insertQuery = "UPDATE `users` SET `type`='NORMAL',`firstname`='"+req.body.firstname+"',`lastname`='"+req.body.lastname+"',`address`='"+req.body.address+"',`phone`='"+req.body.phone+"',`city`='"+req.body.city+"',`zip`='"+req.body.zip+"',`state`='"+req.body.state+"'";
                    if(req.body.password && req.body.password!==""){
                        insertQuery+=",`password`='"+hash+"' ";
                        console.log("changing password");
                    }
                    insertQuery+=" WHERE `email`='"+req.body.email+"'";
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

                            res.code = 200;
                            res.value = { message: "User updated Successfully", user:rows[0]};
                            cb(null,res);

                        }
                    }, insertQuery);
                });
            });


        }
    },

};