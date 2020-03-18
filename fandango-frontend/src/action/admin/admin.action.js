import { adminConstants }    from "../../helper/constants";
import {RESTService} from "../../api/index";
import {history} from '../../helper/others/history.js';
import {alertActions} from "../alert/alert.action";

export const adminActions = {
    getMovies,
    addHall,
    getMovieHalls,
    editHall,
    addMovie,
    editMovie,
    getMovie,
    getNormalUsers,
    editUser,
    getRevenue,
};


function getMovies() {
    return (dispatch) => {
        dispatch(request({data:""}));

        RESTService.getAdminMovies()
            .then(
                payload => {

                    console.log("get movies return")
                    console.log(payload)
                    dispatch(success(payload.data))
                    dispatch(alertActions.clear());
                },
                error => {
                    console.log(error);
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.data));

                }
            );
    };

    function failure(error) {
        return {type: adminConstants.GET_MOVIES_FAILURE, error}
    }
    function request(data) {
        return {type: adminConstants.GET_MOVIES_REQUEST, data}
    }
    function success(result) {
        return {type: adminConstants.GET_MOVIES_SUCCESS, result}
    }
}

function addHall(hall) {
    return (dispatch) => {
        dispatch(request({data:""}));

        RESTService.addHall(hall)
            .then(
                payload => {

                    console.log("add hall return")
                    console.log(payload)
                    dispatch(success(payload.data))
                    dispatch(alertActions.success(payload.data));
                },
                error => {
                    console.log(error);
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.data));

                }
            );
    };

    function failure(error) {
        return {type: adminConstants.ADD_MOVIE_HALL_FAILURE, error}
    }
    function request(data) {
        return {type: adminConstants.ADD_MOVIE_HALL_REQUEST, data}
    }
    function success(result) {
        return {type: adminConstants.ADD_MOVIE_HALL_SUCCESS, result}
    }
}

function editHall(hall,id) {
    return (dispatch) => {
        dispatch(request({data:""}));

        RESTService.editHall(hall,id)
            .then(
                payload => {

                    console.log("update hall return")
                    console.log(payload)
                    dispatch(success(payload.data))
                    dispatch(alertActions.success(payload.data));
                },
                error => {
                    console.log(error);
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.data));

                }
            );
    };

    function failure(error) {
        return {type: adminConstants.EDIT_MOVIE_HALL_FAILURE, error}
    }
    function request(data) {
        return {type: adminConstants.EDIT_MOVIE_HALL_REQUEST, data}
    }
    function success(result) {
        return {type: adminConstants.EDIT_MOVIE_HALL_SUCCESS, result}
    }
}

function getMovieHalls() {
    return (dispatch) => {
        dispatch(request({data:""}));

        RESTService.getAdminMovieHalls()
            .then(
                payload => {

                    console.log("get movie halls return")
                    console.log(payload)
                    dispatch(success(payload.data))
                    dispatch(alertActions.clear());
                },
                error => {
                    console.log(error);
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.data));

                }
            );
    };

    function failure(error) {
        return {type: adminConstants.GET_MOVIE_HALLS_FAILURE, error}
    }
    function request(data) {
        return {type: adminConstants.GET_MOVIE_HALLS_REQUEST, data}
    }
    function success(result) {
        return {type: adminConstants.GET_MOVIE_HALLS_SUCCESS, result}
    }
}

function addMovie(movie) {
    return (dispatch) => {
        dispatch(request({data:""}));

        RESTService.addMovie(movie)
            .then(
                payload => {

                    console.log("add movie return")
                    console.log(payload)
                    dispatch(success(payload.data))
                    dispatch(alertActions.success(payload.data));
                },
                error => {
                    console.log(error);
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.data));

                }
            );
    };

    function failure(error) {
        return {type: adminConstants.ADD_MOVIE_FAILURE, error}
    }
    function request(data) {
        return {type: adminConstants.ADD_MOVIE_REQUEST, data}
    }
    function success(result) {
        return {type: adminConstants.ADD_MOVIE_SUCCESS, result}
    }
}

function getMovie(id) {
    return (dispatch) => {
        dispatch(request({data:""}));

        RESTService.getAdminMovie(id)
            .then(
                payload => {

                    console.log("get movie return")
                    console.log(payload)
                    dispatch(success(payload.data))
                    dispatch(alertActions.clear());
                },
                error => {
                    console.log(error);
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.data));

                }
            );
    };

    function failure(error) {
        return {type: adminConstants.GET_MOVIE_FAILURE, error}
    }
    function request(data) {
        return {type: adminConstants.GET_MOVIE_REQUEST, data}
    }
    function success(result) {
        return {type: adminConstants.GET_MOVIE_SUCCESS, result}
    }
}

function editMovie(movie,id) {
    return (dispatch) => {
        dispatch(request({data:""}));

        RESTService.editMovie(movie,id)
            .then(
                payload => {

                    console.log("edit movie return")
                    console.log(payload)
                    dispatch(success(payload.data))
                    dispatch(alertActions.success(payload.data));
                },
                error => {
                    console.log(error);
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.data));

                }
            );
    };

    function failure(error) {
        return {type: adminConstants.EDIT_MOVIE_FAILURE, error}
    }
    function request(data) {
        return {type: adminConstants.EDIT_MOVIE_REQUEST, data}
    }
    function success(result) {
        return {type: adminConstants.EDIT_MOVIE_SUCCESS, result}
    }
}

function getNormalUsers() {
    return (dispatch) => {
        dispatch(request({data:""}));

        RESTService.getAdminNormalUsers()
            .then(
                payload => {

                    console.log("get users normal return")
                    // console.log(payload)
                    dispatch(success(payload.data))
                    dispatch(alertActions.clear());
                },
                error => {
                    console.log(error);
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.data));

                }
            );
    };

    function failure(error) {
        return {type: adminConstants.GET_NORMAL_USERS_FAILURE, error}
    }
    function request(data) {
        return {type: adminConstants.GET_NORMAL_USERS_REQUEST, data}
    }
    function success(result) {
        return {type: adminConstants.GET_NORMAL_USERS_SUCCESS, result}
    }
}

function editUser(user,id) {
    return (dispatch) => {
        dispatch(request({data:""}));

        RESTService.adminEditUser(user,id)
            .then(
                payload => {

                    console.log("admin update user return")
                    console.log(payload)
                    dispatch(success(payload.data))
                    dispatch(alertActions.success(payload.data));
                },
                error => {
                    console.log(error);
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.data));

                }
            );
    };

    function failure(error) {
        return {type: adminConstants.EDIT_NORMAL_USER_FAILURE, error}
    }
    function request(data) {
        return {type: adminConstants.EDIT_NORMAL_USER_REQUEST, data}
    }
    function success(result) {
        return {type: adminConstants.EDIT_NORMAL_USER_SUCCESS, result}
    }
}


function getRevenue(user,id) {
    return (dispatch) => {
        dispatch(request({data:""}));

        RESTService.getAdminRevenue()
            .then(
                payload => {

                    console.log("admin revenue return")
                    console.log(payload)
                    dispatch(success(payload.data))
                    dispatch(alertActions.success(payload.data));
                },
                error => {
                    console.log(error);
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.data));

                }
            );
    };

    function failure(error) {
        return {type: adminConstants.GET_REVENUE_FAILURE, error}
    }
    function request(data) {
        return {type: adminConstants.GET_REVENUE_REQUEST, data}
    }
    function success(result) {
        return {type: adminConstants.GET_REVENUE_SUCCESS, result}
    }
}