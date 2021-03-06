export const getProfileSelector = (state) => {
	return state.profilePage.profile;
}

export const getStatusSelector = (state) => {
	return state.profilePage.status;
}

export const getAuthorizedUserId = (state) => {
	return state.auth.id;
}

export const getIsAuth = (state) => {
	return state.auth.isAuth;
}