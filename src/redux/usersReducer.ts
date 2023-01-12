import { usersAPI } from "../api/api";
import { updateObjectInArray } from '../utils/object-helper';
import {PhotosType, UserType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStoreType} from "./redux-store";
import {Dispatch} from "redux";

const FOLLOW = 'samurai-network/users/FOLLOW';
const UNFOLLOW = 'samurai-network/users/UNFOLLOW';
const SET_USERS = 'samurai-network/users/SET_USERS';
const SET_CURRENT_PAGE = 'samurai-network/users/SET_CURRENT_PAGE';
const SET_USERS_COUNT = 'samurai-network/users/SET_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'samurai-network/users/TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_PROGRESS = 'samurai-network/users/TOGGLE_FOLLOWING_PROGRESS';

const initialState = {
	users: [] as Array<UserType>,
	pageSize: 4,
	totalUsersCount: 0,
	currentUserPage: 1,
	isFetching: false,
	followingProgress: [] as Array<number> // array of users ids
}

export type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch(action.type) {
		case FOLLOW: {
			return {
				...state,
				users: updateObjectInArray(state.users, action.id, 'id', {followed: true})
				// users: state.users.map(user => {
				// 	if(user.id === action.id) {
				// 		return {...user, followed: true}
				// 	}
				// 	return user;
				// })
			}
		}
		case UNFOLLOW: {
			return {
				...state,
				users: updateObjectInArray(state.users, action.id, 'id', {followed: false})
				// users: state.users.map(user => {
				// 	if(user.id === action.id) {
				// 		return {...user, followed: false}
				// 	}
				// 	return user;
				// })
			}
		}
		case SET_USERS: {
			return {
				...state,
				users: action.users
			}
		}
		case SET_CURRENT_PAGE: {
			return {
				...state,
				currentUserPage: action.pageNumber
			}
		}
		case SET_USERS_COUNT: {
			return {
				...state,
				totalUsersCount: action.usersCount
			}
		}
		case TOGGLE_IS_FETCHING: {
			return {
				...state,
				isFetching: action.isFetching
			}
		}
		case TOGGLE_FOLLOWING_PROGRESS: {
			return {
				...state,
				followingProgress: action.isFetching
					? [...state.followingProgress, action.userId]
					: state.followingProgress.filter(id => id != action.userId)
			}
		}
		default: {
			return state;
		}
	}
}

type ActionsTypes = followSuccessActionType | unfollowSuccessActionType | setUsersActionType | setCurrentPageActionType |
  setUsersCountActionType | toggleIsFetchingActionType | toggleFollowingProgress;

type followSuccessActionType = {
  type: typeof FOLLOW
  id: number
}
export const followSuccess = (userId: number): followSuccessActionType => ({type: FOLLOW, id: userId});
type unfollowSuccessActionType = {
  type: typeof UNFOLLOW
  id: number
}
export const unfollowSuccess = (userId: number): unfollowSuccessActionType => ({type: UNFOLLOW, id: userId});
type setUsersActionType = {
  type: typeof SET_USERS
  users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): setUsersActionType => ({type: SET_USERS, users});
type setCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE
  pageNumber: number
}
export const setCurrentPage = (pageNumber: number): setCurrentPageActionType => ({type: SET_CURRENT_PAGE, pageNumber});
type setUsersCountActionType = {
  type: typeof SET_USERS_COUNT
  usersCount: number
}
export const setUsersCount = (usersCount: number): setUsersCountActionType => ({type: SET_USERS_COUNT, usersCount});
type toggleIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING
  isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingActionType => ({type: TOGGLE_IS_FETCHING, isFetching});
type toggleFollowingProgress = {
  type: typeof TOGGLE_FOLLOWING_PROGRESS
  isFetching: boolean
  userId: number
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number): toggleFollowingProgress => ({type: TOGGLE_FOLLOWING_PROGRESS, isFetching, userId});

type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, ActionsTypes>

export const getUsers = (currentUserPage: number, pageSize: number): ThunkType => async (dispatch, getState) => {
	dispatch(toggleIsFetching(true));

	let data = await usersAPI.getUsers(currentUserPage, pageSize)

	dispatch(setUsers(data.items));
	dispatch(setUsersCount(data.totalCount));
	dispatch(toggleIsFetching(false));

}

const _followUnfollowFlow = async (
  dispatch: DispatchType,
  userId: number,
  apiMethod: any,
  actionCreator: (userId: number) => followSuccessActionType | unfollowSuccessActionType
) => {
	dispatch(toggleFollowingProgress(true, userId));

	let data = await apiMethod(userId);

	if(data.resultCode === 0) {
		dispatch(actionCreator(userId));
	}
	dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId: number): ThunkType => async (dispatch) => {
	let apiMethod = usersAPI.postUser.bind(usersAPI);
	let actionCreator = followSuccess;

	_followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
}

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
	let apiMethod = usersAPI.deleteUser.bind(usersAPI);
	let actionCreator = unfollowSuccess;

	_followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
}



export default usersReducer;
