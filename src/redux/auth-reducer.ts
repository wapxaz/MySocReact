import { stopSubmit } from "redux-form";
import { ResultCodeEnum, ResultCodeForCapthca, authAPI, securityAPI } from "../api/api.ts";
import { ThunkAction } from "redux-thunk";
import { AppStateType, InferActionsTypes } from "./redux-store";

//стартовые данные
let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null
};

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SET_USER_DATA':
        case 'GET_CAPTCHA_URL_SUCCESS': {
            return {
                ...state,
                ...action.payload
            };
        }
        default:
            return state;
    }
}

// список всех ActionType через тип-обертку
type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({ type: 'SET_USER_DATA', payload: { userId, email, login, isAuth } }),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({ type: 'GET_CAPTCHA_URL_SUCCESS', payload: { captchaUrl } })
}




type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let response = await authAPI.me();
    if (response.resultCode === ResultCodeEnum.Success) {
        let { id, login, email } = response.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.resultCode === ResultCodeEnum.Success) {
        // успешная авторизация
        dispatch(getAuthUserData());
    } else {
        // ошибка
        if (response.resultCode === ResultCodeForCapthca.CaptchaIsRequired) {
            // капча
            dispatch(getCaptchaUrl());
        }

        let errorMessage = response.messages.length > 0 ? response.messages : "Some error";
        //TODO: затипизировать stopSubmit
        ///dispatch(stopSubmit("login", { _error: errorMessage }));
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.url;
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
}

export const logout = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false));
    }
}

export default authReducer;