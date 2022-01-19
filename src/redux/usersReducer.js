import { usersAPI } from "../api/api";
import { updateObjectInArray } from '../utils/object-helper';

const FOLLOW = 'samurai-network/users/FOLLOW';
const UNFOLLOW = 'samurai-network/users/UNFOLLOW';
const SET_USERS = 'samurai-network/users/SET_USERS';
const SET_CURRENT_PAGE = 'samurai-network/users/SET_CURRENT_PAGE';
const SET_USERS_COUNT = 'samurai-network/users/SET_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'samurai-network/users/TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_PROGRESS = 'samurai-network/users/TOGGLE_FOLLOWING_PROGRESS';

const initialState = {
	users: [],
	pageSize: 4,
	totalUsersCount: 0,
	currentUserPage: 1,
	isFetching: false,
	followingProgress: []
}

const usersReducer = (state = initialState, action) => {
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

export const followSuccess = (userId) => ({type: FOLLOW, id: userId});
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, id: userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (pageNumber) => ({type: SET_CURRENT_PAGE, pageNumber});
export const setUsersCount = (usersCount) => ({type: SET_USERS_COUNT, usersCount});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFollowingProgress = (isFetching, userId) => ({type: TOGGLE_FOLLOWING_PROGRESS, isFetching, userId});

export const getUsers = (currentUserPage, pageSize) => async (dispatch) => {
	dispatch(toggleIsFetching(true));
	
	let data = await usersAPI.getUsers(currentUserPage, pageSize)
		
	dispatch(setUsers(data.items));
	dispatch(setUsersCount(data.totalCount));
	dispatch(toggleIsFetching(false));
		
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
	dispatch(toggleFollowingProgress(true, userId));

	let data = await apiMethod(userId);
		
	if(data.resultCode === 0) {
		dispatch(actionCreator(userId));
	}
	dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId) => async (dispatch) => {
	let apiMethod = usersAPI.postUser.bind(usersAPI);
	let actionCreator = followSuccess;
	
	followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
}

export const unfollow = (userId) => async (dispatch) => {
	let apiMethod = usersAPI.deleteUser.bind(usersAPI);
	let actionCreator = unfollowSuccess;
	
	followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
}



export default usersReducer;