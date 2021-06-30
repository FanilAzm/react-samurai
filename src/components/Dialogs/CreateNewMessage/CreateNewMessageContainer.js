import React from 'react';
import {addMessageActionCreator, changeMessageTextActionCreator} from '../../../redux/dialogsReducer';
import CreateNewMessage from './CreateNewMessage';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
	return {
		newMessageText: state.dialogsPage.newMessageText
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addMessage: () => {
			dispatch(addMessageActionCreator());
		},
		changeMessageText: (text) => {
			let action = changeMessageTextActionCreator(text);
			dispatch(action);
		}
	}
}

const CreateNewMessageContainer = connect(mapStateToProps, mapDispatchToProps)(CreateNewMessage);

export default CreateNewMessageContainer;