import React from 'react';
import {InjectedFormProps, reduxForm} from 'redux-form';
import { required, maxLengthCreator } from '../../../../utils/validators';
import {createField, Input} from '../../../common/FormControls/FormControls';
import {NewPostFormValuesType} from "../MyPosts";
import s from './NewPost.module.css';

type NewPostFormValuesKeysType = Extract<keyof NewPostFormValuesType, string>
type PropsType = {}

const maxLength10 = maxLengthCreator(10);

const NewPostForm: React.FC<InjectedFormProps<NewPostFormValuesType, PropsType> & PropsType> = (props) => {
	return(
		<form className={s.newPost} onSubmit={props.handleSubmit}>
			<h4>Create post</h4>
      {createField<NewPostFormValuesKeysType>("Введите содержимое поста", "newPostText", [required, maxLength10], Input)}
			<button>Add</button>
		</form>
	)
}

export default reduxForm<NewPostFormValuesType>({
	form: 'newPostText'
})(NewPostForm);
