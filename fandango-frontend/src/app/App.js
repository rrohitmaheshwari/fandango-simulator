import React, {Component} from 'react'                                           ;
import {Router, Route} from    'react-router-dom'                                ;
import {history} from          "../helper/others/history"                        ;
import                         './App.css'                                       ;
import AccountPage from        "../components/user/AccountPage"                  ;
import HomePage from           "../components/user/HomePage"                     ;
import MovieSearchPage from    "../components/user/MoviesSearchPage"             ;
import AddMovie from           "../components/admin/AddMovie"                    ;
import AddHall from            "../components/admin/AddHall"                     ;
import Dashboard from          "../components/admin/Dashboard"                   ;
import SignInPage from         "../components/SignIn/SignInPage"                 ;
import SignUpPage from         "../components/SignUp/SignUpPage"                 ;
import MovieSearch from        "../components/admin/MovieSearch"                 ;
import MyProfile from          "../components/user/MyProfile"                    ;
import MovieDetailsPage from   "../components/movie/MovieDetailsPage"            ;
import Alert from              "react-s-alert"                                   ;
import                         'react-s-alert/dist/s-alert-default.css'          ;
import                         'react-s-alert/dist/s-alert-css-effects/slide.css';
import MovieHallSearch from "../components/admin/MovieHallSearch";
import MovieHallEdit from "../components/admin/MovieHallEdit";
import HallAdminDashboard from "../components/halladmin/HallAdminDashboard";
import EditMovie from "../components/admin/EditMovie";
import ManageBookings from '../components/halladmin/ManageBookings';
import UserSearch from "../components/admin/UserSearch";
import UserEdit from "../components/admin/UserEdit";
import UserProfile from "../components/user/UserProfile";
import {userActions} from "../action/user/user.action";
import MovieTimesPage from "../components/movie/MovieTimesPage";
import {connect} from 'react-redux';
import HallAdminRevenue from "../components/halladmin/HallAdminRevenue";
import AdminRevenue from "../components/admin/AdminRevenue";
import MovieCheckoutPage from "../components/movie/MovieCheckoutPage";
// import MovieTimesPage from "../components/movie/MovieTimesPage";

class App extends Component {


    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
        });

    }

    componentWillMount() {
        // Check if user is authenticated.
        this.props.authenticateUser();
    }

    render() {

        const {user} = this.props;
        const {loadingAuth} = this.props;
        console.log("loading:",loadingAuth);
        console.log("user:",user);
        console.log("loggedin:",this.isLoggedIn());

        return (
            <div>
                <Router history={history}>
                    <div>
                        <Route exact path="/" render={() => {
                            this.redirectLogin();
                            return null;
                        }}/>

                        <Route exact path="/signin" render={() => {
                            if (this.isLoggedIn()) {
                                this.redirectHome();
                                return null;
                            }
                            return <SignInPage/>
                        }}/>

                        <Route exact path="/signup" render={() => {
                            if (!this.isLoggedIn()) {
                                return <SignUpPage/>
                            }
                            this.redirectHome()
                            return null;
                        }}/>




                        {/*user */}
                        <Route exact path="/home" render={() => {
                            if (!this.isLoggedIn() || (this.isLoggedIn() && !this.isNormalUser())) {
                                this.redirectLogin()
                                return null;
                            }
                            return <HomePage/>
                        }}/>


                        <Route exact path="/movie-detail" render={() => {
                            if (!this.isLoggedIn() || (this.isLoggedIn() && !this.isNormalUser())) {
                                this.redirectLogin()
                                return null;
                            }
                            return <MovieDetailsPage/>
                        }}/>


                        <Route exact path="/movie-times" render={() => {
                            if (!this.isLoggedIn() || (this.isLoggedIn() && !this.isNormalUser())) {
                                this.redirectLogin()
                                return null;
                            }
                            return <MovieTimesPage/>
                        }}/>

                        <Route exact path="/movie-checkout" render={() => {
                            if (!this.isLoggedIn() || (this.isLoggedIn() && !this.isNormalUser())) {
                                this.redirectLogin()
                                return null;
                            }
                            return <MovieCheckoutPage/>
                        }}/>

                        <Route startswith path="/movies" render={() => {
                            if (!this.isLoggedIn() || (this.isLoggedIn() && !this.isNormalUser())) {
                                this.redirectLogin()
                                return null;
                            }
                            return <MovieSearchPage/>
                        }}/>

                        <Route exact path="/MyProfile" render={() => {
                            if (!this.isLoggedIn() || (this.isLoggedIn() && !this.isNormalUser())) {
                                this.redirectLogin()
                                return null;
                            }
                            return <MyProfile/>

                        }}/>


                        {/*admin*/}
                        <Route exact path="/admin/addmovie" render={() => {

                            if (!this.isLoggedIn() || (this.isLoggedIn() && !this.isAdmin())) {
                                this.redirectLogin()
                                return null
                            }
                                return <AddMovie/>
                        }}/>
                        <Route exact path="/admin/addhall" render={() => {
                            if (!this.isLoggedIn() || (this.isLoggedIn() && !this.isAdmin())) {
                                this.redirectLogin()
                                return null;
                            }
                            return <AddHall/>
                        }}/>
                        <Route exact path="/admin/dashboard" render={() => {
                            if (!this.isLoggedIn() || (this.isLoggedIn() && !this.isAdmin())) {
                                this.redirectLogin()
                                return null;
                            }
                            return <Dashboard/>

                        }}/>
                        <Route exact path="/admin/movies" render={() => {
                            if (!this.isLoggedIn() || (this.isLoggedIn() && !this.isAdmin())) {
                                this.redirectLogin()
                                return null;
                            }
                            return <MovieSearch/>
                        }}/>
                        <Route exact path="/admin/moviehalls" render={() => {
                            if (!this.isLoggedIn() || (this.isLoggedIn() && !this.isAdmin())) {
                                this.redirectLogin()
                                return null;
                            }

                            return <MovieHallSearch/>
                        }}/>
                        <Route exact path="/admin/edit_moviehalls/:hallId?" render={() => {

                            if (!this.isLoggedIn() || (this.isLoggedIn() && !this.isAdmin())) {
                                this.redirectLogin()
                                return null;
                            }

                            return <MovieHallEdit/>
                        }}/>
                        <Route exact path="/admin/edit_movie/:movieId" render={(props) => {
                            if (!this.isLoggedIn() || (this.isLoggedIn() && !this.isAdmin())) {
                                this.redirectLogin()
                                return null;
                            }
                            return <EditMovie/>
                        }}/>
                        <Route exact path="/admin/users" render={() => {
                            if (!this.isLoggedIn() || (this.isLoggedIn() && !this.isAdmin())) {
                                this.redirectLogin()
                                return null;
                            }
                            return <UserSearch/>
                        }}/>
                        <Route exact path="/admin/edit_user/:userId?" render={() => {
                            if (!this.isLoggedIn() || (this.isLoggedIn() && !this.isAdmin())) {
                                this.redirectLogin()
                                return null;
                            }
                            return <UserEdit/>
                        }}/>
                        <Route exact path="/admin/revenue" render={() => {
                            if (!this.isLoggedIn() || (this.isLoggedIn() && !this.isAdmin())) {
                                this.redirectLogin()
                                return null;
                            }
                            return <AdminRevenue/>
                        }}/>

                        {/*hall admin routes*/}
                        <Route exact path="/halladmin" render={() => {
                            if (!this.isLoggedIn() || (this.isLoggedIn() && !this.isHallOwner())) {
                                this.redirectLogin()
                                return null;
                            }
                            return <HallAdminDashboard/>

                        }}/>
                        <Route exact path="/halladmin/revenue" render={() => {
                            if (!this.isLoggedIn() || (this.isLoggedIn() && !this.isHallOwner())) {
                                this.redirectLogin()
                                return null;
                            }
                            return <HallAdminRevenue/>
                        }}/>

                        {/*common*/}
                        <Route exact path="/users/:email" render={() => {
                            if (!this.isLoggedIn()) {
                                this.redirectLogin()
                                return null;
                            }
                            return <UserProfile/>

                        }}/>
                        <Route exact path="/ManageBookings" render={() => {
                            if (!this.isLoggedIn()) {
                                this.redirectLogin()
                                return null;
                            }
                            return <ManageBookings/>
                        }}/>

                    </div>
                </Router>
                < Alert stack={{limit: 3}} />
            </div>
        );
    }


    redirectHome(){

        const {user} = this.props;

        let type = localStorage.getItem('type');

        if(type && type==='NORMAL'){
            history.push('/home')
            // return <HomePage/>
        }

        else if(type && type==='HALL_OWNER'){
            history.push('/halladmin')
            // return <HallAdminDashboard/>
        }

        else if(type && type==='ADMIN'){
            // return <Dashboard/>
            history.push('/admin/dashboard')
        }

        return null;
    }

    isNormalUser(){
        const {user} = this.props;
        let type = localStorage.getItem('type');

        // if(user && user.type==='NORMAL'){
        //     return true;
        // }

        if(type && type==='NORMAL')
            return true;

        return false;
    }

    isAdmin(){
        const {user} = this.props;

        let type = localStorage.getItem('type');

        // if(user && user.type==='ADMIN'){
        //     return true;
        // }

        if(type && type==='ADMIN')
            return true;

        return false;
    }

    isHallOwner(){
        const {user} = this.props;
        let type = localStorage.getItem('type');
        //
        // if(user && user.type==='HALL_OWNER'){
        //     return true;
        // }

        if(type && type==='HALL_OWNER')
            return true;

        return false;
    }


    redirectLogin(){
        // return <SignInPage/>
        return history.push('/signin')
    }

    isLoggedIn(){
        // const {user,loggedIn} = this.props;
        // console.log("logged in checking:",loggedIn)
        // return loggedIn;

        return localStorage.getItem('email') !== null
    }

}

function mapStateToProps(state) {

    const { user,loggedIn,loadingAuth } = state.authentication;
    return {
        user,
        loggedIn,
        loadingAuth,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        authenticateUser    : () => dispatch(userActions.authenticateUser()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
