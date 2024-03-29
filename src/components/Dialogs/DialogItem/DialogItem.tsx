import React, {FC} from 'react';
import { NavLink } from 'react-router-dom';
import s from '../Dialogs.module.css';

type PropsType = {
  id: number
  name: string
}

const DialogItem: FC<PropsType> = (props) => {
	const path = "/dialogs/" + props.id;
	return(
		<div className={s.dialog + ' ' + s.active}>
			<NavLink to={path}>
				<img />
				{props.name}
			</NavLink>
		</div>
	)
}

export default DialogItem;
