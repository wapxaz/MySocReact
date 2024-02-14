import React, { FC } from "react";
import Paginator from "../common/Paginator/Paginator.tsx";
import User from "./User.tsx";
import { UserType } from "../../types/types";
import UsersSearchForm from "./UsersSearchForm.tsx";
import { FilterType } from "../../redux/users-reducer.ts";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (currentPage: number) => void
    onFilterChanged: (filter: FilterType) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}
let Users: FC<PropsType> = (props) => {
    return (
        <div>
            <UsersSearchForm onFilterChanged={props.onFilterChanged} />

            <Paginator totalUsersCount={props.totalUsersCount}
                pageSize={props.pageSize}
                currentPage={props.currentPage}
                onPageChanged={props.onPageChanged} />
            <div>
                {
                    props.users.map(u => <User key={u.id}
                        user={u}
                        followingInProgress={props.followingInProgress} unfollow={props.unfollow}
                        follow={props.follow} />)
                }
            </div>
        </div>
    );
}

export default Users;