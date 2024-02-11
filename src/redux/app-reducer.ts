import { ThunkAction } from "redux-thunk";
import { getAuthUserData } from "./auth-reducer.ts";
import { AppStateType, InferActionsTypes } from "./redux-store.ts";

//стартовые данные
let initialState = {
    initialized: false as boolean
};

export type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'INITIALIZED_SUCCESS': {
            return {
                ...state,
                initialized: true
            };
        }
        default:
            return state;
    }
}

// список всех ActionType через тип-обертку
type ActionsTypes = InferActionsTypes<typeof actions>



export const actions = {
    initializedSuccess: () => ({ type: 'INITIALIZED_SUCCESS' })
}



type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>

//ставит флар true для initialized, когда приложение проинициализировано
export const initializeApp = (): ThunkType => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    promise.then(() => {
        dispatch(actions.initializedSuccess());
    });
}

export default appReducer;