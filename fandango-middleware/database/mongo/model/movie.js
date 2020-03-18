const  mongoose     = require('../mongoose');
const  Schema       = mongoose.Schema;

var ReviewSchema = new Schema({

    email   : { type: String, trim: true },
    name    : { type: String, trim: true },
    rating  : { type: Number, trim: true },
    title   : { type: String, trim: true },
    comment : { type: String, trim: true }
});

// create a schema
var MovieSchema = new Schema({
    
    title      : {  type: String        , trim: true, default:'' },
    genre      : {  type: String        , trim: true, default:'' },
    characters : {  type: String        , trim: true, default:''},
    duration   : {  type: String        , trim: true, default: '' },
    ratingType : {  type: String        , trim: true, default: '' },
    reviews    : [{ type: ReviewSchema}],
    trailerLink: {  type: String        , trim: true, default: '' },
    image      : {type:String        ,trim:true,default:'/images/default-movie.png'},
},{ timestamps: true});

let Movie = mongoose.model('Movie', MovieSchema,'movies');
module.exports =  Movie;