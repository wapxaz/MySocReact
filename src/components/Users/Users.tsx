import React, { FC, useEffect } from "react";
import Paginator from "../common/Paginator/Paginator.tsx";
import User from "./User.tsx";
import UsersSearchForm from "./UsersSearchForm.tsx";
import { FilterType, actions, getUsers } from "../../redux/users-reducer.ts";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsersFilter, getUsersSelector } from "../../redux/users-selectors.ts";
import { AppDispatch } from "../../redux/redux-store.ts";
import { useNavigate } from "react-router-dom";

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

    //вытаскивание данных из адресной строки
    const navigate = useNavigate();

    //аналог componentDidMount и выполнится 1 раз при создании
    //беру из урла начальные значения и записываю в стейт
    useEffect(() => {
        let location = window.location.href;
        location = location.replace('#', '/');
        let url = new URL(location);
        let urlParamTerm = url.searchParams.get('term')
        let urlParamFriend = url.searchParams.get('friend')
        let urlParamCurrentPage = url.searchParams.get('page')

        let newCurrentPage = currentPage;
        let newFilter = filter;
        if (urlParamCurrentPage) {
            newCurrentPage = Number(urlParamCurrentPage);
        }
        if (urlParamTerm) {
            newFilter = { ...newFilter, term: urlParamTerm as string };
        }
        if (urlParamFriend) {
            newFilter = { ...newFilter, friend: urlParamFriend === "null" ? null : urlParamFriend === "true" ? true : false };
        }

        dispatch(getUsers(newCurrentPage, pageSize, newFilter));
    }, []);

    //подставляем в браузер гет-параметры(синхронизация)
    useEffect(() => {
        navigate(`/users?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`);
    }, [filter, currentPage]);

    const onPageChanged = (currentPage: number) => {
        dispatch(getUsers(currentPage, pageSize, filter));
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