import React from "react";
import Users from "./Users";
import { connect } from "react-redux";
import { follow, setCurrentPage, unfollow, toggleFollowingInProgress, getUsers } from "../../redux/users-reducer";
import Preloader from "../common/Preloader/Preloader";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { getUsersSelector, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from "../../redux/users-selectors";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }
    onPageChanged = (currentPage) => {
        this.props.getUsers(currentPage, this.props.pageSize);
        this.props.setCurrentPage(currentPage);
    }
    render() {
        //вычисление кол-ва страниц пользователей
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }
        return (
            <>
                <div>
                    {this.props.isFetching ? <Preloader /> : null}
                </div>
                <Users totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    users={this.props.users}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    followingInProgress={this.props.followingInProgress}
                    isAuth={this.props.isAuth} />
            </>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsersSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    };
};

export default compose(
    //withAuthRedirect,
    connect(mapStateToProps, {
        setCurrentPage,
        toggleFollowingInProgress,
        getUsers,
        follow,
        unfollow
    }
    )
)(UsersContainer);