import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "6025eddf-c4f7-44e7-96e8-ec1661589aa9"
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => {
            return response.data
        });
    },
    getProfile(profileId = null)  {
        return instance.get(`profile/${profileId}`).then(response => {
            return response.data
        });
    },
    isAuth() {
        return instance.get(`auth/me`).then(response => {
            return response.data
        });
    },
    follow(user_id) {
        return instance.post(`follow/${user_id}`);
    },
    unfollow(user_id) {
        return instance.delete(`follow/${user_id}`);
    }
}