import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required, maxLengthCreator } from '../../../../utils/validators';
import { Input } from '../../../common/FormControls/FormControls';

import s from './NewPost.module.css';


const NewPost = (props) => {

	let onAddPost = (values) => {
		props.addPost(values.newPostText);
	}

	return(
		<NewPostReduxForm onSubmit={onAddPost} />
	)
}

const maxLength10 = maxLengthCreator(10);

const NewPostForm = (props) => {
	return(
		<form className={s.newPost} onSubmit={props.handleSubmit}>
			<h4>Create post</h4>
			<Field
				type="text"
				name="newPostText"
				component={Input}
				placeholder="Введите содержимое поста"
				validate={[ required, maxLength10 ]}
			/>
			<button>Add</button>
		</form>
	)
}

const NewPostReduxForm = reduxForm({
	form: 'newPostText'
})(NewPostForm);

export default NewPost;