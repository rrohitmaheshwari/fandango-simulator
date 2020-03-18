import { hallAdminConstants }    from "../helper/constants";

const initialState = {
    movies:[],
    loadingMovies:false,
    movieHall:{},
    loadingHall:false,
    updatingHall:false,
    revenues:[],
    loadingRevenue:false,
};

export function hallAdmin(state = initialState, action) {

    switch (action.type) {
        case hallAdminConstants.GET_MOVIES_SUCCESS:
            return {
                ...state,
                movies: action.result.movies,
                loadingMovies:false
            };
        case hallAdminConstants.GET_MOVIES_REQUEST:
            return {
                ...state,
                loadingMovies:true
            };
        case hallAdminConstants.GET_MOVIES_FAILURE:
            return {
                ...state,
                loadingMovies:false
            };

        case hallAdminConstants.GET_HALL_DATA_SUCCESS:
            return {
                ...state,
                movieHall: action.result.movieHall,
                loadingHall:false
            };
        case hallAdminConstants.GET_HALL_DATA_REQUEST:
            return {
                ...state,
                loadingHall:true
            };
        case hallAdminConstants.GET_HALL_DATA_FAILURE:
            return {
                ...state,
                loadingHall:false
            };



        // updating movie Hall
        case hallAdminConstants.EDIT_MOVIE_HALL_SUCCESS:
            return {
                ...state,
                movieHall: action.result.movieHall,
                updatingHall:false
            };
        case hallAdminConstants.EDIT_MOVIE_HALL_REQUEST:
            return {
                ...state,
                updatingHall:true
            };
        case hallAdminConstants.EDIT_MOVIE_HALL_FAILURE:
            return {
                ...state,
                updatingHall:false
            };


        // getting revenue Hall
        case hallAdminConstants.GET_REVENUE_SUCCESS:
            return {
                ...state,
                revenues: action.result.revenues,
                loadingRevenue:false
            };
        case hallAdminConstants.GET_REVENUE_REQUEST:
            return {
                ...state,
                loadingRevenue:true
            };
        case hallAdminConstants.GET_REVENUE_FAILURE:
            return {
                ...state,
                loadingRevenue:false
            };

        default:
            return state
    }
}
