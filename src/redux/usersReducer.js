import { usersAPI } from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_USERS_COUNT = 'SET_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE_FOLLOWING_PROGRESS';

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
				users: state.users.map(user => {
					if(user.id === action.id) {
						return {...user, followed: true}
					}
					return user;
				})
			}
		}
		case UNFOLLOW: {
			return {
				...state,
				users: state.users.map(user => {
					if(user.id === action.id) {
						return {...user, followed: false}
					}
					return user;
				})
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

export const follow = (userId) => ({type: FOLLOW, id: userId});
export const unfollow = (userId) => ({type: UNFOLLOW, id: userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (pageNumber) => ({type: SET_CURRENT_PAGE, pageNumber});
export const setUsersCount = (usersCount) => ({type: SET_USERS_COUNT, usersCount});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFollowingProgress = (isFetching, userId) => ({type: TOGGLE_FOLLOWING_PROGRESS, isFetching, userId});

export default usersReducer;