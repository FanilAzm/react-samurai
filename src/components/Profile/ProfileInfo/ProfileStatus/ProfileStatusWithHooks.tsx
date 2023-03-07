import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import s from '../ProfileInfo.module.css';

type PropsType = {
  status: string
  updateStatus: (status: string) => void

}

const ProfileStatusWithHooks: FC<PropsType> = (props) =>  {

	const [editMode, setEditMode] = useState(false);
	const [status, setStatus] = useState(props.status);

	useEffect(() => {
		setStatus(props.status)
	}, [props.status]);

	const activateEditMode = () => {
		setEditMode(true);
	}

	const deactivateEditMode = () => {
		setEditMode(false);
		props.updateStatus(status);
	}

	const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
		setStatus(e.currentTarget.value);
	}

	return(
		<div className={s.status}>
			{
				editMode
					? <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status} />
					: <span onDoubleClick={activateEditMode}>{props.status && "-------"}</span>
			}
		</div>
	)
}

export default ProfileStatusWithHooks;
