import React from 'react';
import MyPosts from './MyPosts';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
	return {
		posts: state.profilePage.posts
	}
}

const mapDispatchToProps = () => {
	return {}
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;