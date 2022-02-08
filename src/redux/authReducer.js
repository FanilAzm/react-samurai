import { stopSubmit } from 'redux-form';
import {authAPI, securityAPI} from '../api/api';

const SET_AUTH_USER_DATA = 'samurai-network/auth/SET_AUTH_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS';

const initialState = {
	id: null,
	login: null,
	email: null,
	isAuth: false,
	isFetching: false,
	captchaUrl: null
}

const authReducer = (state = initialState, action) => {
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

export const setAuthUserData = (id, login, email, isAuth) => ({type: SET_AUTH_USER_DATA, data: {id, login, email, isAuth}})
export const getCaptchaUrlSuccess = (captchaUrl) => ({type: GET_CAPTCHA_URL_SUCCESS, data: {captchaUrl}})

export const getAuthUserData = () => async (dispatch) => {
	let response = await authAPI.getAuth();
		
	if(response.resultCode === 0) {
		let {id, login, email} = response.data;
		dispatch(setAuthUserData(id, login, email, true));
	}
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
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

export const logout = () => async (dispatch) => {
	let response = await authAPI.logout()
		
	if(response.resultCode === 0) {
		dispatch(setAuthUserData(null, null, null, false));
	}
}

export const getCaptchaUrl = () => async (dispatch) => {
	const response = await securityAPI.getCaptchaUrl()
	const captchaUrl = response.data.url;	
	dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export default authReducer;