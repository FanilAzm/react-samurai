import {profileAPI} from '../api/api';

const ADD_POST = 'samurai-network/profile/ADD-POST';
const SET_USERS_PROFILE = 'samurai-network/profile/SET_USERS_PROFILE';
const SET_STATUS = 'samurai-network/profile/SET_STATUS';
const DELETE_POST = 'samurai-network/profile/DELETE_POST';

let initialState = {
	posts: [
		{id: 1, message: "Hi, how are you?", likeCount: "15"},
		{id: 2, message: "It's my first post", likeCount: "20"}
	],
	profile: null,
	status: ''
}

const profileReducer = (state = initialState, action) => {
	switch(action.type) {
		case ADD_POST: {
			const newPost = {
				id: 3,
				message: action.newPostText,
				likeCount: 0
			}
			
			return {
				...state,
				newPostText: '',
				posts: [...state.posts, newPost]
			};
		}
		case SET_USERS_PROFILE: {
			return {
				...state,
				profile: action.profile
			}
		}
		case SET_STATUS: {
			return {
				...state,
				status: action.status
			}
		}
		case DELETE_POST: {
			return {
				...state,
				posts: state.posts.filter(p => p.id != action.postId)
			}
		}
		default: {
			return state;
		}
	}
}

export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText});
export const setUsersProfile = (profile) => ({type: SET_USERS_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});
export const deletePostActionCreator = (postId) => ({type: DELETE_POST, postId});

export const getProfile = (userId) => async (dispatch) => {
	let data = await profileAPI.getProfileUser(userId);
		
	dispatch(setUsersProfile(data));
		
}

export const getStatus = (userId) => async (dispatch) => {
	let data = await profileAPI.getStatus(userId);
		
	dispatch(setStatus(data));
		
}

export const updateStatus = (status) => async (dispatch) => {
	let data = await profileAPI.updateStatus(status);
		
	if(data.resultCode === 0) {
		dispatch(setStatus(status));
	}
}

export default profileReducer;