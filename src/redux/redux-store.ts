import {Action, AnyAction, applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from "redux"; 
import profileReducer from "./profile-reducer.ts";
import dialogReducer from "./dialog-reducer.ts";
import sidebarReducer from "./sidebar-reducer.ts";
import usersReducer from "./users-reducer.ts";
import authReducer from "./auth-reducer.ts";
import {ThunkAction, ThunkDispatch, thunk as thunkMiddleware} from "redux-thunk";
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

//вспомогательный тип InferActionsTypes, который из объекта экшн криэторов создаёт типы для этих экшн криеэторов
export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never

//общий тип для thunk
export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

export type AppDispatch = ThunkDispatch<AppStateType, unknown, AnyAction>


//через эти 2 строчки подключаю редакс для расширения в хроме
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

//let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;