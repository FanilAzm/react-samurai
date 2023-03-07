import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import s from './Dialogs.module.css';
import { InitialStateType } from '../../redux/dialogsReducer';
import CreateNewMessageForm from './CreateNewMessage/CreateNewMessageForm';

type PropsType = {
  state: InitialStateType
  addMessage: (messageText: string) => void
}

export type NewMessageFormValuesType = {
  newMessageText: string
}

const Dialogs: React.FC<PropsType> = (props) => {
  const state = props.state

	const dialogsElements = state.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>);
	const messagesElements = state.messages.map(m => <Message key={m.id} message={m.message}/>);

  const onAddMessage = (values: NewMessageFormValuesType) => {
    props.addMessage(values.newMessageText);
  }

	return(
		<div className={s.dialogs}>
			<div className={s.dialogsItems}>
				{ dialogsElements }
			</div>
			<div className={s.messages}>
				{ messagesElements }
				<CreateNewMessageForm onSubmit={onAddMessage} />
			</div>
		</div>
	)
}

export default Dialogs;
