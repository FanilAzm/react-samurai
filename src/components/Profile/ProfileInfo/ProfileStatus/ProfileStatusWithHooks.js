import React, { useEffect, useState } from 'react';
import { setStatus } from '../../../../redux/profileReducer';
import s from '../ProfileInfo.module.css';

const ProfileStatusWithHooks = (props) =>  {

	[editMode, setEditMode] = useState(false);
	[status, setStatus] = useState(props.status);

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

	const onStatusChange = (e) => {
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