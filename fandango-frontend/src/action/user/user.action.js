import { userConstants }    from "../../helper/constants";
import {RESTService} from "../../api/index";
import {alertActions} from "../alert/alert.action";
import {history} from '../../helper/others/history.js';

export const userActions = {
    fetchUser,
    signup,
    login,
    authenticateUser,
    logout
};

function fetchUser(user) {
    return {
        type    : userConstants.FETCH_USER,
        user    : user
    };
}

function login(username, password) {
    return dispatch => {
        //dispatch(request({username}));

        RESTService.login(username, password)
            .then(
                user1 => {
                    console.log("user");
                    console.log(user1);
                    dispatch(success(user1.data.user));  //updated format
                    // dispatch({type: "HOME"});
                    const {user} = user1.data;

                    localStorage.setItem('email',user.email);
                    localStorage.setItem('type',user.type);

                    if(user && user.type==='NORMAL')
                        history.push('/home');  //home page after login
                    else if(user && user.type==='HALL_OWNER')
                        history.push('/halladmin');
                    else if(user && user.type==='ADMIN')
                        history.push('/admin/dashboard');
                },
                error => {
                    console.log(error);
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.data));
                }
            );
    };

    function request(user) {
        return {type: "USERS_LOGIN_REQUEST", user}
    }

    function success(user) {
        return {type: "USERS_LOGIN_SUCCESS", user}
    }

    function failure(error) {
        return {type: "USERS_LOGIN_FAILURE", error}
    }
}


function logout () {

    return dispatch => {

        RESTService.logout()
            .then(
                response => {
                    console.log(response.data);
                    dispatch(alertActions.success(response.data));
                    dispatch({type:userConstants.USER_LOGOUT_SUCCESS});

                    localStorage.removeItem('email');
                    localStorage.removeItem('type');

                    history.push('/signin');
                },
                error => {
                    console.log(error.data.message);
                }
            );
    };
}

function signup(user) {
    return (dispatch) => {
        // dispatch(request(user));

        RESTService.signup(user)
            .then(
                user => {
                    //dispatch(success());
                    dispatch(alertActions.success(user.data));
                    history.push('/signin');

                },
                error => {
                    console.log(error);
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.data));

                }
            );
    };

    //  function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    // function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) {
        return {type: userConstants.REGISTER_FAILURE, error}
    }
}

function authenticateUser () {
    return dispatch => {
        dispatch(request({}));

        RESTService.authenticateUser()
            .then(
                user => {
                    console.log("user");
                    console.log(user);
                    dispatch(success(user.data.user));  //updated format
                },
                error => {
                    console.log(error);
                    dispatch(failure(error));
                    // dispatch(alertActions.error(error.data));
                }
            );
    };

    function success(user) {
        return {type: "USER_AUTH_SUCCESS", user}
    }

    function request(data) {
        return {type: userConstants.USER_AUTH_REQUEST, data}
    }

    function failure(error) {
        return {type: "USER_AUTH_FAILURE", error}
    }


}