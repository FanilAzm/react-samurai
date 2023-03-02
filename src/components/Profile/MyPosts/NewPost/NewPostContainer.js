import React from 'react';
import {actions} from '../../../../redux/profileReducer';
import NewPost from './NewPost';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
	return {
		newPostText: state.profilePage.newPostText
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addPost: (newPostText) => {
			dispatch(actions.addPostActionCreator(newPostText));
		}
	}
}

const NewPostContainer = connect(mapStateToProps, mapDispatchToProps)(NewPost);

export default NewPostContainer;
