import {applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from "redux"; 
import profileReducer from "./profile-reducer.ts";
import dialogReducer from "./dialog-reducer.ts";
import sidebarReducer from "./sidebar-reducer.ts";
import usersReducer from "./users-reducer.ts";
import authReducer from "./auth-reducer.ts";
import {thunk as thunkMiddleware} from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
import appReducer from "./app-reducer.ts";

//файл настроек store REDUX

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogReducer,
    sidebarFriends: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

//через эти 2 строчки подключаю редакс для расширения в хроме
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

//let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;