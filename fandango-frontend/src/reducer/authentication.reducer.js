import {userConstants} from '../helper/constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = {
    loggedIn:false,
    loadingAuth:false,
    user:{},
    checkout: {}
};
// const initialState = user ? {loggedIn: true, user} : {loggedIn:false};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                user: action.user
            };
        case userConstants.USER_AUTH_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                loadingAuth: false,
                user: action.user
            };
        case userConstants.USER_AUTH_FAILURE:
            return {
                ...state,
                loggedIn: false,
                loadingAuth: false,
                user: {}
            };

        case userConstants.USER_AUTH_REQUEST:
            return {
                ...state,
                loadingAuth: true,
                user: {}
            };
        case userConstants.LOGIN_FAILURE:
            return {};
        case userConstants.USER_LOGOUT_SUCCESS:
            console.log('logged out in reducer');
            return {
                ...state,
                loggedIn: false,
                user: {}
            };
        case userConstants.USER_MOVIE_CHECKOUT_SUCCESS:
            return {
                ...state,
                checkout: action.checkout
            };


        // case userConstants.USER_LOGOUT_FAILURE:
        //     return {
        //         ...state,
        //         loggedIn: false,
        //         user: {}
        //     };
        //
        // case userConstants.USER_LOGOUT_REQUEST:
        //     return {
        //         ...state,
        //
        //         user: {}
        //     };
        default:
            return state
    }
}