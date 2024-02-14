import { BaseThunkType, InferActionsTypes } from './redux-store';
import { APIResponseType, ResultCodeEnum } from "../api/api.ts";
import { usersAPI } from "../api/users-api.ts";
import { updatObjectInArray } from "../utils/object-helpers.ts";
import { UserType } from "../types/types";
import { Dispatch } from 'redux';

//стартовые данные
let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isFetching: false as boolean,
    followingInProgress: [] as Array<number>, // массив ид пользователей
    filter: {
        term: '' as string,
        friend: null as boolean | null
    }
};

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/USERS/FOLLOW':
            {
                return {
                    ...state,
                    users: updatObjectInArray(state.users, action.userId, 'id', { followed: true })
                };
            }
        case 'SN/USERS/UNFOLLOW':
            {
                return {
                    ...state,
                    users: updatObjectInArray(state.users, action.userId, 'id', { followed: false })
                };
            }
        case 'SN/USERS/SET_USERS':
            {
                return { ...state, users: action.users };
            }
        case 'SN/USERS/SET_FILTER':
            {
                return { ...state, filter: action.payload };
            }
        case 'SN/USERS/SET_CURRENT_PAGE':
            {
                return { ...state, currentPage: action.currentPage };
            }
        case 'SN/USERS/SET_TOTAL_COUNTS_USERS':
            {
                return { ...state, totalUsersCount: action.totalUsersCount };
            }
        case 'SN/USERS/TOGGLE_IS_FETCHING':
            {
                return { ...state, isFetching: action.isFetching };
            }
        case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS':
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

export const actions = {
    followSuccess: (userId: number) => ({ type: 'SN/USERS/FOLLOW', userId } as const),
    unfollowSuccess: (userId: number) => ({ type: 'SN/USERS/UNFOLLOW', userId } as const),
    setUsers: (users: Array<UserType>) => ({ type: 'SN/USERS/SET_USERS', users } as const),
    setFilter: (filter: FilterType) => ({ type: 'SN/USERS/SET_FILTER', payload: filter } as const),
    setCurrentPage: (currentPage: number) => ({ type: 'SN/USERS/SET_CURRENT_PAGE', currentPage } as const),
    setUsersTotalCounts: (totalUsersCount: number) => ({ type: 'SN/USERS/SET_TOTAL_COUNTS_USERS', totalUsersCount } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: 'SN/USERS/TOGGLE_IS_FETCHING', isFetching } as const),
    toggleFollowingInProgress: (followingInProgress: boolean, userId: number) => ({ type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS', followingInProgress, userId } as const)
}

export const getUsers = (currentPage: number, pageSize: number, filter: FilterType): ThunkType => async (dispatch, getState) => {
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setFilter(filter));

    let data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend);

    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setUsersTotalCounts(data.totalCount));
}

//вынесена общая логика ф-ций follow и unfollow
const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>,
                                userId: number,
                                apiMethod: (userId: number) => Promise<APIResponseType>,
                                actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingInProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.resultCode === ResultCodeEnum.Success) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingInProgress(false, userId));
}

export const follow = (userId: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess);
}

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess);
}

export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
// список всех ActionType через тип-обертку
type ActionsTypes = InferActionsTypes<typeof actions>
//общий тип для thunk
type ThunkType = BaseThunkType<ActionsTypes>

export default usersReducer;