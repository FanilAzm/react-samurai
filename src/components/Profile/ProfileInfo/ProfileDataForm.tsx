import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {createField, Input, Textarea} from '../../common/FormControls/FormControls';
import s from './ProfileInfo.module.css';
import iconSave from '../../../assets/images/icon-save.png';
import styles from '../../common/FormControls/FormControl.module.css';
import {ProfileType} from "../../../types/types";

type ProfileTypeKeys = Extract<keyof ProfileType, string>
type PropsType = {
  profile: ProfileType
}

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = (props) => {
	return(
		<form className={s.editForm} onSubmit={props.handleSubmit}>
			<button className={s.editBtn}><img src={iconSave} /></button>
			{
				props.error && <div className={styles.formError}>{props.error}</div>
			}
			<div className={s.formControl}>
				<label>Имя:</label>
        {createField<ProfileTypeKeys>("Введите содержимое поста", "fullName", [], Input)}
			</div>
			<div className={s.formControl}>
				<label>Поиск работы:</label>
        {createField<ProfileTypeKeys>(null, "lookingForAJob", [], Input, "checkbox")}
			</div>
			<div className={s.formControl}>
				<label>Мои навыки:</label>
        {createField<ProfileTypeKeys>(null, "lookingForAJobDescription", [], Textarea)}
			</div>
			<div className={s.formControl}>
				<label>Обо мне:</label>
        {createField<ProfileTypeKeys>(null, "aboutMe", [], Textarea)}
			</div>
			{
				Object.keys(props.profile.contacts).map(key => {
					return(
						<div key={key} className={s.formControl}>
							<label>{key}:</label>
              {/* create some solutions for embedded projects */}
							<Field type="text" name={`contacts.` + key} component={Input} />
						</div>
					)
				})
			}
		</form>
	)
}

const ProfileDataReduxForm = reduxForm<ProfileType, PropsType>({ form: 'edit-profile' })(ProfileDataForm);

export default ProfileDataReduxForm;
