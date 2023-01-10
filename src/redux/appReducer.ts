import { getAuthUserData } from "./authReducer";

const SET_INITIALIZED = 'samurai-network/app/SET_INITIALIZED';

type InitialStateType = {
  initialized: boolean
}

const initialState: InitialStateType = {
	initialized: false
}

const appReducer = (state = initialState, action: any): InitialStateType => {
	switch(action.type) {
		case SET_INITIALIZED: {
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

type InitializedAppActionType = {
  type: typeof SET_INITIALIZED
}

export const initializedApp = (): InitializedAppActionType => ({type: SET_INITIALIZED})

export const initialized = () => (dispatch: any) => {
	const promise = dispatch(getAuthUserData());

	Promise.all([promise])
		.then(() => {
			dispatch(initializedApp());
		})
}

export default appReducer;
