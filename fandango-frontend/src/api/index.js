import axios from 'axios';

const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3000'


axios.defaults.withCredentials = true;

export const RESTService = {
    signup,
    getAdminMovies,
    login,
    logout,
    addHall,
    addMovie,
    getAdminMovieHalls,
    editHall,
    getHallAdminData,
    editHallAdmin,
    editMovie,
    getAdminMovie,
    getAdminNormalUsers,
    adminEditUser,
    saveProfileImage,
    saveBasicInfo,
    saveAddressInfo,
    saveCardInfo,    
    searchMovieTitle,
    searchHallTitle,
    fetchMovieDetails,
    fetchHallsByMovieDetails,
    fetchBookings,
    cancelBookings,
    deleteUser,
    saveReview,
    authenticateUser,
    logout,
    getOtherUserDetails,
    top_ten_movies,
    top_ten_city,
    top_ten_hall,
    top_ten_pages,
    movies_clicks,
    less_seen_Area,
    reviews_on_movies,
    trace_user,
    fetchCheckoutDetails,
    bookMovie,
    getHallAdminRevenue,
    getAdminRevenue,
    deleteAdminUser
};

function bookMovie (bookMovieInfo) {
    let bookMovieDetailsUrl   = api + '/users/bookmovie';
    return axiosPost(bookMovieDetailsUrl, bookMovieInfo);
}

function fetchCheckoutDetails (checkoutDetails) {
    let fetchCheckoutDetailsUrl   = api + '/users/checkoutDetails';
    return axiosPost(fetchCheckoutDetailsUrl, checkoutDetails);
}

function logout () {
    let logoutUrl   = api + '/users/logout';
    return axiosPost(logoutUrl, null);
}

function authenticateUser () {
    let authenticateUserUrl = api + '/users/authenticateUser';
    return axiosPost(authenticateUserUrl, null);
}

function saveReview(movieReview) {
    let saveReviewUrl = api + '/users/saveReview';
    return axiosPost(saveReviewUrl, movieReview);
}


function fetchMovieDetails(movie_id) {
    let fetchMovie = api + '/details/fetchMovie';
    return axiosPost(fetchMovie, movie_id);
}

function fetchHallsByMovieDetails(movie_id) {
    let fetchMovieHalls = api + '/details/fetchMovieHalls';
    return axiosPost(fetchMovieHalls, movie_id);
}

function login(username, password) {
    let user = {
        email:username,
        password:password
    }
    let userSignIn = api + '/users/login';
    return axiosPost(userSignIn, user);
}

function signup(user) {
    let userSignUp = api + '/users/register';
    return axiosPost(userSignUp, user);
}


function getAdminMovies() {
    let url = api+"/admin/movies"
    return axios.get(url)
        .then(handleSuccess)
        .catch(handleError)
}

function getAdminMovieHalls() {
    let url = api+"/admin/halls"
    return axios.get(url)
        .then(handleSuccess)
        .catch(handleError)
}

function getAdminMovie(id) {
    let url = api+"/admin/movies/"+id;
    return axios.get(url)
        .then(handleSuccess)
        .catch(handleError)
}

function addHall(hall) {
    let addhall = api + '/admin/halls';
    return axiosPost(addhall, hall);
}

function addMovie(movie) {
    let addmovie = api + '/admin/movies';
    return axiosPost(addmovie, movie);
}

function editHall(hall,id) {
    let updatehall = api + '/admin/halls/'+id;
    return axiosPut(updatehall, hall);
}

function getHallAdminData() {
    let url = api+"/halladmin/"
    return axios.get(url)
        .then(handleSuccess)
        .catch(handleError)
}

function editHallAdmin(hall) {
    let edithall = api + '/halladmin/';
    return axiosPut(edithall, hall);
}

function editMovie(movie,id) {
    let updatemovie = api + '/admin/movies/'+id;
    return axiosPut(updatemovie, movie);
}

function saveProfileImage(profileImage) {
    let updateImage = api + '/users/saveProfileImage';
    return axiosPost(updateImage, profileImage);
}

function saveBasicInfo(userInfo) {
    let updateUserInfo = api + '/users/updateInfo';
    return axiosPost(updateUserInfo, userInfo);
}

function saveAddressInfo(userAddressInfo) {
    let updateUserAddress = api + '/users/updateAddress';
    return axiosPost(updateUserAddress, userAddressInfo);
}

function saveCardInfo(userCardInfo) {
    let updatePayment = api + '/users/updateCard';
    return axiosPost(updatePayment, userCardInfo);
}

function deleteUser() {
    let deleteUser = api + '/users/delete';
    return axiosPost(deleteUser, {} );
}

function deleteAdminUser(email) {
    let deleteAdminUser = api + '/users/adminDelete';
    return axiosPost(deleteAdminUser, email );
}
function fetchBookings() {
    let fetchBookingURL = api + '/halladmin/fetchBookings';
    return axios.get( fetchBookingURL )
                .then( handleSuccess )
                .catch( handleError );
}

function cancelBookings(booking_id) {
    let cancelBooking = api + '/halladmin/cancelBooking';
    return axiosPost(cancelBooking, booking_id);
}

function axiosPost(url, data) {
    return axios.post(url, data)
        .then(handleSuccess)
        .catch(handleError);
}

function getAdminNormalUsers() {
    let url = api+"/admin/users"
    return axios.get(url)
        .then(handleSuccess)
        .catch(handleError)
}

function adminEditUser(user,id) {
    let url = api + '/admin/users/'+id;
    return axiosPut(url, user);
}

function getHallAdminRevenue() {
    let url = api+"/halladmin/revenue"
    return axios.get(url)
        .then(handleSuccess)
        .catch(handleError)
}

function getAdminRevenue() {
    let url = api+"/admin/revenue"
    return axios.get(url)
        .then(handleSuccess)
        .catch(handleError)
}

function axiosPut(url, data) {
    return axios.put(url, data)
        .then(handleSuccess)
        .catch(handleError);
}

function searchMovieTitle(data) {

    let url = api+"/users/searchMovie?movieName="+data;
    return axios.get(url)
        .then(handleSuccess)
        .catch(handleError)
}
function searchHallTitle(req) {
    let url = api+"/users/searchHall?hallName="+req;
    return axios.get(url)
        .then(handleSuccess)
        .catch(handleError)
}


function top_ten_movies() {
    let url = api+"/dashboard/top_ten_movies";
    return axios.get(url)
        .then(handleSuccess)
        .catch(handleError)
}

function top_ten_city() {
    let url = api+"/dashboard/top_ten_city";
    return axios.get(url)
        .then(handleSuccess)
        .catch(handleError)
}



function top_ten_hall() {
    let url = api+"/dashboard/top_ten_hall";
    return axios.get(url)
        .then(handleSuccess)
        .catch(handleError)
}



function top_ten_pages() {
    let url = api+"/dashboard/top_ten_pages";
    return axios.get(url)
        .then(handleSuccess)
        .catch(handleError)
}


function movies_clicks(){
    let url = api+"/dashboard/movies_clicks";
    return axios.get(url)
        .then(handleSuccess)
        .catch(handleError)
}


function less_seen_Area(){
let url = api+"/dashboard/less_seen_Area";
return axios.get(url)
    .then(handleSuccess)
    .catch(handleError)
}




function reviews_on_movies(){
    let url = api+"/dashboard/reviews_on_movies";
    return axios.get(url)
        .then(handleSuccess)
        .catch(handleError)
}




function trace_user(email){
    let url = api+"/dashboard/trace_user?email="+email;
    return axios.get(url)
        .then(handleSuccess)
        .catch(handleError)
}

function handleSuccess(response) {
    return response;
}

function handleError(error) {
    if (error.response) {
        return Promise.reject(error.response);
    }
}

function getOtherUserDetails(email) {

    let url = api+"/users/getOtherUser/"+email;
    return axios.get(url)
        .then(handleSuccess)
        .catch(handleError)
}
