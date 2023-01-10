const ADD_MESSAGE = 'samurai-network/dialogs/ADD-MESSAGE';

type DialogType = {
  id: number
  name: string
}

type MessageType = {
  id: number
  message: string
}

let initialState = {
	dialogs: [
		{id: 1, name: 'Valera'},
		{id: 2, name: 'Valera'},
		{id: 3, name: 'Valera'},
		{id: 4, name: 'Valera'}
	] as Array<DialogType>,
	messages: [
		{id: 1, message: 'Hi'},
		{id: 2, message: 'How are you it-kamasutra?'},
		{id: 3, message: 'Yo!'}
	] as Array<MessageType>
}

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): InitialStateType => {
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

type addMessageActionCreatorType = {
  type: typeof ADD_MESSAGE
  newMessageText: string
}

export const addMessageActionCreator = (newMessageText: string): addMessageActionCreatorType => ({type: ADD_MESSAGE, newMessageText});

export default dialogsReducer;
