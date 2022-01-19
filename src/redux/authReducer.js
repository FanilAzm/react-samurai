import { stopSubmit } from 'redux-form';
import {authAPI} from '../api/api';

const SET_AUTH_USER_DATA = 'samurai-network/auth/SET_AUTH_USER_DATA';

const initialState = {
	id: null,
	login: null,
	email: null,
	isAuth: false,
	isFetching: false
}

const authReducer = (state = initialState, action) => {
	switch(action.type) {
		case SET_AUTH_USER_DATA: {
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

export const getAuthUserData = () => async (dispatch) => {
	let response = await authAPI.getAuth();
		
	if(response.resultCode === 0) {
		let {id, login, email} = response.data;
		dispatch(setAuthUserData(id, login, email, true));
	}
}

export const login = (email, password, rememberMe) => async (dispatch) => {
	let response = await authAPI.login(email, password, rememberMe);
		
	if(response.resultCode === 0) {
		dispatch(getAuthUserData());
	} else {
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

export default authReducer;