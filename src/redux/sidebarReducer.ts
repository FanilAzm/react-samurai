import {InferActionTypes} from "./redux-store";

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
type ActionsTypes = InferActionTypes<typeof actions>

const sidebarReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

	return state;
}

const actions = {}

export default sidebarReducer;
