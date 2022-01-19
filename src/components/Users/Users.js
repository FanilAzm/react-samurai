import React from 'react';
import s from './Users.module.css';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

const Users = (props) => {

		return(
			<div>
				<Paginator 
					totalUsersCount={props.totalUsersCount}
					pageSize={props.pageSize}
					currentUserPage={props.currentUserPage}
					onPageChanged={props.onPageChanged}
				/>
				<div className={s.userItems}>
					{
						props.users.map(user => {
							return (
								<User 
									key={user.id}
									user={user}
									unfollow={props.unfollow}
									follow={props.follow}
									followingProgress={props.followingProgress}
								/>
							)
						})
					}
				</div>
			</div>
		)
}

export default Users;