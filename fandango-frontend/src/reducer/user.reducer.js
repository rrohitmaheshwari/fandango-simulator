import { userConstants }    from "../helper/constants";

const initialState = {
    isAuthenticated : false,
    user : {}
};

export function userDetails(state = initialState, action) {

    switch (action.type) {
        case userConstants.FETCH_USER:
            return {
                ...state,
                isAuthenticated: !!action.user,
                user: action.user
            };
        default:
            return state
    }
}
