import { ThunkAction } from "redux-thunk";
import { getAuthUserData } from "./auth-reducer.ts";
import { AppStateType } from "./redux-store.ts";

const INITIALIZED_SUCCESS: string = 'social-network/app/INITIALIZED_SUCCESS';

//стартовые данные
let initialState = {
    initialized: false as boolean
};

export type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            };
        }
        default:
            return state;
    }
}

//все экшн тайпы
type ActionsTypes = InitializedSuccessActionType

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): InitializedSuccessActionType => ({ type: INITIALIZED_SUCCESS })


type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>

//ставит флар true для initialized, когда приложение проинициализировано
export const initializeApp = (): ThunkType => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    promise.then(() => {
        dispatch(initializedSuccess());
    });
}

export default appReducer;