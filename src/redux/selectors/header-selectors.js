export const getHeaderIsAuthSelector = (state) => {
	return state.auth.isAuth;
}

export const getLoginSelector = (state) => {
	return state.auth.login;
}