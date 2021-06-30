import React from 'react';
import {connect} from 'react-redux';
import {follow, unfollow, setUsers, setCurrentPage, setUsersCount, toggleIsFetching, toggleFollowingProgress} from '../../redux/usersReducer';
import {usersAPI} from '../../api/api';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';

class UsersContainer extends React.Component {
	componentDidMount() {
		this.props.toggleIsFetching(true);
		
		usersAPI.getUsers(this.props.currentUserPage, this.props.pageSize)
			.then(data => {
				this.props.setUsers(data.items);
				this.props.setUsersCount(data.totalCount);
				this.props.toggleIsFetching(false);
			})
	}
	onPageChanged = (page) => {
		this.props.setCurrentPage(page);
		this.props.toggleIsFetching(true);
		
		usersAPI.getUsers(page, this.props.pageSize)
			.then(data => {
				this.props.setUsers(data.items);
				this.props.toggleIsFetching(false);
			})
	}
	render() {
		return (
			<>
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

const mapStateToProps = (state) => {
	return {
		users: state.usersPage.users,
		pageSize: state.usersPage.pageSize,
		totalUsersCount: state.usersPage.totalUsersCount,
		currentUserPage: state.usersPage.currentUserPage,
		isFetching: state.usersPage.isFetching,
		followingProgress: state.usersPage.followingProgress
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

export default connect(mapStateToProps, {
	follow, unfollow, setUsers, setCurrentPage, setUsersCount, toggleIsFetching, toggleFollowingProgress
})(UsersContainer);