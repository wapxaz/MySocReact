import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/api";
import { PostType, ProfilePhotosType, ProfileType } from "../types/types";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "./redux-store";

const ADD_POST = 'social-network/profile/ADD-POST';
const SET_USER_PROFILE = 'social-network/profile/SET_USER_PROFILE';
const SET_STATUS = 'social-network/profile/SET_STATUS';
const DELETE_POST = 'social-network/profile/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'social-network/profile/SAVE_PHOTO_SUCCESS';
const UPDATE_PROFILE_SUCCESS = 'social-network/profile/UPDATE_PROFILE_SUCCESS';


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
        case ADD_POST: {
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
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            };
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            };
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType
            };
        }
        case UPDATE_PROFILE_SUCCESS: {
            return {
                ...state,
                profile: action.profileData
            };
        }
        default:
            return state;
    }
}

// все Actions Types
type ActionsTypes = AddPostActionCreatorType | SetUserProfileActionType | SetStatusActionType | DeletePostActionType | SavePhotoSuccessActionType | SaveProfileSuccessActionType

type AddPostActionCreatorType = {
    type: typeof ADD_POST
    newPost: string
}
export const addPostActionCreator = (newPost: string): AddPostActionCreatorType => ({ type: ADD_POST, newPost })

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({
    type: SET_USER_PROFILE,
    profile
})

type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): SetStatusActionType => ({
    type: SET_STATUS,
    status
})

type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost = (postId: number): DeletePostActionType => ({
    type: DELETE_POST,
    postId
})

type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: ProfilePhotosType
}
export const savePhotoSuccess = (photos: ProfilePhotosType): SavePhotoSuccessActionType => ({
    type: SAVE_PHOTO_SUCCESS,
    photos
})

type SaveProfileSuccessActionType = {
    type: typeof UPDATE_PROFILE_SUCCESS
    profileData: ProfileType
}
export const saveProfileSuccess = (profileData: ProfileType): SaveProfileSuccessActionType => ({
    type: UPDATE_PROFILE_SUCCESS,
    profileData
})



type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getProfile = (profileId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(profileId);
    dispatch(setUserProfile(data));
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(setStatus(data));
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        let response = await profileAPI.updateStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    } catch (error) {
        // здесь обрабатываем ошибку
    }
}

export const savePhoto = (file: any): ThunkType => async (dispatch) => {
    let response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}

//затипизировать!!!
export const saveProfile = (profileData: ProfileType) => async (dispatch: any, getState: any) => {
    const profileId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profileData);
    if (response.data.resultCode === 0 && profileId !== null) {
        dispatch(getProfile(profileId));
    } else {
        dispatch(stopSubmit("profile-redux-form", { _error: response.data.messages[0] }));
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