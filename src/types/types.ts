export type PostType = {
    id: number
    post: string
    likeCount: number
}
export type ProfileContactsType = {
    github?: string
    vk?: string
    facebook?: string
    instagram?: string
    twitter?: string
    website?: string
    youtube?: string
    mainLink?: string
}
export type ProfilePhotosType = {
    small: string | null
    large: string | null
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ProfileContactsType
    photos: ProfilePhotosType
    aboutMe: string
}

export type UserType = {
    id: number
    name: string
    status: string
    photos: ProfilePhotosType
    followed: boolean
}