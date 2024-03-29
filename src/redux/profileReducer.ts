import {ResultCodesEnum} from '../api/api';
import {FormAction, stopSubmit} from 'redux-form';
import {PhotosType, PostType, ProfileType} from "../types/types";
import {BaseThunkType, InferActionTypes} from "./redux-store";
import {profileAPI} from "../api/profile-api";

let initialState = {
	posts: [
		{id: 1, message: "Hi, how are you?", likeCount: 15},
		{id: 2, message: "It's my first post", likeCount: 20}
	] as Array<PostType>,
	profile: null as ProfileType | null,
	status: ''
}

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch(action.type) {
		case 'ADD_POST': {
			const newPost = {
				id: 3,
				message: action.newPostText,
				likeCount: 0
			}

			return {
				...state,
				posts: [...state.posts, newPost]
			};
		}
		case 'SET_USERS_PROFILE': {
			return {
				...state,
				profile: action.profile
			}
		}
		case 'SET_STATUS': {
			return {
				...state,
				status: action.status
			}
		}
		case 'DELETE_POST': {
			return {
				...state,
				posts: state.posts.filter(p => p.id !== action.postId)
			}
		}
		case 'SET_PHOTO_SUCCESS': {
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

export const actions = {
  addPost: (newPostText: string) => ({type: 'ADD_POST', newPostText} as const),
  setUsersProfile: (profile: ProfileType) => ({type: 'SET_USERS_PROFILE', profile} as const),
  setStatus: (status: string) => ({type: 'SET_STATUS', status} as const),
  deletePost: (postId: number) => ({type: 'DELETE_POST', postId} as const),
  setPhotoSuccess: (photos: PhotosType) => ({type: 'SET_PHOTO_SUCCESS', photos} as const)
}

export const getProfile = (userId: number): ThunkType => async (dispatch) => {
	const data = await profileAPI.getProfileUser(userId);
	dispatch(actions.setUsersProfile(data));
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
	let data = await profileAPI.getStatus(userId);
	dispatch(actions.setStatus(data));
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
	let data = await profileAPI.updateStatus(status);
	if(data.resultCode === ResultCodesEnum.Success) {
		dispatch(actions.setStatus(status));
	}
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
	let data = await profileAPI.savePhoto(file);
	if(data.resultCode === ResultCodesEnum.Success) {
		dispatch(actions.setPhotoSuccess(data.data.photos));
	}
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
	const userId = getState().auth.id;
	let data = await profileAPI.saveProfile(profile);

	if(data.resultCode === ResultCodesEnum.Success) {
    if (userId !== null) {
      dispatch(getProfile(userId));
    } else {
      throw new Error("userId can't be null")
    }
	} else {
		  dispatch(stopSubmit("edit-profile", {_error: data.messages[0] }));
      return Promise.reject(data.messages[0]);
	}
}

export default profileReducer;
