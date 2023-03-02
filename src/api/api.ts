import axios from 'axios';
import {ContactsType, PhotosType, ProfileType, UserType} from "../types/types";

export const instance = axios.create({
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

export type GetItemsType = {
  items: Array<UserType>
  totalCount: number
  error: string | null
}

export type ResponseType<D = {}, RC = ResultCodesEnum> = {
  data: D
  resultCode: RC
  messages: Array<string>
}
