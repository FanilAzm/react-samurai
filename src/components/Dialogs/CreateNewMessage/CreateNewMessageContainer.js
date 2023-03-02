import React from 'react';
import {actions} from '../../../redux/dialogsReducer';
import CreateNewMessage from './CreateNewMessage';
import {connect} from 'react-redux';

const mapDispatchToProps = (dispatch) => {
	return {
		addMessage: (newMessageText) => {
			dispatch(actions.addMessageActionCreator(newMessageText));
		}
	}
}

const CreateNewMessageContainer = connect(null, mapDispatchToProps)(CreateNewMessage);

export default CreateNewMessageContainer;
