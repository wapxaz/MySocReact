import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';

//стартовые данные
let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload
            };
        }
        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } })

export const getAuthUserData = () => {
    return (dispatch) => {
        return authAPI.me().then(response => {
            if (response.data.resultCode === 0) {
                let { id, login, email } = response.data.data;
                dispatch(setAuthUserData(id, email, login, true));
            }
        });
    }
}

export const login = (email, password, rememberMe, capcha) => {
    return (dispatch) => {
        authAPI.login(email, password, rememberMe, capcha).then(response => {
            if(response.data.resultCode === 0)
            {
                dispatch(getAuthUserData());
            } else {
                let errorMessage = response.data.messages.length > 0 ? response.data.messages : "Some error";
                dispatch(stopSubmit("login", {_error: errorMessage}));
            }
        });
    }
}

export const logout = () => {
    return (dispatch) => {
        authAPI.logout().then(response => {
            if(response.data.resultCode === 0)
            {
                dispatch(setAuthUserData(null, null, null, false));
            }
        });
    }
}

export default authReducer;