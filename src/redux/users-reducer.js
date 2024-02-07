import { usersAPI } from "../api/api";
import { updatObjectInArray } from "../utils/object-helpers";

const FOLLOW = 'social-network/users/FOLLOW';
const UNFOLLOW = 'social-network/users/UNFOLLOW';
const SET_USERS = 'social-network/users/SET_USERS';
const SET_CURRENT_PAGE = 'social-network/users/SET_CURRENT_PAGE';
const SET_TOTAL_COUNTS_USERS = 'social-network/users/SET_TOTAL_COUNTS_USERS';
const TOGGLE_IS_FETCHING = 'social-network/users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'social-network/users/TOGGLE_IS_FOLLOWING_PROGRESS';

//стартовые данные
let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            {
                return {
                    ...state,
                    users: updatObjectInArray(state.users, action.userId, 'id', {followed: true})
                };
            }
        case UNFOLLOW:
            {
                return {
                    ...state,
                    users: updatObjectInArray(state.users, action.userId, 'id', {followed: false})
                };
            }
        case SET_USERS:
            {
                return { ...state, users: action.users };
            }
        case SET_CURRENT_PAGE:
            {
                return { ...state, currentPage: action.currentPage };
            }
        case SET_TOTAL_COUNTS_USERS:
            {
                return { ...state, totalUsersCount: action.totalUsersCount };
            }
        case TOGGLE_IS_FETCHING:
            {
                return { ...state, isFetching: action.isFetching };
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            {
                return {
                    ...state,
                    followingInProgress: action.followingInProgress
                        ? [...state.followingInProgress, action.userId]
                        : [state.followingInProgress.filter(id => id !== action.userId)]
                };
            }
        default:
            return state;
    }
}

export const followSuccess = (userId) => ({ type: FOLLOW, userId })
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })
export const setUsersTotalCounts = (totalUsersCount) => ({ type: SET_TOTAL_COUNTS_USERS, totalUsersCount })
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleFollowingInProgress = (followingInProgress, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, followingInProgress, userId })

export const getUsers = (currentPage, pageSize) => async (dispatch) => {
    dispatch(toggleIsFetching(true));

    let data = await usersAPI.getUsers(currentPage, pageSize);

    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setUsersTotalCounts(data.totalCount));
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingInProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingInProgress(false, userId));
}

export const follow = (userId) => async (dispatch) => {
    followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
}

export const unfollow = (userId) => async (dispatch) => {
    followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
}

export default usersReducer;