import dialogsReducer, {actions} from "./dialogsReducer";

let state = {
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

it('Добавление нового сообщения', () => {
	let action = actions.addMessageActionCreator('How are you?');

	let newState = dialogsReducer(state, action);

	expect(newState.messages.length).toBe(4);
})
