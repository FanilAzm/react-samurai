import React, {FC} from 'react';
import FriendItem from './FriendItem/FriendItem';
import s from './Friends.module.css';
import {FriendType} from "../../../types/types";

type PropsType = {
  friends: Array<FriendType>
}

const Friends: FC<PropsType> = (props) => {
	const friend = props.friends.map(friend => <FriendItem key={friend.id} name={friend.name}/>);

	return(
		<div>
			<div className={s.title}>Friends</div>
			<div className={s.items}>
				{ friend }
			</div>
		</div>
	)
}

export default Friends;
