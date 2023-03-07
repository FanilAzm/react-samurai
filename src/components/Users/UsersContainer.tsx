import React from 'react';
import {connect} from 'react-redux';
import {follow, unfollow, getUsers} from '../../redux/usersReducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { getUsersSelector, getPageSizeSelector, getTotalUsersCount, getCurrentUserPage, getIsFetching, getFollowingProgress } from '../../redux/selectors/users-selectors';
import {UserType} from "../../types/types";
import {AppStoreType} from "../../redux/redux-store";

type MapStatePropsType = {
  currentUserPage: number
  pageSize: number
  isFetching: boolean
  totalUsersCount: number
  users: Array<UserType>
  followingProgress: Array<number>
}

type MapDispatchPropsType = {
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  getUsers: (currentUserPage: number, pageSize: number) => void
}

type OwnPropsType = {
  pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {
	componentDidMount() {
	  const {currentUserPage, pageSize} = this.props;
		this.props.getUsers(currentUserPage, pageSize);
	}
	onPageChanged = (page: number) => {
		this.props.getUsers(page, this.props.pageSize);
	}
	render() {
		return (
			<>
        <h2>{this.props.pageTitle}</h2>
				{this.props.isFetching ? < Preloader/> : null}
				<Users
					{...this.props}
					onPageChanged={this.onPageChanged}
				/>
			</>
		)
	}
}

const mapStateToProps = (state: AppStoreType): MapStatePropsType => {
	return {
		users: getUsersSelector(state),
		pageSize: getPageSizeSelector(state),
		totalUsersCount: getTotalUsersCount(state),
		currentUserPage: getCurrentUserPage(state),
		isFetching: getIsFetching(state),
		followingProgress: getFollowingProgress(state)
	}
}

export default compose<React.ComponentType>(
	connect(mapStateToProps, { follow, unfollow, getUsers }),
	withAuthRedirect
)(UsersContainer);
