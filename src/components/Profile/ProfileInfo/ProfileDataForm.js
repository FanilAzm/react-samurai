import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input, Textarea } from '../../common/FormControls/FormControls';
import s from './ProfileInfo.module.css';
import iconSave from '../../../assets/images/icon-save.png';
import styles from '../../common/FormControls/FormControl.module.css';

const ProfileDataForm = (props) => {
	return(
		<form className={s.editForm} onSubmit={props.handleSubmit}>
			<button className={s.editBtn}><img src={iconSave} /></button>
			{
				props.error && <div className={styles.formError}>{props.error}</div>
			}
			<div className={s.formControl}>
				<label>Имя:</label>
				<Field type="text" name="fullName" component={Input} />
			</div>
			<div className={s.formControl}>
				<label>Поиск работы:</label>
				<Field type="checkbox" name="lookingForAJob" component={Input} />
			</div>
			<div className={s.formControl}>
				<label>Мои навыки:</label>
				<Field type="textarea" name="lookingForAJobDescription" component={Textarea} />
			</div>
			<div className={s.formControl}>
				<label>Обо мне:</label>
				<Field type="textarea" name="aboutMe" component={Textarea} />
			</div>
			{
				Object.keys(props.profile.contacts).map(key => {
					return(
						<div key={key} className={s.formControl}>
							<label>{key}:</label>
							<Field type="text" name={`contacts.` + key} component={Input} />
						</div>
					)
				})
			}
		</form>
	)
}

const ProfileDataReduxForm = reduxForm({ form: 'edit-profile' })(ProfileDataForm);

export default ProfileDataReduxForm;