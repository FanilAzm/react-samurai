export const getUsersSelector = (state) => {
	return state.usersPage.users;
}

export const getPageSizeSelector = (state) => {
	return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state) => {
	return state.usersPage.totalUsersCount;
}

export const getCurrentUserPage = (state) => {
	return state.usersPage.currentUserPage;
}

export const getIsFetching = (state) => {
	return state.usersPage.isFetching;
}

export const getFollowingProgress = (state) => {
	return state.usersPage.followingProgress;
}