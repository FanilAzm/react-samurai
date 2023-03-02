import { getAuthUserData } from "./authReducer";
import {InferActionTypes} from "./redux-store";

const initialState = {
	initialized: false
}

type InitialStateType = typeof initialState
type ActionsTypes = InferActionTypes<typeof actions>

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch(action.type) {
		case 'SET_INITIALIZED': {
			return {
				...state,
				initialized: true
			}
		}
		default: {
			return state;
		}
	}
}

const actions = {
  initializedApp: () => ({type: 'SET_INITIALIZED'} as const)
}

export const initialized = () => (dispatch: any) => {
	const promise = dispatch(getAuthUserData());

	Promise.all([promise])
		.then(() => {
			dispatch(actions.initializedApp());
		})
}

export default appReducer;
