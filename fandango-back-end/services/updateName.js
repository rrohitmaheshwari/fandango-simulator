var User = require('../mongo/model/user');

function handle_request(msg, callback) {

    var res = {};
    console.log("In updateName.js handle_request():");

    User.findOneAndUpdate({username: msg.username}, {$set:{name:msg.name}}, {new: true}, function (err, doc) {
        if (err) {

            res.code = "400";
            res.value = "Cannot set 'Name' at the moment";
            console.log(res.value);
            callback(err, res);
        }

        res.code = "200";
        res.value = doc;
        console.log(doc);
        callback(null, res);
    });    
}

exports.handle_request = handle_request;