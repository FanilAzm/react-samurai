import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import s from './Dialogs.module.css';
import CreateNewMessageContainer from './CreateNewMessage/CreateNewMessageContainer';

const Dialogs = (props) => {

	const dialogsElements = props.state.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>);
	const messagesElements = props.state.messages.map(m => <Message key={m.id} message={m.message}/>);

	return(
		<div className={s.dialogs}>
			<div className={s.dialogsItems}>
				{ dialogsElements }
			</div>
			<div className={s.messages}>
				{ messagesElements }
				<CreateNewMessageContainer store={props.store} />
			</div>
		</div>
	)
}

export default Dialogs;