import React from "react";
import Users from "./Users.tsx";
import { connect } from "react-redux";
import { follow, actions, unfollow, getUsers, FilterType } from "../../redux/users-reducer.ts";
import Preloader from "../common/Preloader/Preloader.tsx";
import { withAuthRedirect } from "../../hoc/withAuthRedirect.tsx";
import { compose } from "redux";
import { getUsersSelector, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress, getUsersFilter } from "../../redux/users-selectors.ts";
import { UserType } from "../../types/types.ts";
import { AppStateType } from "../../redux/redux-store.ts";

type MapStateToPropsType = {
    currentPage: number
    pageSize: number
    totalUsersCount: number
    isFetching: boolean
    followingInProgress: Array<number>
    users: Array<UserType>
    filter: FilterType
}
type MapDispatchToPropsType = {
    getUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
    setCurrentPage: (currentPage: number) => void
    //onPageChanged: (currentPage: number) => void
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    //toggleFollowingInProgress: (followingInProgress: boolean, userId: number) => void
}
type OwnPropsType = {
    pageTitle: string
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize, this.props.filter);
    }
    onPageChanged = (currentPage: number) => {
        this.props.getUsers(currentPage, this.props.pageSize, this.props.filter);
        this.props.setCurrentPage(currentPage);
    }
    onFilterChanged = (filter: FilterType) => {
        this.props.getUsers(1, this.props.pageSize, filter);
    }
    render() {
        //вычисление кол-ва страниц пользователей
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
        let pages: Array<number> = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }
        return (
            <>
                <h2>{this.props.pageTitle}</h2>
                <div>
                    {this.props.isFetching ? <Preloader /> : null}
                </div>
                <Users totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    users={this.props.users}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    onFilterChanged={this.onFilterChanged}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    followingInProgress={this.props.followingInProgress}
                />
            </>
        );
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: getUsersSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter: getUsersFilter(state)
    };
};

export default compose(
    //withAuthRedirect,
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
        setCurrentPage: actions.setCurrentPage,
        //toggleFollowingInProgress,
        getUsers,
        follow,
        unfollow
    }
    )
)(UsersContainer);