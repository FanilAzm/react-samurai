import {AppStoreType} from "../redux-store";

export const getProfileSelector = (state: AppStoreType) => {
	return state.profilePage.profile;
}

export const getStatusSelector = (state: AppStoreType) => {
	return state.profilePage.status;
}

export const getAuthorizedUserId = (state: AppStoreType) => {
	return state.auth.id;
}

export const getIsAuth = (state: AppStoreType) => {
	return state.auth.isAuth;
}
