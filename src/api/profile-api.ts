import { ProfilePhotosType, ProfileType } from "../types/types.ts"
import { APIResponseType, ResultCodeEnum, instance } from "./api.ts"

type SavePhotoDataType = {
    photos: ProfilePhotosType
} 
export const profileAPI = {
    getProfile(profileId: number) {
        return instance.get<ProfileType>(`profile/${profileId}`).then(res => res.data)},
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId).then(res => res.data);},
    updateStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status/`, { status: status }).then(res => res.data);
    },
    savePhoto(file: any) {
        //TODO: типизировать входной параметр file 
        const formData = new FormData();
        formData.append("image", file);
        return instance.put<APIResponseType<SavePhotoDataType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data);
    },
    saveProfile(profileData: ProfileType) {
        return instance.put<APIResponseType>(`profile/`, profileData).then(res => res.data);
    }
}