import { getAuthUserData } from "./auth-reducer.ts";

const INITIALIZED_SUCCESS: string = 'social-network/app/INITIALIZED_SUCCESS';

//стартовые данные
let initialState = {
    initialized: false as boolean
};

export type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: any): InitialStateType => {
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

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): InitializedSuccessActionType => ({ type: INITIALIZED_SUCCESS })

//ставит флар true для initialized, когда приложение проинициализировано
export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    promise.then(() => {
        dispatch(initializedSuccess());
    });
}

export default appReducer;