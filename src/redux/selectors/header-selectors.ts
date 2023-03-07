import {AppStoreType} from "../redux-store";

export const getHeaderIsAuthSelector = (state: AppStoreType) => {
	return state.auth.isAuth;
}

export const getLoginSelector = (state: AppStoreType) => {
	return state.auth.login;
}
