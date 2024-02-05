import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux"; 
import profileReducer from "./profile-reducer.js";
import dialogReducer from "./dialog-reducer.js";
import sidebarReducer from "./sidebar-reducer.js";
import usersReducer from "./users-reducer.js";
import authReducer from "./auth-reducer.js";
import {thunk as thunkMiddleware} from "redux-thunk";
import { reducer as formReducer } from 'redux-form';

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogReducer,
    sidebarFriends: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;