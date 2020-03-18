import { combineReducers }  from 'redux';
import { userDetails }      from "./user.reducer";
import {alert} from './alert.reducer';
import {admin} from './admin.reducer';
import {signup} from './signup.reducer';
import {authentication} from "./authentication.reducer";
import {hallAdmin} from "./halladmin.reducer";

const rootReducer = combineReducers({

    userDetails,alert,signup,admin,authentication,hallAdmin

});

export default rootReducer;