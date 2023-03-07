import React from 'react';
import {InjectedFormProps, reduxForm} from 'redux-form';
import { required, maxLengthCreator } from '../../../utils/validators';
import {createField, Textarea} from '../../common/FormControls/FormControls';
import { NewMessageFormValuesType } from '../Dialogs';

import s from './CreateNewMessage.module.css';

const maxLength10 = maxLengthCreator(10);

type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormValuesType, string>
type PropsType = {}

const CreateNewMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType> = (props) => {
	return(
		<form className={s.newMessage} onSubmit={props.handleSubmit}>
      {createField<NewMessageFormValuesKeysType>("Enter your message", "newMessageText", [required, maxLength10], Textarea)}
			<button>Send</button>
		</form>
	)
}

export default reduxForm<NewMessageFormValuesType>({
	form: 'CreateNewMessage'
})(CreateNewMessageForm);
