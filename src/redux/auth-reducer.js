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

export const isAuthFunk = () => {
    return (dispatch) => {
        authAPI.me().then(response => {
            if (response.resultCode === 0) {
                let { id, login, email } = response.data;
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
                dispatch(isAuthFunk());
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