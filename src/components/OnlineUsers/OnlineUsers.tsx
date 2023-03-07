import React, {FC} from 'react';
import s from './OnlineUsers.module.css';

type PropsType = {}

const OnlineUsers: FC<PropsType> = () => {
	return(
		<div className={s.usersList}>
			Online Users
		</div>
	)
}

export default OnlineUsers;
