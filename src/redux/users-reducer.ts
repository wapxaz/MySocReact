import { AppStateType, InferActionsTypes } from './redux-store';
import { ResultCodeEnum, usersAPI } from "../api/api.ts";
import { updatObjectInArray } from "../utils/object-helpers";
import { ProfilePhotosType, UserType } from "../types/types";
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

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
        case 'FOLLOW':
            {
                return {
                    ...state,
                    users: updatObjectInArray(state.users, action.userId, 'id', { followed: true })
                };
            }
        case 'UNFOLLOW':
            {
                return {
                    ...state,
                    users: updatObjectInArray(state.users, action.userId, 'id', { followed: false })
                };
            }
        case 'SET_USERS':
            {
                return { ...state, users: action.users };
            }
        case 'SET_CURRENT_PAGE':
            {
                return { ...state, currentPage: action.currentPage };
            }
        case 'SET_TOTAL_COUNTS_USERS':
            {
                return { ...state, totalUsersCount: action.totalUsersCount };
            }
        case 'TOGGLE_IS_FETCHING':
            {
                return { ...state, isFetching: action.isFetching };
            }
        case 'TOGGLE_IS_FOLLOWING_PROGRESS':
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

// список всех ActionType через тип-обертку
type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    followSuccess: (userId: number) => ({ type: 'FOLLOW', userId } as const),
    unfollowSuccess: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
    setUsers: (users: Array<UserType>) => ({ type: 'SET_USERS', users } as const),
    setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage } as const),
    setUsersTotalCounts: (totalUsersCount: number) => ({ type: 'SET_TOTAL_COUNTS_USERS', totalUsersCount } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),
    toggleFollowingInProgress: (followingInProgress: boolean, userId: number) => ({ type: 'TOGGLE_IS_FOLLOWING_PROGRESS', followingInProgress, userId } as const)
}


// 1) первый варинат типизации thunk

// type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsTypes> //тип для dispapch
// export const getUsers = (currentPage: number, pageSize: number) => async (dispatch: DispatchType, getState: GetStateType) => {

// 2) второй вариант типизации thunk, как рекомендует оф документация redux

//общий тип для thunk
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUsers = (currentPage: number, pageSize: number): ThunkType => async (dispatch, getState) => {
    dispatch(actions.toggleIsFetching(true));

    let data = await usersAPI.getUsers(currentPage, pageSize);

    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setUsersTotalCounts(data.totalCount));
}

//вынесена общая логика ф-ций follow и unfollow
const _followUnfollowFlow = async (dispatch: DispatchType,
                                userId: number,
                                apiMethod: any,
                                actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingInProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode === ResultCodeEnum.Success) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingInProgress(false, userId));
}

export const follow = (userId: number): ThunkType => async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess);
}

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess);
}

export default usersReducer;