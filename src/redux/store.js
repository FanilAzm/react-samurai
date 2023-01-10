
import profileReducer from './profileReducer';
import dialogsReducer from './dialogsReducer';
import sidebarReducer from './sidebarReducer';

const store = {
	_state: {
		profilePage: {
			posts: [
				{id: 1, message: "Hi, how are you?", likeCount: "15"},
				{id: 2, message: "It's my first post", likeCount: "20"}
			],
			newPostText: ''
		},
		dialogsPage: {
			dialogs: [
				{id: 1, name: 'Valera'},
				{id: 2, name: 'Valera'},
				{id: 3, name: 'Valera'},
				{id: 4, name: 'Valera'}
			],
			messages: [
				{id: 1, message: 'Hi'},
				{id: 1, message: 'How are you it-kamasutra?'},
				{id: 1, message: 'Yo!'}
			],
			newMessageText: ''
		},
		siteBar: {
			friends: [
				{id: 1, name: 'Sasha'},
				{id: 2, name: 'Pasha'},
				{id: 3, name: 'Masha'}
			]
		}
	},
	_callSubscriber() {
		console.log('State changes');
	},
	getState() {
		return this._state;
	},
	subscribe(observer) {
		this._callSubscriber = observer;
	},
	dispatch(action) {

		profileReducer(this._state.profilePage, action);
		dialogsReducer(this._state.dialogsPage, action);
		sidebarReducer(this._state.siteBar, action);

		this._callSubscriber(this._state);
	}
}

window.store = store;

export default store;
