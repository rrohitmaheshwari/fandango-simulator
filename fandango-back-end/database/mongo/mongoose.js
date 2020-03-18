// Mongoose Setup - MongoDB - ORM
const mongoose      = require("mongoose");
const options       = {
    poolSize: 10    //size of the connection pool 
};
mongoose.Promise    = global.Promise;
// mongoose.connect('mongodb://localhost:27017/fandangodb', options);
// mongoose.connect('mongodb://fandangouser:fandangopassword@ds251819.mlab.com:51819/fandangodb', options);
//TEST
mongoose.connect('mongodb://test:test@ds263619.mlab.com:63619/fandangodbtest', options);

module.exports = mongoose;