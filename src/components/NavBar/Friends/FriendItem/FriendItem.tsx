import React, {FC} from 'react';
import s from './FriendItem.module.css';

type PropsType = {
  name: string
}

const FriendItem: FC<PropsType> = (props) => {
	return(
		<div>
			<div className={s.avatar}></div>
			<div>{ props.name }</div>
		</div>
	)
}

export default FriendItem;
