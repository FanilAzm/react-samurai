import dialogsReducer, {addMessageActionCreator} from "./dialogsReducer";

let state = {
	messages: [
		{id: 1, message: 'Hi'},
		{id: 2, message: 'How are you it-kamasutra?'},
		{id: 3, message: 'Yo!'}
	]
}

it('Добавление нового сообщения', () => {
	let action = addMessageActionCreator('How are you?');

	let newState = dialogsReducer(state, action);

	expect(newState.messages.length).toBe(4);
})