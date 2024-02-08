import { createSelector } from "reselect";

//селекторы из mapStateToProps вынесены в отдельный файл
//из файла UsersContainer.jsx

const getUsersSelectorTmp = (state) => {
    return state.usersPage.users;
}
//на основе библиотеки reselector
export const getUsersSelector = createSelector(getUsersSelectorTmp, (users) => {
    return users.filter(u => true);
});
    
export const getPageSize = (state) => {
    return state.usersPage.pageSize;
}
export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount;
}
export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
}
export const getIsFetching = (state) => {
    return state.usersPage.isFetching;
}
export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress;
}