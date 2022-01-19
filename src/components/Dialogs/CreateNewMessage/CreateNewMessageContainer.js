import React from 'react';
import {addMessageActionCreator} from '../../../redux/dialogsReducer';
import CreateNewMessage from './CreateNewMessage';
import {connect} from 'react-redux';

const mapDispatchToProps = (dispatch) => {
	return {
		addMessage: (newMessageText) => {
			dispatch(addMessageActionCreator(newMessageText));
		}
	}
}

const CreateNewMessageContainer = connect(null, mapDispatchToProps)(CreateNewMessage);

export default CreateNewMessageContainer;