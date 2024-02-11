import { ProfilePhotosType, ProfileType, UserType } from './../types/types';
import axios from "axios";

//API для работы с данными в соцсети
//уровень DAL

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "6025eddf-c4f7-44e7-96e8-ec1661589aa9"
    }
});

type GetUsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string
}
type FollowResponseType = {
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: {}
}
type UnfollowResponseType = {
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: {}
}
export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`).then(res => res.data);
    },
    follow(user_id: number) {
        return instance.post<FollowResponseType>(`follow/${user_id}`);
    },
    unfollow(user_id: number) {
        return instance.delete<UnfollowResponseType>(`follow/${user_id}`);
    }
}

type UpdateStatusResponseType = {
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: {}
}
type SavePhotoResponseType = {
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: {
        photos: ProfilePhotosType
    }
}
type SaveProfileResponseType = {
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: {}
}
export const profileAPI = {
    getProfile(profileId: number) {
        return instance.get<ProfileType>(`profile/${profileId}`).then(response => {
            return response.data
        });
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId).then(response => {
            return response.data;
        });
    },
    updateStatus(status: string) {
        return instance.put<UpdateStatusResponseType>(`profile/status/`, { status: status }).then(res => res.data);
    },
    savePhoto(file: any) {
        //TODO: типизировать входной параметр file 
        const formData = new FormData();
        formData.append("image", file);
        return instance.put<SavePhotoResponseType>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data);
    },
    saveProfile(profileData: ProfileType) {
        return instance.put<SaveProfileResponseType>(`profile/`, profileData).then(res => res.data);
    }
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodeForCapthca {
    CaptchaIsRequired = 10
}
type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodeEnum
    messages: Array<string>
}
type LoginResponseType = {
    resultCode: ResultCodeEnum | ResultCodeForCapthca
    messages: Array<string>
    data: {
        userId: number
    }
}
type LogoutResponseType = {
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: {}
}
export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`).then(res => res.data);
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>(`auth/login/`, { email, password, rememberMe, captcha }).then(res => res.data);
    },
    logout() {
        return instance.delete<LogoutResponseType>(`auth/login/`).then(res => res.data);
    }
}

type GetCaptchaResponseType = {
    url: string
}
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaResponseType>(`security/get-captcha-url`).then(res => res.data);
    }
}