import {Dispatch} from "redux";
import {usersAPI} from "../api/users-api";
import { updateObjectInArray } from '../utils/object-helper';
import {PhotosType, UserType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStoreType, InferActionTypes} from "./redux-store";

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
		case 'FOLLOW': {
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
		case 'UNFOLLOW': {
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
		case 'SET_USERS': {
			return {
				...state,
				users: action.users
			}
		}
		case 'SET_CURRENT_PAGE': {
			return {
				...state,
				currentUserPage: action.pageNumber
			}
		}
		case 'SET_USERS_COUNT': {
			return {
				...state,
				totalUsersCount: action.usersCount
			}
		}
		case 'TOGGLE_IS_FETCHING': {
			return {
				...state,
				isFetching: action.isFetching
			}
		}
		case 'TOGGLE_FOLLOWING_PROGRESS': {
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

type ActionsTypes = InferActionTypes<typeof actions>;

export const actions = {
  followSuccess: (userId: number) => ({type: 'FOLLOW', id: userId} as const),
  unfollowSuccess: (userId: number) => ({type: 'UNFOLLOW', id: userId} as const),
  setUsers: (users: Array<UserType>) => ({type: 'SET_USERS', users} as const),
  setCurrentPage: (pageNumber: number) => ({type: 'SET_CURRENT_PAGE', pageNumber} as const),
  setUsersCount: (usersCount: number) => ({type: 'SET_USERS_COUNT', usersCount} as const),
  toggleIsFetching: (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching} as const),
  toggleFollowingProgress: (isFetching: boolean, userId: number) => ({type: 'TOGGLE_FOLLOWING_PROGRESS', isFetching, userId} as const),
}


type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, ActionsTypes>

export const getUsers = (currentUserPage: number, pageSize: number): ThunkType => async (dispatch, getState) => {
	dispatch(actions.toggleIsFetching(true));

	let data = await usersAPI.getUsers(currentUserPage, pageSize)

	dispatch(actions.setUsers(data.items));
	dispatch(actions.setUsersCount(data.totalCount));
	dispatch(actions.toggleIsFetching(false));

}

const _followUnfollowFlow = async (
  dispatch: DispatchType,
  userId: number,
  apiMethod: any,
  actionCreator: (userId: number) => ActionsTypes
) => {
	dispatch(actions.toggleFollowingProgress(true, userId));

	let data = await apiMethod(userId);

	if(data.resultCode === 0) {
		dispatch(actionCreator(userId));
	}
	dispatch(actions.toggleFollowingProgress(false, userId));
}

export const follow = (userId: number): ThunkType => async (dispatch) => {
	let apiMethod = usersAPI.postUser.bind(usersAPI);
	let actionCreator = actions.followSuccess;

	_followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
}

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
	let apiMethod = usersAPI.deleteUser.bind(usersAPI);
	let actionCreator = actions.unfollowSuccess;

	_followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
}



export default usersReducer;
