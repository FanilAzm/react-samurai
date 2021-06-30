import React from 'react';
import s from './CreateNewMessage.module.css';


const CreateNewMessage = (props) => {
	let newMessageElement = React.createRef();

	const onAddMessage = () => {
		props.addMessage();
	}

	const onChangeMessage = () => {
		let text = newMessageElement.current.value;
		props.changeMessageText(text);
	}

	return(
		<div className={s.newMessage}>
			<input onChange={onChangeMessage} ref={newMessageElement} type="text" value={props.newMessageText}/>
			<button onClick={onAddMessage}>Send</button>
		</div>
	)
}

export default CreateNewMessage;