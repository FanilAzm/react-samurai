import React from 'react';
import MyPosts, {DispatchPropsType, MapPropsType} from './MyPosts';
import {connect} from 'react-redux';
import {AppStoreType} from "../../../redux/redux-store";
import {actions} from "../../../redux/profileReducer";

const mapStateToProps = (state: AppStoreType) => {
	return {
		posts: state.profilePage.posts
	}
}

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStoreType>(mapStateToProps, {...actions})(MyPosts);

export default MyPostsContainer;
