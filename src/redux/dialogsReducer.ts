import {InferActionTypes} from "./redux-store";

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
type ActionsTypes = InferActionTypes<typeof actions>

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch(action.type) {
		case 'ADD_MESSAGE': {
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

export const actions = {
  addMessageActionCreator: (newMessageText: string) => ({type: 'ADD_MESSAGE', newMessageText} as const)
}

export default dialogsReducer;
