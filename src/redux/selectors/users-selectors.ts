import {AppStoreType} from "../redux-store";

export const getUsersSelector = (state: AppStoreType) => {
	return state.usersPage.users;
}

export const getPageSizeSelector = (state: AppStoreType) => {
	return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state: AppStoreType) => {
	return state.usersPage.totalUsersCount;
}

export const getCurrentUserPage = (state: AppStoreType) => {
	return state.usersPage.currentUserPage;
}

export const getIsFetching = (state: AppStoreType) => {
	return state.usersPage.isFetching;
}

export const getFollowingProgress = (state: AppStoreType) => {
	return state.usersPage.followingProgress;
}
