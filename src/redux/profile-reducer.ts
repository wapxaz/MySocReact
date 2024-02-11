import { stopSubmit } from "redux-form";
import { ResultCodeEnum, profileAPI } from "../api/api.ts";
import { PostType, ProfilePhotosType, ProfileType } from "../types/types";
import { ThunkAction } from "redux-thunk";
import { AppStateType, InferActionsTypes } from "./redux-store";

//стартовые данные
let initialState = {
    posts: [
        { id: 1, post: 'Hi, how are you?', likeCount: 20 },
        { id: 2, post: "It's my first post.", likeCount: 15 }
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "" as string,

};

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'ADD_POST': {
            let newPost = {
                id: 5,
                post: action.newPost,
                likeCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            };
        }
        case 'SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile
            };
        }
        case 'SET_STATUS': {
            return {
                ...state,
                status: action.status
            };
        }
        case 'DELETE_POST': {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            };
        }
        case 'SAVE_PHOTO_SUCCESS': {
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType
            };
        }
        case 'UPDATE_PROFILE_SUCCESS': {
            return {
                ...state,
                profile: action.profileData
            };
        }
        default:
            return state;
    }
}


// список всех ActionType через тип-обертку
type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    addPostActionCreator: (newPost: string) => ({ type: 'ADD_POST', newPost } as const),
    setUserProfile: (profile: ProfileType) => ({type: 'SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'SET_STATUS', status} as const),
    deletePost: (postId: number) => ({type: 'DELETE_POST', postId} as const),
    savePhotoSuccess: (photos: ProfilePhotosType) => ({type: 'SAVE_PHOTO_SUCCESS', photos} as const),
    saveProfileSuccess: (profileData: ProfileType) => ({type: 'UPDATE_PROFILE_SUCCESS', profileData} as const)
}



type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getProfile = (profileId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(profileId);
    dispatch(actions.setUserProfile(data));
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(data));
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        let response = await profileAPI.updateStatus(status);
        if (response.resultCode === ResultCodeEnum.Success) {
            dispatch(actions.setStatus(status));
        }
    } catch (error) {
        // здесь обрабатываем ошибку
    }
}

export const savePhoto = (file: any): ThunkType => async (dispatch) => {
    let response = await profileAPI.savePhoto(file);
    if (response.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.savePhotoSuccess(response.data.photos));
    }
}

//затипизировать!!!
export const saveProfile = (profileData: ProfileType) => async (dispatch: any, getState: any) => {
    const profileId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profileData);
    if (response.resultCode === ResultCodeEnum.Success && profileId !== null) {
        dispatch(getProfile(profileId));
    } else {
        dispatch(stopSubmit("profile-redux-form", { _error: response.messages[0] }));
        //TODO: затипизировать stopSubmit
        /* вывод ошибки под конкретным полем в форме - не работает
        dispatch(stopSubmit("profile-redux-form", {
            "contacts": {
                "vk": response.data.messages[0]
            }
        }));
        */

        return false;
    }
}

export default profileReducer;