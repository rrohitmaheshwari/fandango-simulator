import { adminConstants }    from "../../helper/constants/index";
import {RESTService} from "../../api/index";
import {history} from '../../helper/others/history.js';
import {alertActions} from "../alert/alert.action";
import {hallAdminConstants} from "../../helper/constants";

export const hallAdminActions = {
    getMovies,
    getHallData,
    editHall,
    getRevenue,
};


function getMovies() {
    return (dispatch) => {
        dispatch(request({data:""}));

        RESTService.getAdminMovies()
            .then(
                payload => {

                    console.log("hall admin get movies return")
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
        return {type: hallAdminConstants.GET_MOVIES_FAILURE, error}
    }
    function request(data) {
        return {type: hallAdminConstants.GET_MOVIES_REQUEST, data}
    }
    function success(result) {
        return {type: hallAdminConstants.GET_MOVIES_SUCCESS, result}
    }
}

// function addHall(hall) {
//     return (dispatch) => {
//         dispatch(request({data:""}));
//
//         RESTService.addHall(hall)
//             .then(
//                 payload => {
//
//                     console.log("add hall return")
//                     console.log(payload)
//                     dispatch(success(payload.data))
//                     dispatch(alertActions.success('Registration successful'));
//                 },
//                 error => {
//                     console.log(error);
//                     dispatch(failure(error));
//                     dispatch(alertActions.error(error.data));
//
//                 }
//             );
//     };
//
//     function failure(error) {
//         return {type: adminConstants.ADD_MOVIE_HALL_FAILURE, error}
//     }
//     function request(data) {
//         return {type: adminConstants.ADD_MOVIE_HALL_REQUEST, data}
//     }
//     function success(result) {
//         return {type: adminConstants.ADD_MOVIE_HALL_SUCCESS, result}
//     }
// }
//
function editHall(hall) {
    return (dispatch) => {
        dispatch(request({data:""}));

        RESTService.editHallAdmin(hall)
            .then(
                payload => {

                    console.log("edit hall return")
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
        return {type: hallAdminConstants.EDIT_MOVIE_HALL_FAILURE, error}
    }
    function request(data) {
        return {type: hallAdminConstants.EDIT_MOVIE_HALL_REQUEST, data}
    }
    function success(result) {
        return {type: hallAdminConstants.EDIT_MOVIE_HALL_SUCCESS, result}
    }
}

function getHallData() {
    return (dispatch) => {
        dispatch(request({data:""}));

        RESTService.getHallAdminData()
            .then(
                payload => {

                    console.log("get movie hall data return")
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
        return {type: hallAdminConstants.GET_HALL_DATA_FAILURE, error}
    }
    function request(data) {
        return {type: hallAdminConstants.GET_HALL_DATA_REQUEST, data}
    }
    function success(result) {
        return {type: hallAdminConstants.GET_HALL_DATA_SUCCESS, result}
    }
}


function getRevenue() {
    return (dispatch) => {
        dispatch(request({data:""}));

        RESTService.getHallAdminRevenue()
            .then(
                payload => {

                    console.log("get hall admin revenue return")
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
        return {type: hallAdminConstants.GET_REVENUE_FAILURE, error}
    }
    function request(data) {
        return {type: hallAdminConstants.GET_REVENUE_REQUEST, data}
    }
    function success(result) {
        return {type: hallAdminConstants.GET_REVENUE_SUCCESS, result}
    }
}