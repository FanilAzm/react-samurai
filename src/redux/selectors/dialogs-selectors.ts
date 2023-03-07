import {AppStoreType} from "../redux-store";

export const getDialogsPageState = (state: AppStoreType) => {
	return state.dialogsPage;
}
