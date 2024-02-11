import { getAuthUserData } from "./auth-reducer.ts";
import { BaseThunkType, InferActionsTypes } from "./redux-store.ts";

//стартовые данные
let initialState = {
    initialized: false as boolean
};

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/APP/INITIALIZED_SUCCESS': {
            return {
                ...state,
                initialized: true
            };
        }
        default:
            return state;
    }
}


export const actions = {
    initializedSuccess: () => ({ type: 'SN/APP/INITIALIZED_SUCCESS' } as const)
}


//ставит флар true для initialized, когда приложение проинициализировано
export const initializeApp = (): ThunkType => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    promise.then(() => {
        dispatch(actions.initializedSuccess());
    });
}

type InitialStateType = typeof initialState
// список всех ActionType через тип-обертку
type ActionsTypes = InferActionsTypes<typeof actions>
//общий тип для thunk
type ThunkType = BaseThunkType<ActionsTypes, void>

export default appReducer;