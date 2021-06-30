import React from 'react';
import s from './NewPost.module.css';


const NewPost = (props) => {
	let newPostElement = React.createRef();

	let onAddPost = () => {
		props.addPost();
	}

	let onChangePostText = () => {
		let text = newPostElement.current.value;
		props.changePostText(text);
	}

	return(
		<div className={s.newPost}>
			<h4>Create post</h4>
			<input onChange={onChangePostText} ref={newPostElement} placeholder="Введите содержимое поста" value={props.newPostText} />
			<button onClick={onAddPost}>Add</button>
		</div>
	)
}

export default NewPost;