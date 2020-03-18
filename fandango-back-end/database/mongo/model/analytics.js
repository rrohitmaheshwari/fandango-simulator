const  mongoose     = require('../mongoose');
const  Schema       = mongoose.Schema;


// create a schema
var AnalyticsSchema = new Schema({
    
    page                : { type: String, trim: true,default:'' },
    linkClicked         : { type: String, trim: true, default: '' },
    movieHallName       : { type: String, trim: true, default: '' },
    movieHallId         : { type: Schema.Types.ObjectId, ref:'MovieHall' },
    movieName           : { type: String, trim: true, default: '' },
    movieId             : { type: Schema.Types.ObjectId, ref:'Movie' },
    section             : { type: String, trim: true, default: '' },
    userEmail           : { type: String, trim: true, default: '' },
    type                : { type: String, trim: true, default: '' },
    city                : { type: String, trim: true, default: ''  },
    state               : { type: String, trim: true, default: ''  },
    zip                 : { type: String, trim: true, default: ''  },
    sessionID           : { type: String, trim: true, default: '' },
    action              : { type: String, trim: true, default: '' },
    data                : { type: String, trim: true, default: '' },
},{timestamps:true});

let Analytics = mongoose.model('Analytics', AnalyticsSchema,'analytics');
module.exports =  Analytics;