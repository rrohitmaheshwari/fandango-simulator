import {adminConstants, hallAdminConstants} from "../helper/constants";

const initialState = {
    movies:[],
    loadingMovies:false,
    movieHalls:[],
    loadingHalls:false,
    addingHall:false,
    updatingHall:false,
    addingMovie:false,
    movie:{},
    loadingMovie:false,
    users:[],
    loadingUsers:false,
    updatingUser:false,
    loadingRevenue:false,
    movieRevenues:[],
    moviehallRevenues:[],
};

export function admin(state = initialState, action) {

    switch (action.type) {
        case adminConstants.GET_MOVIES_SUCCESS:
            return {
                ...state,
                movies: action.result.movies,
                loadingMovies:false
            };
        case adminConstants.GET_MOVIES_REQUEST:
            return {
                ...state,
                loadingMovies:true
            };
        case adminConstants.GET_MOVIES_FAILURE:
            return {
                ...state,
                loadingMovies:false
            };

        case adminConstants.GET_MOVIE_HALLS_SUCCESS:
            return {
                ...state,
                movieHalls: action.result.movieHalls,
                loadingHalls:false
            };
        case adminConstants.GET_MOVIE_HALLS_REQUEST:
            return {
                ...state,
                loadingHalls:true
            };
        case adminConstants.GET_MOVIE_HALLS_FAILURE:
            return {
                ...state,
                loadingHalls:false
            };

        case adminConstants.ADD_MOVIE_HALL_SUCCESS:
            return {
                ...state,
                movieHalls: state.movieHalls.concat(action.result.movieHall),
                addingHall:false
            };
        case adminConstants.ADD_MOVIE_HALL_REQUEST:
            return {
                ...state,
                addingHall:true
            };
        case adminConstants.ADD_MOVIE_HALL_FAILURE:
            return {
                ...state,
                addingHall:false
            };

        //updating movie Hall
        case adminConstants.EDIT_MOVIE_HALL_SUCCESS:
            let newHalls = [...state.movieHalls]
            let updatedHall = action.result.movieHall;
            for (var i = 0; i < newHalls.length; i++) {
                if (newHalls[i]._id==updatedHall._id) {
                    newHalls[i] = updatedHall
                }
            }
            console.log(newHalls)
            return {
                ...state,
                movieHalls: newHalls,
                updatingHall:false
            };
        case adminConstants.EDIT_MOVIE_HALL_REQUEST:
            return {
                ...state,
                updatingHall:true
            };
        case adminConstants.EDIT_MOVIE_HALL_FAILURE:
            return {
                ...state,
                updatingHall:false
            };

        //adding movie
        case adminConstants.ADD_MOVIE_SUCCESS:
            return {
                ...state,
                movies: state.movies.concat(action.result.movie),
                addingMovie:false
            };
        case adminConstants.ADD_MOVIE_REQUEST:
            return {
                ...state,
                addingMovie:true
            };
        case adminConstants.ADD_MOVIE_FAILURE:
            return {
                ...state,
                addingMovie:false
            };

        case adminConstants.GET_MOVIE_SUCCESS:
            return {
                ...state,
                movie: action.result.movie,
                loadingMovie:false
            };
        case adminConstants.GET_MOVIE_REQUEST:
            return {
                ...state,
                loadingMovie:true
            };
        case adminConstants.GET_MOVIE_FAILURE:
            return {
                ...state,
                loadingMovie:false
            };

        case adminConstants.EDIT_MOVIE_SUCCESS:
            return {
                ...state,
                movie: action.result.movie,
                loadingMovie:false
            };
        case adminConstants.EDIT_MOVIE_REQUEST:
            return {
                ...state,
                loadingMovie:true
            };
        case adminConstants.EDIT_MOVIE_FAILURE:
            return {
                ...state,
                loadingMovie:false
            };

        //loading normal users
        case adminConstants.GET_NORMAL_USERS_SUCCESS:
            return {
                ...state,
                users: action.result.users,
                loadingUsers:false
            };
        case adminConstants.GET_NORMAL_USERS_REQUEST:
            return {
                ...state,
                loadingUsers:true
            };
        case adminConstants.GET_NORMAL_USERS_FAILURE:
            return {
                ...state,
                loadingUsers:false
            };

        //updating normal user
        case adminConstants.EDIT_NORMAL_USER_SUCCESS:
            let newUsers = [...state.users]
            let updatedUser = action.result.user;
            if(updatedUser) {
                for (var i = 0; i < newUsers.length; i++) {
                    if (newUsers[i].user_id == updatedUser.user_id) {
                        newUsers[i] = updatedUser
                    }
                }
            }
            // console.log(newHalls)
            return {
                ...state,
                users: newUsers,
                updatingUser:false
            };
        case adminConstants.EDIT_NORMAL_USER_REQUEST:
            return {
                ...state,
                updatingUser:true
            };
        case adminConstants.EDIT_NORMAL_USER_FAILURE:
            return {
                ...state,
                updatingUser:false
            };


        // getting revenue Hall
        case adminConstants.GET_REVENUE_SUCCESS:
            return {
                ...state,
                moviehallRevenues: action.result.moviehallRevenues,
                movieRevenues: action.result.movieRevenues,
                loadingRevenue:false
            };
        case adminConstants.GET_REVENUE_REQUEST:
            return {
                ...state,
                loadingRevenue:true
            };
        case adminConstants.GET_REVENUE_FAILURE:
            return {
                ...state,
                loadingRevenue:false
            };


        default:
            return state
    }
}
