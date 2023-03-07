import React from 'react';
import Friends from './Friends';
import {connect} from 'react-redux';
import {AppStoreType} from "../../../redux/redux-store";



const mapStateToProps = (state: AppStoreType) => {
	return {
		friends: state.siteBar.friends
	}
}

const mapDispatchToProps = () => {
	return {}
}

const FriendsContainer = connect(mapStateToProps, mapDispatchToProps)(Friends);

export default FriendsContainer;
