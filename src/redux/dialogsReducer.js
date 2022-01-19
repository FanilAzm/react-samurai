const ADD_MESSAGE = 'samurai-network/dialogs/ADD-MESSAGE';

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
	]
}

const dialogsReducer = (state = initialState, action) => {
	switch(action.type) {
		case ADD_MESSAGE: {
			let body = action.newMessageText;
			
			return {
				...state,
				messages: [...state.messages, {id: 1, message: body}]
			};
		}
		default: {
			return state;
		}
	}
}

export const addMessageActionCreator = (newMessageText) => ({type: ADD_MESSAGE, newMessageText});

export default dialogsReducer;