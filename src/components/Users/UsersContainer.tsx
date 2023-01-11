import React from 'react';
import {connect} from 'react-redux';
import {follow, unfollow, setCurrentPage, getUsers} from '../../redux/usersReducer';
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
  follow: () => void
  unfollow: () => void
  setCurrentPage: (page: number) => void
  getUsers: (currentUserPage: number, pageSize: number) => void
}

type OwnPropsType = {
  pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {
	componentDidMount() {
		this.props.getUsers(this.props.currentUserPage, this.props.pageSize);
	}
	onPageChanged = (page: number) => {
		this.props.setCurrentPage(page);
		this.props.getUsers(page, this.props.pageSize);
	}
	render() {
		return (
			<>
        <h2>{this.props.pageTitle}</h2>
				{this.props.isFetching ? < Preloader/> : null}
				<Users
					{...this.props}
					// totalUsersCount={this.props.totalUsersCount}
					// pageSize={this.props.pageSize}
					// currentUserPage={this.props.currentUserPage}
					// users={this.props.users}
					// follow={this.props.follow}
					// unfollow={this.props.unfollow}
					onPageChanged={this.onPageChanged}
					// followingProgress={this.props.followingProgress}
					// toggleFollowingProgress={this.props.toggleFollowingProgress}
				/>
			</>
		)
	}
}

// const mapStateToProps = (state) => {
// 	return {
// 		users: state.usersPage.users,
// 		pageSize: state.usersPage.pageSize,
// 		totalUsersCount: state.usersPage.totalUsersCount,
// 		currentUserPage: state.usersPage.currentUserPage,
// 		isFetching: state.usersPage.isFetching,
// 		followingProgress: state.usersPage.followingProgress
// 	}
// }

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

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		follow: (userId) => {
// 			dispatch(followAC(userId))
// 		},
// 		unfollow: (userId) => {
// 			dispatch(unfollowAC(userId))
// 		},
// 		setUsers: (users) => {
// 			dispatch(setUsersAC(users));
// 		},
// 		setCurrentPage: (pageNumber) => {
// 			dispatch(setCurrentPageAC(pageNumber))
// 		},
// 		setUsersCount: (usersCount) => {
// 			dispatch(setUsersCountAC(usersCount))
// 		},
// 		toggleIsFetching: (isFetching) => {
// 			dispatch(toggleIsFetchingAC(isFetching))
// 		}
// 	}
// }

/*
	Т.к. в mapDispatchToProps содержимые объекта взаимопохожи,
  можно их вызвать в самой ф-ии connect, в виде объекта,
  и название action creator-ов должны совпадать с props-ми
*/

export default compose(
	connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStoreType>(mapStateToProps, { follow, unfollow, setCurrentPage, getUsers }),
	withAuthRedirect
)(UsersContainer);

// const AuthRedirectComponent = withAuthRedirect(UsersContainer);
// export default connect(mapStateToProps, { follow, unfollow, setCurrentPage, getUsers })(AuthRedirectComponent);
