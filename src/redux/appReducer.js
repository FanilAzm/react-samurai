import { getAuthUserData } from "./authReducer";

const SET_INITIALIZED = 'samurai-network/app/SET_INITIALIZED';

const initialState = {
	initialized: false,
}

const appReducer = (state = initialState, action) => {
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

export const initializedApp = () => ({type: SET_INITIALIZED})

export const initialized = () => (dispatch) => {
	const promise = dispatch(getAuthUserData());

	Promise.all([promise])
		.then(() => {
			dispatch(initializedApp());
		})
}

export default appReducer;