import { stopSubmit } from 'redux-form';
import {authAPI, securityAPI} from '../api/api';

const SET_AUTH_USER_DATA = 'samurai-network/auth/SET_AUTH_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS';

const initialState = {
	id: null as number | null,
	login: null as string | null,
	email: null as string | null,
	isAuth: false,
	isFetching: false,
	captchaUrl: null as string | null
}

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialStateType => {
	switch(action.type) {
		case SET_AUTH_USER_DATA:
		case GET_CAPTCHA_URL_SUCCESS: {
			return {
				...state,
				...action.data
			}
		}
		default: {
			return state;
		}
	}
}

type SetAuthUserDataActionPayloadType = {
  id: number | null
  login: string | null
  email: string | null
  isAuth: boolean
}

type SetAuthUserDataActionType = {
  type: typeof SET_AUTH_USER_DATA
  data: SetAuthUserDataActionPayloadType
}

type getCaptchaUrlSuccessActionType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS
  data: { captchaUrl: string }
}

export const setAuthUserData = (id: number | null, login: string | null, email: string | null, isAuth: boolean): SetAuthUserDataActionType => ({type: SET_AUTH_USER_DATA, data: {id, login, email, isAuth}})
export const getCaptchaUrlSuccess = (captchaUrl: string): getCaptchaUrlSuccessActionType => ({type: GET_CAPTCHA_URL_SUCCESS, data: {captchaUrl}})

export const getAuthUserData = () => async (dispatch: any) => {
	let response = await authAPI.getAuth();

	if(response.resultCode === 0) {
		let {id, login, email} = response.data;
		dispatch(setAuthUserData(id, login, email, true));
	}
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: any) => async (dispatch: any) => {
	let response = await authAPI.login(email, password, rememberMe, captcha);

	if(response.resultCode === 0) {
		dispatch(getAuthUserData());
	} else {
		if(response.resultCode === 10) {
			dispatch(getCaptchaUrl());
		}
		let message = response.messages.length > 0 ? response.messages[0] : "Some error";
		dispatch(stopSubmit('login', {_error: message}));
	}
}

export const logout = () => async (dispatch: any) => {
	let response = await authAPI.logout()

	if(response.resultCode === 0) {
		dispatch(setAuthUserData(null, null, null, false));
	}
}

export const getCaptchaUrl = () => async (dispatch: any) => {
	const response = await securityAPI.getCaptchaUrl()
	const captchaUrl = response.data.url;
	dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export default authReducer;
