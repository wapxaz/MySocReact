import React, { FC, useEffect } from "react";
import Paginator from "../common/Paginator/Paginator.tsx";
import User from "./User.tsx";
import UsersSearchForm from "./UsersSearchForm.tsx";
import { FilterType, actions, getUsers } from "../../redux/users-reducer.ts";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsersFilter, getUsersSelector } from "../../redux/users-selectors.ts";
import { AppDispatch } from "../../redux/redux-store.ts";

type PropsType = {}

export const Users: FC<PropsType> = (props) => {
    //вытаскиваю данные через хук useSelector
    const totalUsersCount = useSelector(getTotalUsersCount);
    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const users = useSelector(getUsersSelector);
    const followingInProgress = useSelector(getFollowingInProgress);
    const filter = useSelector(getUsersFilter);

    //настраиваю диспатчи
    const dispatch: AppDispatch = useDispatch();

    //аналог componentDidMount и выполнится 1 раз при создании
    useEffect(() => {
        dispatch(getUsers(currentPage, pageSize, filter));
    }, [])

    const onPageChanged = (currentPage: number) => {
        dispatch(getUsers(currentPage, pageSize, filter));
        dispatch(actions.setCurrentPage(currentPage));
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsers(1, pageSize, filter));
    }
    const follow = (userId: number) => {
        dispatch(actions.followSuccess(userId));
    }
    const unfollow = (userId: number) => {
        dispatch(actions.unfollowSuccess(userId));
    }

    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged} />

            <Paginator totalUsersCount={totalUsersCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChanged={onPageChanged} />
            <div>
                {
                    users.map(u => <User key={u.id}
                        user={u}
                        followingInProgress={followingInProgress} unfollow={unfollow}
                        follow={follow} />)
                }
            </div>
        </div>
    );
}