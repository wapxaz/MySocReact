import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/api";

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
    ],
    profile: null,
    status: ""
};

const profileReducer = (state = initialState, action) => {
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
                profile: {...state.profile, photos: action.photos}
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

export const addPostActionCreator = (newPost) => ({ type: ADD_POST, newPost })
export const setUserProfile = (profile) => ({
    type: SET_USER_PROFILE,
    profile
})
export const setStatus = (status) => ({
    type: SET_STATUS,
    status
})
export const deletePost = (postId) => ({
    type: DELETE_POST,
    postId
})
export const savePhotoSuccess = (photos) => ({
    type: SAVE_PHOTO_SUCCESS,
    photos
})
export const saveProfileSuccess = (profileData) => ({
    type: UPDATE_PROFILE_SUCCESS,
    profileData
})

export const getProfile = (profileId) => async (dispatch) => {
    let data = await profileAPI.getProfile(profileId);
    dispatch(setUserProfile(data));
}

export const getStatus = (userId) => async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(setStatus(data));
}

export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}

export const saveProfile = (profileData) => async (dispatch, getState) => {
    const profileId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profileData);
    if (response.data.resultCode === 0) {
        dispatch(getProfile(profileId));
    } else {
        dispatch(stopSubmit("profile-redux-form",{_error: response.data.messages[0]}));
        /* вывод ошибки под конкретным полем в форме - не работает
        dispatch(stopSubmit("profile-redux-form", {
            "contacts": {
                "vk": response.data.messages[0]
            }
        }));
        */

        return false;//Promise.reject(response.data.messages[0]);
    }
}

export default profileReducer;