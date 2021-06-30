const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_MESSAGE_TEXT = 'UPDATE-MESSAGE-TEXT';

let initialState = {
	dialogs: [
		{id: 1, name: 'Valera'},
		{id: 2, name: 'Valera'},
		{id: 3, name: 'Valera'},
		{id: 4, name: 'Valera'}
	],
	messages: [
		{id: 1, message: 'Hi'},
		{id: 2, message: 'How are you it-kamasutra?'},
		{id: 3, message: 'Yo!'}
	],
	newMessageText: ''
}

const dialogsReducer = (state = initialState, action) => {
	switch(action.type) {
		case ADD_MESSAGE: {
			const newMessage = {
				id: 1,
				message: state.newMessageText
			}
			
			return {
				...state,
				newMessageText: '',
				messages: [...state.messages, newMessage]
			};
		}
		case UPDATE_MESSAGE_TEXT: {
			return {
				...state,
				newMessageText: action.newText
			};
		}
		default: {
			return state;
		}
	}
}

export const addMessageActionCreator = () => ({type: ADD_MESSAGE});
export const changeMessageTextActionCreator = (text) => {
	return {
		type: UPDATE_MESSAGE_TEXT,
		newText: text
	}
}

export default dialogsReducer;