import {combineReducers, legacy_createStore as createStore} from "redux"; 
import profileReducer from "./profile-reducer.js";
import dialogReducer from "./dialog-reducer.js";
import sidebarReducer from "./sidebar-reducer.js";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogReducer,
    sidebarFriends: sidebarReducer
});

let store = createStore(reducers);

export default store;