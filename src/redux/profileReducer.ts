import {profileAPI} from '../api/api';
import { stopSubmit } from 'redux-form';
import {PhotosType, PostType, ProfileType} from "../types/types";

const ADD_POST = 'samurai-network/profile/ADD-POST';
const SET_USERS_PROFILE = 'samurai-network/profile/SET_USERS_PROFILE';
const SET_STATUS = 'samurai-network/profile/SET_STATUS';
const DELETE_POST = 'samurai-network/profile/DELETE_POST';
const SET_PHOTO_SUCCESS = 'samurai-network/profile/SET_PHOTO_SUCCESS';

let initialState = {
	posts: [
		{id: 1, message: "Hi, how are you?", likeCount: 15},
		{id: 2, message: "It's my first post", likeCount: 20}
	] as Array<PostType>,
	profile: null as ProfileType | null,
	status: '',
  newPostText: ''
}

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): InitialStateType => {
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
		case SET_PHOTO_SUCCESS: {
			return {
				...state,
				profile: {...state.profile, photos: action.photos} as ProfileType
			}
		}
		default: {
			return state;
		}
	}
}

type AddPostActionCreatorType = {
  type: typeof ADD_POST
  newPostText: string
}
export const addPostActionCreator = (newPostText: string): AddPostActionCreatorType => ({type: ADD_POST, newPostText});
type SetUsersProfileType = {
  type: typeof SET_USERS_PROFILE
  profile: ProfileType
}
export const setUsersProfile = (profile: ProfileType): SetUsersProfileType => ({type: SET_USERS_PROFILE, profile});
type SetStatusType = {
  type: typeof SET_STATUS
  status: string
}
export const setStatus = (status: string): SetStatusType => ({type: SET_STATUS, status});
type DeletePostActionCreator = {
  type: typeof DELETE_POST
  postId: number
}
export const deletePostActionCreator = (postId: number): DeletePostActionCreator => ({type: DELETE_POST, postId});
type SetPhotoSuccess = {
  type: typeof SET_PHOTO_SUCCESS
  photos: PhotosType
}
export const setPhotoSuccess = (photos: PhotosType): SetPhotoSuccess => ({type: SET_PHOTO_SUCCESS, photos});

export const getProfile = (userId: number) => async (dispatch: any) => {
	let data = await profileAPI.getProfileUser(userId);
	dispatch(setUsersProfile(data));
}

export const getStatus = (userId: number) => async (dispatch: any) => {
	let data = await profileAPI.getStatus(userId);
	dispatch(setStatus(data));
}

export const updateStatus = (status: string) => async (dispatch: any) => {
	let data = await profileAPI.updateStatus(status);
	if(data.resultCode === 0) {
		dispatch(setStatus(status));
	}
}

export const savePhoto = (file: any) => async (dispatch: any) => {
	let data = await profileAPI.savePhoto(file);
	if(data.resultCode === 0) {
		dispatch(setPhotoSuccess(data.photos));
	}
}

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
	const userId = getState().auth.userId;
	let data = await profileAPI.saveProfile(profile);
	if(data.resultCode === 0) {
		dispatch(getProfile(userId));
	} else {
		dispatch(stopSubmit("edit-profile", {_error: data.messages[0] }));
        return Promise.reject(data.messages[0]);
	}
}

export default profileReducer;
