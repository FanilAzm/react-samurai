import profileReducer, {actions} from './profileReducer';

let state = {
	posts: [
		{id: 1, message: "Hi, how are you?", likeCount: 15},
		{id: 2, message: "It's my first post", likeCount: 20}
	],
  profile: null,
  status: '',
  newPostText: ''
}

it('Добавление нового поста', () => {
	let action = actions.addPost('Test text')

	let newState = profileReducer(state, action);

	expect(newState.posts.length).toBe(3);
});

it('Удаление поста', () => {
	let action = actions.deletePost(1);

	let newState = profileReducer(state, action);

	expect(newState.posts.length).toBe(1)
})

it('Получение профиля', () => {
	let action = actions.setUsersProfile({fullName: 'Name', userId: 500});

	let newState = profileReducer(state, action);

	expect(newState.profile != null).toBe(true);
})

it('Получение статуса', () => {
	let action = actions.setStatus('Я получил статус');

	let newState = profileReducer(state, action);

	expect(newState.status != '').toBe(true);
})
