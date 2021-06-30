const ADD_POST = 'ADD-POST';
const UPDATE_POST_TEXT = 'UPDATE-POST-TEXT';
const SET_USERS_PROFILE = 'SET_USERS_PROFILE';

let initialState = {
	posts: [
		{id: 1, message: "Hi, how are you?", likeCount: "15"},
		{id: 2, message: "It's my first post", likeCount: "20"}
	],
	newPostText: '',
	profile: null
}

const profileReducer = (state = initialState, action) => {
	switch(action.type) {
		case ADD_POST: {
			const newPost = {
				id: 3,
				message: state.newPostText,
				likeCount: 0
			}
			
			return {
				...state,
				newPostText: '',
				posts: [...state.posts, newPost]
			};
		}
		case UPDATE_POST_TEXT: {
			return {
				...state,
				newPostText: action.newText
			};
		}
		case SET_USERS_PROFILE: {
			return {
				...state,
				profile: action.profile
			}
		}
		default: {
			return state;
		}
	}
}

export const addPostActionCreator = () => ({type: ADD_POST});
export const changePostTextActionCreator = (text) => ({type: UPDATE_POST_TEXT, newText: text});
export const setUsersProfile = (profile) => ({type: SET_USERS_PROFILE, profile});

export default profileReducer;