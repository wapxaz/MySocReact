import { FormAction, stopSubmit } from "redux-form";
import { ResultCodeEnum } from "../api/api.ts";
import { profileAPI } from "../api/profile-api.ts";
import { PostType, ProfilePhotosType, ProfileType } from "../types/types";
import { BaseThunkType, InferActionsTypes } from "./redux-store";

//стартовые данные
let initialState = {
    posts: [
        { id: 1, post: 'Hi, how are you?', likeCount: 20 },
        { id: 2, post: "It's my first post.", likeCount: 15 }
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "" as string,

};

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/PROFILE/ADD_POST': {
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
        case 'SN/PROFILE/SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile
            };
        }
        case 'SN/PROFILE/SET_STATUS': {
            return {
                ...state,
                status: action.status
            };
        }
        case 'SN/PROFILE/DELETE_POST': {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            };
        }
        case 'SN/PROFILE/SAVE_PHOTO_SUCCESS': {
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType
            };
        }
        case 'SN/PROFILE/UPDATE_PROFILE_SUCCESS': {
            return {
                ...state,
                profile: action.profileData
            };
        }
        default:
            return state;
    }
}

export const actions = {
    addPostActionCreator: (newPost: string) => ({ type: 'SN/PROFILE/ADD_POST', newPost } as const),
    setUserProfile: (profile: ProfileType) => ({type: 'SN/PROFILE/SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'SN/PROFILE/SET_STATUS', status} as const),
    deletePost: (postId: number) => ({type: 'SN/PROFILE/DELETE_POST', postId} as const),
    savePhotoSuccess: (photos: ProfilePhotosType) => ({type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', photos} as const),
    saveProfileSuccess: (profileData: ProfileType) => ({type: 'SN/PROFILE/UPDATE_PROFILE_SUCCESS', profileData} as const)
}



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

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let response = await profileAPI.savePhoto(file);
    if (response.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.savePhotoSuccess(response.data.photos));
    }
}

export const saveProfile = (profileData: ProfileType): ThunkType => async (dispatch, getState) => {
    const profileId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profileData);
    if (response.resultCode === ResultCodeEnum.Success && profileId !== null) {
        dispatch(getProfile(profileId));
    } else {
        dispatch(stopSubmit("profile-redux-form", { _error: response.messages[0] }));
        dispatch(stopSubmit("profile-redux-form", {
            "contacts": {
                "vk": response.messages[0]
            }
        }));

        return false;
    }
}

type InitialStateType = typeof initialState
// список всех ActionType через тип-обертку
type ActionsTypes = InferActionsTypes<typeof actions>
//общий тип для thunk
type ThunkType = BaseThunkType<ActionsTypes | FormAction, void>

export default profileReducer;