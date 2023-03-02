import {FormAction, stopSubmit} from 'redux-form';
import {ResulCodeForCaptcha, ResultCodesEnum} from '../api/api';
import {BaseThunkType, InferActionTypes} from "./redux-store";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";

const initialState = {
  id: null as number | null,
	login: null as string | null,
	email: null as string | null,
	isAuth: false,
	isFetching: false,
	captchaUrl: null as string | null
}

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch(action.type) {
		case 'SET_AUTH_USER_DATA':
		case 'GET_CAPTCHA_URL_SUCCESS': {
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

const actions = {
  setAuthUserData: (id: number | null, login: string | null, email: string | null, isAuth: boolean) => ({type: 'SET_AUTH_USER_DATA', data: {id, login, email, isAuth}} as const),
  getCaptchaUrlSuccess: (captchaUrl: string) => ({type: 'GET_CAPTCHA_URL_SUCCESS', data: {captchaUrl}} as const)
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
	let response = await authAPI.getAuth();

	if(response.resultCode === ResultCodesEnum.Success) {
		let {id, login, email} = response.data;
		dispatch(actions.setAuthUserData(id, login, email, true));
	}
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
	let response = await authAPI.login(email, password, rememberMe, captcha);

	if(response.resultCode === ResultCodesEnum.Success) {
		dispatch(getAuthUserData());
	} else {
		if(response.resultCode === ResulCodeForCaptcha.CaptchaIsRequired) {
			dispatch(getCaptchaUrl());
		}
		let message = response.messages.length > 0 ? response.messages[0] : "Some error";
		dispatch(stopSubmit('login', {_error: message}));
	}
}

export const logout = (): ThunkType => async (dispatch) => {
	let response = await authAPI.logout()

	if(response.resultCode === ResultCodesEnum.Success) {
		dispatch(actions.setAuthUserData(null, null, null, false));
	}
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
	const data = await securityAPI.getCaptchaUrl()
	const captchaUrl = data.url;
	dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
}

export default authReducer;
