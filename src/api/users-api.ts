import { UserType } from "../types/types.ts"
import { APIResponseType, instance } from "./api.ts"

type GetUsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string
}

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10, term: string = "", friend: boolean | null = null) {
        const termParam = term !== "" ? "&term=" + term : "";
        const frindParam = friend === null ? "" : "&friend=" + friend;

        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}${termParam}${frindParam}`).then(res => res.data);
    },
    follow(user_id: number) {
        return instance.post<APIResponseType>(`follow/${user_id}`).then(res => res.data);
    },
    unfollow(user_id: number) {
        return instance.delete<APIResponseType>(`follow/${user_id}`).then(res => res.data);
    }
}