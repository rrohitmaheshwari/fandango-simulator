const  mongoose     = require('../mongoose');
const  Schema       = mongoose.Schema;


var ScreenSchema = new Schema({

    screenNumber                : { type: Number},
    showTimings                 : [{ type: String, trim: true}],
    movieId                     : { type: Schema.Types.ObjectId, ref:'Movie'},
    ticketPrice                 : { type: Number, default: 0},
    totalSeats                  : { type: Number, default: 0 }
},{timestamps:true});


// create a schema
var MovieHallSchema = new Schema({
    
    name       : { type: String      , trim: true,default:'' },
    address    : { type: String      , trim: true, default: '' },
    ownerEmail : { type: String      , unique:true},
    phone      : { type: String      , unique:true},
    screens    : [ScreenSchema],
    image      : {type:String        ,trim:true,default:'/images/default-hall.png'},
    city       : { type: String      , trim: true, default: '' },
    state      : { type: String      , trim: true, default: '' },
    zip        : { type: String      , trim: true, default: '' },

},{timestamps:true});

let MovieHall = mongoose.model('MovieHall', MovieHallSchema,'moviehalls');
module.exports =  MovieHall;