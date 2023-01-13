import axios from 'axios';
import {ContactsType, PhotosType, ProfileType, UserType} from "../types/types";

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	withCredentials: true,
	headers: {
		"API-KEY": "0d89e099-3709-4127-8745-9e8637327b4f"
	}
})

export enum ResultCodesEnum {
  Success = 0,
  Error = 1
}

export enum ResulCodeForCaptcha {
  CaptchaIsRequired = 10
}

type GetUsersResponseType = {
  items: Array<UserType>
  totalCount: number
  error: string | null
}

export const usersAPI = {
	getUsers(currentUserPage: number, pageSize: number){
		return instance
			.get<GetUsersResponseType>(`users?page=${currentUserPage}&count=${pageSize}`)
			.then(response => response.data)
	},
	postUser(userId: number) {
		return instance
			.post<number>(`follow/${userId}`)
			.then(response => response.data)
	},
	deleteUser(userId: number) {
		return instance
			.delete(`follow/${userId}`)
			.then(response => response.data)
	}
}

type UpdateStatusResponseType = {
  status: string
  resultCode: ResultCodesEnum
  messages: Array<string>
}

type SavePhotoResponseType = {
  photos: PhotosType
  resultCode: ResultCodesEnum
  messages: Array<string>
}

type SaveProfileResponseType = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: ContactsType
  resultCode: ResultCodesEnum
  messages: Array<string>
}

export const profileAPI = {
	getProfileUser(userId: number) {
		return instance
			.get<ProfileType>(`profile/` + userId)
			.then(response => response.data)
	},
	getStatus(userId: number) {
		return instance
			.get<string>(`profile/status/` + userId)
			.then(response => response.data)
	},
	updateStatus(status: string) {
		return instance
			.put<UpdateStatusResponseType>(`profile/status`, {status: status})
			.then(response => response.data)
	},
	savePhoto(photoFile: File) {
		const formData = new FormData();
		formData.append('image', photoFile);
		return instance.put<SavePhotoResponseType>(`profile/photo`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}).then(response => response.data)
	},
	saveProfile(profile: ProfileType) {
		return instance.put<SaveProfileResponseType>('profile', profile).then(response => response.data);
	}
}

type MeResponseType = {
  data: {
    id: number
    email: string
    login: string
  }
  resultCode: ResultCodesEnum
  messages: Array<string>
}

type LoginResponseType = {
  data: {
    userId: number
  }
  resultCode: ResultCodesEnum | ResulCodeForCaptcha
  messages: Array<string>
}

export const authAPI = {
	getAuth() {
		return instance
			.get<MeResponseType>(`auth/me`)
			.then(response => response.data);
	},
	login(email: string, password: string, rememberMe: boolean, captcha: string | null = null) {
		return instance
			.post<LoginResponseType>(`auth/login`, {email, password, rememberMe, captcha})
			.then(response => response.data);
	},
	logout() {
		return instance
			.delete(`auth/login`)
			.then(response => response.data);
	}
}

export const securityAPI = {
	getCaptchaUrl() {
		return instance.get(`security/get-captcha-url`);
	}
}
