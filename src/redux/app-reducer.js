import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCCESS = 'social-network/app/INITIALIZED_SUCCESS';

//стартовые данные
let initialState = {
    initialized: false,
    globalError: null
};

const appReducer = (state = initialState, action) => {
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

export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS })

//ставит флар true для initialized, когда приложение проинициализировано
export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    promise.then(() => {
        dispatch(initializedSuccess());
    });
}

export default appReducer;