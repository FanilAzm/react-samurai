type FriendsType = {
  id: number
  name: string
}

let initialState = {
	friends: [
		{id: 1, name: 'Sasha'},
		{id: 2, name: 'Pasha'},
		{id: 3, name: 'Masha'}
	] as Array<FriendsType>
}

export type InitialStateType = typeof initialState

const sidebarReducer = (state = initialState, action: any): InitialStateType => {

	return state;
}

export default sidebarReducer;