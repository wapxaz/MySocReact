import { createSelector } from "reselect";
import { AppStateType } from "./redux-store";

//селекторы из mapStateToProps вынесены в отдельный файл
//из файла UsersContainer

const getUsersSelectorTmp = (state: AppStateType) => {
    return state.usersPage.users;
}
//на основе библиотеки reselector
export const getUsersSelector = createSelector(getUsersSelectorTmp, (users) => {
    return users.filter(u => true);
});
    
export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize;
}
export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount;
}
export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
}
export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching;
}
export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress;
}