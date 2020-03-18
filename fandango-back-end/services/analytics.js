const Movie = require('../database/mongo/model/movie');
const MovieHall = require('../database/mongo/model/movie');
const Analytics = require('../database/mongo/model/analytics');
const URL = require('url');
var ObjectId= require('mongoose').Types.ObjectId;

module.exports = {
    storeGetMovies,
    storeAdminGetUsers,
    storeAddMovie,
    storeGetMovieHalls,
    storeAddMovieHall,
    storeAdminEditMovieHall,
    storeEditMovie,
    storeGetMovie,
    storeHallAdminEditMovieHall,
    storeHallAdminGetData,
    storeUserGetData,
    storeFetchMovies,
    storeAdminEditUser,
    storeUserUpdateBasicInfo,
    storeUserUpdateAddress,
    storeUserUpdatePayment,
    storeUserDeactivate,
    storeUserFetchPurchases,
    storeUserLogin,
    storeUserLogout,
    storeUserRegister,
    storeUserSearchHall,
    storeUserSearchMovie,
    storeUserPostReview,
    storeUserCheckout,
    storeUserBookMovie,
}


function storeGetMovies(req) {


    try {
        // console.log(req.extras.url);
        var analytics = {
            // page                : req.extras.headers.referer,
            // linkClicked         : { type: String, trim: true, default: '' },
            // section             : { type: String, trim: true, default: '' },
            userEmail: req.extras.user.email,
            type: req.extras.user.type,
            city: req.extras.user.city,
            state: req.extras.user.state,
            zip: req.extras.user.zip,
            sessionID: req.extras.sessionID,
            action: ACTION_CONSTANTS.LOAD_DATA,
            data: DATA_CONSTANTS.MOVIES,
        };

        analytics.page = getPage(req);

        storeAnalytics(analytics);
    }
    catch (err){
        console.log(err);
    }

}

function storeAdminGetUsers(req) {


    try {
        // console.log(req.extras.url);
        var analytics = {
            // page                : req.extras.headers.referer,
            // linkClicked         : { type: String, trim: true, default: '' },
            // section             : { type: String, trim: true, default: '' },
            userEmail: req.extras.user.email,
            type: req.extras.user.type,
            city: req.extras.user.city,
            state: req.extras.user.state,
            zip: req.extras.user.zip,
            sessionID: req.extras.sessionID,
            action: ACTION_CONSTANTS.LOAD_DATA,
            data: DATA_CONSTANTS.USERS,
        };

        analytics.page = getPage(req);

        storeAnalytics(analytics);
    }
    catch (err){
        console.log(err);
    }

}

function storeAddMovie(req) {

    try{
        // console.log(req.extras.url);
        var analytics={
            // page                : req.extras.headers.referer,
            linkClicked         : LINK_CONSTANTS.ADMIN_ADD_MOVIE,
            // section             : { type: String, trim: true, default: '' },
            userEmail           : req.extras.user.email,
            type                : req.extras.user.type,
            city                : req.extras.user.city,
            state               : req.extras.user.state,
            zip                 : req.extras.user.zip,
            sessionID           : req.extras.sessionID,
            action              : ACTION_CONSTANTS.BUTTON_CLICK,
        };

        analytics.page=getPage(req);

        storeAnalytics(analytics);
    }
    catch (err){
        console.log(err);
    }
}

function storeGetMovieHalls(req) {


    try {
        // console.log(req.extras.url);
        var analytics = {
            // page                : req.extras.headers.referer,
            // linkClicked         : { type: String, trim: true, default: '' },
            // section             : { type: String, trim: true, default: '' },
            userEmail: req.extras.user.email,
            type: req.extras.user.type,
            city: req.extras.user.city,
            state: req.extras.user.state,
            zip: req.extras.user.zip,
            sessionID: req.extras.sessionID,
            action: ACTION_CONSTANTS.LOAD_DATA,
            data: DATA_CONSTANTS.MOVIE_HALLS,
        };

        analytics.page = getPage(req);

        storeAnalytics(analytics);
    }
    catch (err){
        console.log(err);
    }
}

function storeAddMovieHall(req) {

    try {
        // console.log(req.extras.url);
        var analytics = {
            // page                : req.extras.headers.referer,
            linkClicked: LINK_CONSTANTS.ADMIN_ADD_MOVIE_HALL,
            // section             : { type: String, trim: true, default: '' },
            userEmail: req.extras.user.email,
            type: req.extras.user.type,
            city: req.extras.user.city,
            state: req.extras.user.state,
            zip: req.extras.user.zip,
            sessionID: req.extras.sessionID,
            action: ACTION_CONSTANTS.BUTTON_CLICK,
        };

        analytics.page = getPage(req);

        storeAnalytics(analytics);
    }
    catch (err){
        console.log(err);
    }
}

function storeAdminEditMovieHall(req) {

    try {
        // console.log(req.extras.url);
        var analytics = {
            // page                : req.extras.headers.referer,
            linkClicked: LINK_CONSTANTS.ADMIN_EDIT_MOVIE_HALL,
            // section             : { type: String, trim: true, default: '' },
            userEmail: req.extras.user.email,
            type: req.extras.user.type,
            city: req.extras.user.city,
            state: req.extras.user.state,
            zip: req.extras.user.zip,
            sessionID: req.extras.sessionID,
            action: ACTION_CONSTANTS.BUTTON_CLICK,
        };

        analytics.page = getPage(req);

        storeAnalytics(analytics);
    }
    catch (err){
        console.log(err);
    }
}

function storeHallAdminEditMovieHall(req) {

    try {
        // console.log(req.extras.url);
        var analytics = {
            // page                : req.extras.headers.referer,
            linkClicked: LINK_CONSTANTS.HALL_ADMIN_EDIT_MOVIE_HALL,
            // section             : { type: String, trim: true, default: '' },
            userEmail: req.extras.user.email,
            type: req.extras.user.type,
            city: req.extras.user.city,
            state: req.extras.user.state,
            zip: req.extras.user.zip,
            sessionID: req.extras.sessionID,
            action: ACTION_CONSTANTS.BUTTON_CLICK,
        };

        analytics.page = getPage(req);

        storeAnalytics(analytics);
    }
    catch (err){
        console.log(err);
    }
}

function storeHallAdminGetData(req) {

    try {
        // console.log(req.extras.url);
        var analytics = {
            // page                : req.extras.headers.referer,
            // linkClicked         : { type: String, trim: true, default: '' },
            // section             : { type: String, trim: true, default: '' },
            userEmail: req.extras.user.email,
            type: req.extras.user.type,
            city: req.extras.user.city,
            state: req.extras.user.state,
            zip: req.extras.user.zip,
            sessionID: req.extras.sessionID,
            action: ACTION_CONSTANTS.LOAD_DATA,
            data: DATA_CONSTANTS.HALL_ADMIN_MOVIE_HALL,
        };

        analytics.page = getPage(req);

        storeAnalytics(analytics);
    }
    catch (err){
        console.log(err);
    }
}

function storeUserGetData(req) {

    try {
        // console.log(req.extras.url);
        var analytics = {
            // page                : req.extras.headers.referer,
            // linkClicked         : { type: String, trim: true, default: '' },
            // section             : { type: String, trim: true, default: '' },
            userEmail: req.extras.user.email,
            type: req.extras.user.type,
            city: req.extras.user.city,
            state: req.extras.user.state,
            zip: req.extras.user.zip,
            sessionID: req.extras.sessionID,
            action: ACTION_CONSTANTS.LOAD_DATA,
            data: DATA_CONSTANTS.USER,
        };

        analytics.page = getPage(req);

        storeAnalytics(analytics);
    }
    catch (err){
        console.log(err);
    }
}

function storeEditMovie(req) {

    try {
        console.log(req.extras.url);
        var analytics = {
            // page                : req.extras.headers.referer,
            linkClicked: LINK_CONSTANTS.ADMIN_EDIT_MOVIE,
            // section             : { type: String, trim: true, default: '' },
            userEmail: req.extras.user.email,
            type: req.extras.user.type,
            city: req.extras.user.city,
            state: req.extras.user.state,
            zip: req.extras.user.zip,
            sessionID: req.extras.sessionID,
            action: ACTION_CONSTANTS.BUTTON_CLICK,
        };

        analytics.page = getPage(req);

        storeAnalytics(analytics);
    }
    catch (err){
        console.log(err);
    }
}

function storeAdminEditUser(req) {

    try {
        // console.log(req.extras.url);
        var analytics = {
            // page                : req.extras.headers.referer,
            linkClicked: LINK_CONSTANTS.ADMIN_EDIT_USER,
            // section             : { type: String, trim: true, default: '' },
            userEmail: req.extras.user.email,
            type: req.extras.user.type,
            city: req.extras.user.city,
            state: req.extras.user.state,
            zip: req.extras.user.zip,
            sessionID: req.extras.sessionID,
            action: ACTION_CONSTANTS.BUTTON_CLICK,
        };

        analytics.page = getPage(req);

        storeAnalytics(analytics);
    }
    catch (err){
        console.log(err);
    }
}

function storeGetMovie(req) {

    try {
        // console.log(req.extras.url);
        var analytics = {
            // page                : req.extras.headers.referer,
            // linkClicked         : LINK_CONSTANTS.ADMIN_EDIT_MOVIE,
            // section             : { type: String, trim: true, default: '' },
            userEmail: req.extras.user.email,
            type: req.extras.user.type,
            city: req.extras.user.city,
            state: req.extras.user.state,
            zip: req.extras.user.zip,
            sessionID: req.extras.sessionID,
            action: ACTION_CONSTANTS.LOAD_DATA,
            data: DATA_CONSTANTS.MOVIE,
        };

        analytics.page = getPage(req);

        storeAnalytics(analytics);
    }
    catch (err){
        console.log(err);
    }
}

function storeUserUpdateBasicInfo(req) {

    try {
        // console.log(req.extras.url);
        var analytics = {
            // page                : req.extras.headers.referer,
            linkClicked: LINK_CONSTANTS.USER_UPDATE_BASIC_INFO,
            // section             : { type: String, trim: true, default: '' },
            userEmail: req.extras.user.email,
            type: req.extras.user.type,
            city: req.extras.user.city,
            state: req.extras.user.state,
            zip: req.extras.user.zip,
            sessionID: req.extras.sessionID,
            action: ACTION_CONSTANTS.BUTTON_CLICK,
        };

        analytics.page = getPage(req);

        storeAnalytics(analytics);
    }
    catch (err){
        console.log(err);
    }
}

function storeUserDeactivate(req) {

    try {
        // console.log(req.extras.url);
        var analytics = {
            // page                : req.extras.headers.referer,
            linkClicked: LINK_CONSTANTS.USER_DEACTIVATE,
            // section             : { type: String, trim: true, default: '' },
            userEmail: req.extras.user.email,
            type: req.extras.user.type,
            city: req.extras.user.city,
            state: req.extras.user.state,
            zip: req.extras.user.zip,
            sessionID: req.extras.sessionID,
            action: ACTION_CONSTANTS.BUTTON_CLICK,
        };

        analytics.page = getPage(req);

        storeAnalytics(analytics);
    }
    catch (err){
        console.log(err);
    }
}


function storeUserFetchPurchases(req) {

    try {
        // console.log(req.extras.url);
        var analytics = {
            // page                : req.extras.headers.referer,
            linkClicked: LINK_CONSTANTS.USER_FETCH_PURCHASES,
            // section             : { type: String, trim: true, default: '' },
            userEmail: req.extras.user.email,
            type: req.extras.user.type,
            city: req.extras.user.city,
            state: req.extras.user.state,
            zip: req.extras.user.zip,
            sessionID: req.extras.sessionID,
            action: ACTION_CONSTANTS.PAGE_LOAD,
        };

        analytics.page = getPage(req);

        storeAnalytics(analytics);
    }
    catch (err){
        console.log(err);
    }
}

function storeUserLogin(req) {

    try {
        // console.log(req.extras.url);
        var analytics = {
            // page                : req.extras.headers.referer,
            linkClicked: LINK_CONSTANTS.USER_LOGIN,
            // section             : { type: String, trim: true, default: '' },
            userEmail: req.email,
            action: ACTION_CONSTANTS.LOGIN,
        };

        analytics.page = getPage(req);

        storeAnalytics(analytics);
    }
    catch (err){
        console.log(err);
    }
}

function storeUserLogout(req) {

    try {
        // console.log(req.extras.url);
        var analytics = {
            // page                : req.extras.headers.referer,
            linkClicked: LINK_CONSTANTS.USER_LOOUT,
            // section             : { type: String, trim: true, default: '' },
            userEmail: req.extras.user.email,
            type: req.extras.user.type,
            city: req.extras.user.city,
            state: req.extras.user.state,
            zip: req.extras.user.zip,
            sessionID: req.extras.sessionID,
            action: ACTION_CONSTANTS.LOGIN,
        };

        analytics.page = getPage(req);

        storeAnalytics(analytics);
    }
    catch (err){
        console.log(err);
    }
}

function storeUserRegister(req) {

    try {
        // console.log(req.extras.url);
        var analytics = {
            // page                : req.extras.headers.referer,
            linkClicked: LINK_CONSTANTS.USER_REGISTER,
            // section             : { type: String, trim: true, default: '' },
            userEmail: req.extras.user.email,
            action: ACTION_CONSTANTS.BUTTON_CLICK,
        };

        analytics.page = getPage(req);

        storeAnalytics(analytics);
    }
    catch (err){
        console.log(err);
    }
}


function storeUserUpdateAddress(req) {

    try {
        // console.log(req.extras.url);
        var analytics = {
            // page                : req.extras.headers.referer,
            linkClicked: LINK_CONSTANTS.USER_UPDATE_ADDRESS,
            // section             : { type: String, trim: true, default: '' },
            userEmail: req.extras.user.email,
            type: req.extras.user.type,
            city: req.extras.user.city,
            state: req.extras.user.state,
            zip: req.extras.user.zip,
            sessionID: req.extras.sessionID,
            action: ACTION_CONSTANTS.BUTTON_CLICK,
        };

        analytics.page = getPage(req);

        storeAnalytics(analytics);
    }
    catch (err){
        console.log(err);
    }
}

function storeUserUpdatePayment(req) {

    try {
        // console.log(req.extras.url);
        var analytics = {
            // page                : req.extras.headers.referer,
            linkClicked: LINK_CONSTANTS.USER_UPDATE_PAYMENT,
            // section             : { type: String, trim: true, default: '' },
            userEmail: req.extras.user.email,
            type: req.extras.user.type,
            city: req.extras.user.city,
            state: req.extras.user.state,
            zip: req.extras.user.zip,
            sessionID: req.extras.sessionID,
            action: ACTION_CONSTANTS.BUTTON_CLICK,
        };

        analytics.page = getPage(req);

        storeAnalytics(analytics);
    }
    catch (err){
        console.log(err);
    }
}

function storeFetchMovies(req, movieDetail) {

    try {
        console.log("###extras:",req.extras);
        console.log("##movieDetail:",movieDetail);
        var analytics = {
            linkClicked: LINK_CONSTANTS.USER_FETCH_MOVIE_DETAIL,
            // section             : { type: String, trim: true, default: '' },
            userEmail: req.extras.user.email,
            type: req.extras.user.type,
            city: req.extras.user.city,
            state: req.extras.user.state,
            zip: req.extras.user.zip,
            sessionID: req.extras.sessionID,
            action: ACTION_CONSTANTS.BUTTON_CLICK,
            movieName : movieDetail.title, 
        };

        analytics.page = getPage(req);

        storeAnalytics(analytics);
    }
    catch (err){
        console.log(err);
    }
}

function storeUserSearchMovie(req) {


    try {
        // console.log(req.extras.url);
        var analytics = {
            // page                : req.extras.headers.referer,
            linkClicked         : LINK_CONSTANTS.USER_SEARCH_GO,
            // section             : { type: String, trim: true, default: '' },
            userEmail: req.extras.user.email,
            type: req.extras.user.type,
            city: req.extras.user.city,
            state: req.extras.user.state,
            zip: req.extras.user.zip,
            sessionID: req.extras.sessionID,
            action: ACTION_CONSTANTS.SEARCH,
            data: DATA_CONSTANTS.MOVIES,
        };

        analytics.page = getPage(req);

        storeAnalytics(analytics);
    }
    catch (err){
        console.log(err);
    }

}


function storeUserSearchHall(req) {


    try {
        // console.log(req.extras.url);
        var analytics = {
            // page                : req.extras.headers.referer,
            linkClicked             : LINK_CONSTANTS.USER_SEARCH_GO,
            // section             : { type: String, trim: true, default: '' },
            userEmail: req.extras.user.email,
            type: req.extras.user.type,
            city: req.extras.user.city,
            state: req.extras.user.state,
            zip: req.extras.user.zip,
            sessionID: req.extras.sessionID,
            action: ACTION_CONSTANTS.SEARCH,
            data: DATA_CONSTANTS.MOVIE_HALLS,
        };

        analytics.page = getPage(req);

        storeAnalytics(analytics);
    }
    catch (err){
        console.log(err);
    }

}

function storeUserPostReview(req) {


    try {
        // console.log(req.extras.url);
        var analytics = {
            // page                : req.extras.headers.referer,
            linkClicked             : LINK_CONSTANTS.USER_POST_REVIEW,
            // section             : { type: String, trim: true, default: '' },
            userEmail: req.extras.user.email,
            type: req.extras.user.type,
            city: req.extras.user.city,
            state: req.extras.user.state,
            zip: req.extras.user.zip,
            sessionID: req.extras.sessionID,
        };

        analytics.page = getPage(req);

        storeAnalytics(analytics);
    }
    catch (err){
        console.log(err);
    }

}

function storeUserCheckout(req) {


    try {
        // console.log(req.extras.url);
        var analytics = {
            // page                : req.extras.headers.referer,
            linkClicked             : LINK_CONSTANTS.USER_MOVIE_TIME_SELECTED,
            // section             : { type: String, trim: true, default: '' },
            userEmail: req.extras.user.email,
            type: req.extras.user.type,
            city: req.extras.user.city,
            state: req.extras.user.state,
            zip: req.extras.user.zip,
            sessionID: req.extras.sessionID,
        };

        analytics.page = getPage(req);

        storeAnalytics(analytics);
    }
    catch (err){
        console.log(err);
    }

}

function storeUserBookMovie(req) {


    try {
        // console.log(req.extras.url);
        var analytics = {
            // page                : req.extras.headers.referer,
            linkClicked             : LINK_CONSTANTS.USER_MOVIE_BOOK,
            // section             : { type: String, trim: true, default: '' },
            userEmail: req.extras.user.email,
            type: req.extras.user.type,
            city: req.extras.user.city,
            state: req.extras.user.state,
            zip: req.extras.user.zip,
            sessionID: req.extras.sessionID,
        };

        analytics.page = getPage(req);

        storeAnalytics(analytics);
    }
    catch (err){
        console.log(err);
    }

}

function getPage(req){
    //pagename
    let url = URL.parse(req.extras.headers.referer);
    let page=url.pathname;

    let temp =page.substr(page.lastIndexOf('/') + 1);
    // console.log(temp);

    let stringId = temp.toString().toLowerCase();

    if (ObjectId.isValid(stringId) && new ObjectId(stringId).toString() === stringId) {
        page = page.replace("/"+temp,"");
        // console.log("removedid");
    }

    //check integer ids
    temp =page.substr(page.lastIndexOf('/') + 1);

    stringId = temp.toString().toLowerCase();

    if (isNaN(stringId)===false) {
        page = page.replace("/"+temp,"");
        // console.log("removedid");
    }

    //check email
    temp =page.substr(page.lastIndexOf('/') + 1);

    stringId = temp.toString().toLowerCase();

    if (validateEmail(stringId)===true) {
        page = page.replace("/"+temp,"");
    }

    if(page.lastIndexOf('?')>=0)
        page = page.substr(0,page.lastIndexOf('?')+1);

    return page;
}

function storeAnalytics(analytics){
    new Analytics(analytics)
        .save()
        .then(analytic => {
            console.log("stored analytic");
            console.log(analytic);

        })
        .catch(error => {
            console.log("stored analytic error");
            console.log(error);
        });
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const PAGE_CONSTANTS={
    ADMIN_MOVIE_SEARCH_PAGE:"/admin/movies",
    ADMIN_ADD_MOVIE_PAGE:"/admin/addmovie",
    ADMIN_ADD_MOVIE_HALL_PAGE:"/admin/addHall",
    ADMIN_EDIT_MOVIE_HALL_PAGE:"/admin/edit_moviehalls",
    ADMIN_EDIT_MOVIE_PAGE:"/admin/edit_movie",
    ADMIN_EDIT_USER_PAGE:"/admin/edit_user",
    ADMIN_USER_SEARCH_PAGE:"/admin/users",

    HALL_ADMIN_DASHBOARD_PAGE:"/halladmin",

    USER_MY_PROFILE:"/MyProfile",
    MANAGE_BOOKINGS:"/ManageBookings",
    LOGIN:"/signin",
    USER_REGISTER:"/signup",

    USER_STATIC_PROFILE_PAGE:'/users'

}

const ACTION_CONSTANTS={
    PAGE_LOAD:'PAGE LOAD',
    BUTTON_CLICK:'BUTTON CLICK',
    LOAD_DATA:'LOAD DATA',
    LOGIN:'LOGIN',
    LOGOUT:'LOGOUT',
    SEARCH:'SEARCH',


}

const LINK_CONSTANTS={
    ADMIN_ADD_MOVIE:"ADMIN ADD MOVIE",
    ADMIN_ADD_MOVIE_HALL:"ADMIN ADD MOVIE HALL",
    ADMIN_EDIT_MOVIE_HALL:"ADMIN EDIT MOVIE HALL",
    ADMIN_EDIT_MOVIE:"ADMIN EDIT MOVIE",
    ADMIN_EDIT_USER:"ADMIN EDIT MOVIE",

    HALL_ADMIN_EDIT_MOVIE_HALL:"HALL ADMIN EDIT MOVIE HALL",

    USER_UPDATE_BASIC_INFO:"USER UPDATE BASIC INFO",
    USER_DEACTIVATE:"USER DEACTIVATE",
    USER_FETCH_PURCHASES:"USER FETCH PURCHASES",
    USER_LOGIN:"USER LOGIN",
    USER_LOOUT:"USER LOGOUT",
    USER_REGISTER:"USER REGISTER",
    USER_UPDATE_ADDRESS:"USER UPDATE ADDRESS",
    USER_UPDATE_PAYMENT:"USER UPDATE PAYMENT",
    USER_FETCH_MOVIE_DETAIL:"USER FETCH MOVIE DETAIL",

    USER_SEARCH_GO:"USER_SEARCH_GO",
    USER_POST_REVIEW:"USER POST REVIEW",
    USER_MOVIE_TIME_SELECTED:"USER MOVIE TIME SELECTED",
    USER_MOVIE_BOOK:"USER BOOK MOVIE"

}

const DATA_CONSTANTS={
    MOVIES:"MOVIES",
    USERS:"USERS",
    USER:"USER",
    MOVIE:"MOVIE",
    MOVIE_HALLS:"MOVIE HALLS",
    HALL_ADMIN_MOVIE_HALL:"HALL ADMIN MOVIE HALL",
}