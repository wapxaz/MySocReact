import { AppStateType } from './redux-store';
import { usersAPI } from "../api/api";
import { updatObjectInArray } from "../utils/object-helpers";
import { ProfilePhotosType, UserType } from "../types/types";
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

const FOLLOW = 'social-network/users/FOLLOW';
const UNFOLLOW = 'social-network/users/UNFOLLOW';
const SET_USERS = 'social-network/users/SET_USERS';
const SET_CURRENT_PAGE = 'social-network/users/SET_CURRENT_PAGE';
const SET_TOTAL_COUNTS_USERS = 'social-network/users/SET_TOTAL_COUNTS_USERS';
const TOGGLE_IS_FETCHING = 'social-network/users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'social-network/users/TOGGLE_IS_FOLLOWING_PROGRESS';

//стартовые данные
let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isFetching: false as boolean,
    followingInProgress: [] as Array<number> // массив ид пользователей
};

export type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            {
                return {
                    ...state,
                    users: updatObjectInArray(state.users, action.userId, 'id', { followed: true })
                };
            }
        case UNFOLLOW:
            {
                return {
                    ...state,
                    users: updatObjectInArray(state.users, action.userId, 'id', { followed: false })
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
                        : state.followingInProgress.filter(id => id !== action.userId)
                };
            }
        default:
            return state;
    }
}

// список всех ActionType
type ActionsTypes = FollowSuccessActionType | UnfollowSuccessActionType | SetUsersActionType | SetCurrentPageActionType | SetUsersTotalCountsActionType | ToggleIsFetchingActionType | ToggleFollowingInProgressActionType;

type FollowSuccessActionType = {
    type: typeof FOLLOW
    userId: number
}
export const followSuccess = (userId: number): FollowSuccessActionType => ({ type: FOLLOW, userId })

type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({ type: UNFOLLOW, userId })

type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({ type: SET_USERS, users })

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, currentPage })

type SetUsersTotalCountsActionType = {
    type: typeof SET_TOTAL_COUNTS_USERS
    totalUsersCount: number
}
export const setUsersTotalCounts = (totalUsersCount: number): SetUsersTotalCountsActionType => ({ type: SET_TOTAL_COUNTS_USERS, totalUsersCount })

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching })

type ToggleFollowingInProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    followingInProgress: boolean
    userId: number
}
export const toggleFollowingInProgress = (followingInProgress: boolean, userId: number): ToggleFollowingInProgressActionType => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, followingInProgress, userId })



// 1) первый варинат типизации thunk

// type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsTypes> //тип для dispapch
// export const getUsers = (currentPage: number, pageSize: number) => async (dispatch: DispatchType, getState: GetStateType) => {

// 2) второй вариант типизации thunk, как рекомендует оф документация redux
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUsers = (currentPage: number, pageSize: number): ThunkType => async (dispatch, getState) => {
    dispatch(toggleIsFetching(true));

    let data = await usersAPI.getUsers(currentPage, pageSize);

    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setUsersTotalCounts(data.totalCount));
}

//вынесена общая логика ф-ций follow и unfollow
const _followUnfollowFlow = async (dispatch: DispatchType,
                                userId: number,
                                apiMethod: any,
                                actionCreator: (userId: number) => FollowSuccessActionType | UnfollowSuccessActionType) => {
    dispatch(toggleFollowingInProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingInProgress(false, userId));
}

export const follow = (userId: number): ThunkType => async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
}

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
}

export default usersReducer;