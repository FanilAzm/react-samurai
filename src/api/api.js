import * as axios from 'axios';

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	withCredentials: true,
	headers: {
		"API-KEY": "0d89e099-3709-4127-8745-9e8637327b4f"
	}
})

export const usersAPI = {
	getUsers(currentUserPage, pageSize){
		return instance
			.get(`users?page=${currentUserPage}&count=${pageSize}`)
			.then(response => response.data)
	},
	postUser(userId) {
		return instance
			.post(`follow/${userId}`)
			.then(response => response.data)
	},
	deleteUser(userId) {
		return instance
			.delete(`follow/${userId}`)
			.then(response => response.data)
	}
}

export const profileAPI = {
	getProfileUser(userId) {
		return instance
			.get(`profile/` + userId)
			.then(response => response.data)
	},
	getStatus(userId) {
		return instance
			.get(`profile/status/` + userId)
			.then(response => response.data)
	},
	updateStatus(status) {
		return instance
			.put(`profile/status`, {status: status})
			.then(response => response.data)
	},
	savePhoto(photoFile) {
		const formData = new FormData();
		formData.append('image', photoFile);
		return instance.put(`profile/photo`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	},
	saveProfile(profile) {
		return instance.put('/profile', profile)
	}
}

export const authAPI = {
	getAuth() {
		return instance
			.get(`auth/me`)
			.then(response => response.data);
	},
	login(email, password, rememberMe, captcha = null) {
		return instance
			.post(`auth/login`, {email, password, rememberMe, captcha})
			.then(response => response.data);
	},
	logout() {
		return instance
			.delete(`auth/login`)
			.then(response => response.data);
	}
}

export const securityAPI = {
	getCaptchaUrl() {
		return instance.get(`security/get-captcha-url`);
	}
}