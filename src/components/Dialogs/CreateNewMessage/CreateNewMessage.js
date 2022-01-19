import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required, maxLengthCreator } from '../../../utils/validators';
import { Input } from '../../common/FormControls/FormControls';

import s from './CreateNewMessage.module.css';


const CreateNewMessage = (props) => {

	const onAddMessage = (values) => {
		props.addMessage(values.newMessageText);
	}

	return(
		<CreateNewMessageReduxForm onSubmit={onAddMessage}/>
	)
}

const maxLength10 = maxLengthCreator(10);

const CreateNewMessageForm = (props) => {
	return(
		<form className={s.newMessage} onSubmit={props.handleSubmit}>
			<Field
				type="text"
				component={Input}
				name="newMessageText"
				validate={[required, maxLength10]}
			/>
			<button>Send</button>
		</form>
	)
}

const CreateNewMessageReduxForm = reduxForm({
	form: 'CreateNewMessage'
})(CreateNewMessageForm);

export default CreateNewMessage;