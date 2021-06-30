import React from 'react';
import {addPostActionCreator, changePostTextActionCreator} from '../../../../redux/profileReducer';
import NewPost from './NewPost';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
	return {
		newPostText: state.profilePage.newPostText
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addPost: () => {
			dispatch(addPostActionCreator());
		},
		changePostText: (text) => {
			let action = changePostTextActionCreator(text);
			dispatch(action);
		}
	}
}

const NewPostContainer = connect(mapStateToProps, mapDispatchToProps)(NewPost);

export default NewPostContainer;