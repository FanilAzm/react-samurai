import React from 'react';
import StoreContext from '../../../StoreContext';
import Friends from './Friends';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
	return {
		friends: state.siteBar.friends
	}
}

const mapDispatchToProps = () => {
	return {}
}

const FriendsContainer = connect(mapStateToProps, mapDispatchToProps)(Friends);

export default FriendsContainer;