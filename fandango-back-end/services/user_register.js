const _ = require('lodash');
const bcrypt = require('bcryptjs');
const mysql_pool = require('../database/mysql/mysql-pool');
const {storeUserRegister} = require('./analytics')
function handle_request(msg, callback) {

    storeUserRegister(msg);

    let result = {};

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(msg.password, salt, (err, hash) => {
            // Store hash in database
            let insertQuery = "INSERT INTO `users` (`email`, `password`, `status`, `type`) VALUES ('" + msg.email + "', '" + hash + "', 'ACTIVE', 'NORMAL')";
            mysql_pool.fetchData(function (err, rows) {
                if (err) {
                    if (err.code === "ER_DUP_ENTRY") {
                        if (err.sqlMessage.match(/email_UNIQUE/g) == "email_UNIQUE") {
                            result.code = 400;
                            result.value = { message: "Email already registered!" };
                            callback(null, result);
                        }
                    }
                    result.code = 500;
                    result.value = { message: "There is some issue in server. Please try again later." };
                    callback(null, result);
                }
                // User registered successfully.
                result.code = 200;
                result.value = { message: "User registered successfully." };
                callback(null, result);
            }, insertQuery);
        });
    });

}

exports.handle_request = handle_request;