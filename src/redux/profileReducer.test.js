import profileReducer, {addPostActionCreator, deletePostActionCreator, setStatus, setUsersProfile} from './profileReducer';

let state = {
	posts: [
		{id: 1, message: "Hi, how are you?", likeCount: "15"},
		{id: 2, message: "It's my first post", likeCount: "20"}
	],
	profile: null,
	status: ''
}

it('Добавление нового поста', () => {
	let action = addPostActionCreator('Test text')

	let newState = profileReducer(state, action);

	expect(newState.posts.length).toBe(3);
});

it('Удаление поста', () => {
	let action = deletePostActionCreator(1);

	let newState = profileReducer(state, action);

	expect(newState.posts.length).toBe(1)
})

it('Получение профиля', () => {
	let action = setUsersProfile({fullName: 'Name', userId: '500'});

	let newState = profileReducer(state, action);

	expect(Object.keys(newState.profile).length != 0).toBe(true);
})

it('Получение статуса', () => {
	let action = setStatus('Я получил статус');

	let newState = profileReducer(state, action);

	expect(newState.status != false).toBe(true);
})