import React from 'react';
import s from './FriendItem.module.css';

const FriendItem = (props) => {
	return(
		<div>
			<div className={s.avatar}></div>
			<div>{ props.name }</div>
		</div>
	)
}

export default FriendItem;