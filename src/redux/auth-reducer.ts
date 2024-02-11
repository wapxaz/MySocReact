import { FormAction, stopSubmit } from "redux-form";
import { ResultCodeEnum, ResultCodeForCapthca } from "../api/api.ts";
import { authAPI } from "../api/auth-api.ts";
import { securityAPI } from "../api/security-api.ts";
import { BaseThunkType, InferActionsTypes } from "./redux-store";

//стартовые данные
let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null
};

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/AUTH/SET_USER_DATA':
        case 'SN/AUTH/GET_CAPTCHA_URL_SUCCESS': {
            return {
                ...state,
                ...action.payload
            };
        }
        default:
            return state;
    }
}

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({ type: 'SN/AUTH/SET_USER_DATA', payload: { userId, email, login, isAuth } } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({ type: 'SN/AUTH/GET_CAPTCHA_URL_SUCCESS', payload: { captchaUrl } } as const)
}




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
        if (response.resultCode === ResultCodeForCapthca.CaptchaIsRequired as number) {
            // капча
            dispatch(getCaptchaUrl());
        }

        let errorMessage = response.messages ? response.messages : "Some error";
        //TODO: затипизировать stopSubmit
        dispatch(stopSubmit("login", { _error: errorMessage }));
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

type InitialStateType = typeof initialState
// список всех ActionType через тип-обертку
type ActionsTypes = InferActionsTypes<typeof actions>
//общий тип для thunk
type ThunkType = BaseThunkType<ActionsTypes | FormAction>

export default authReducer;