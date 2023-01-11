import React from 'react';
import s from './Users.module.css';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import {UserType} from "../../types/types";

type PropsType = {
  totalUsersCount: number
  pageSize: number
  currentUserPage: number
  onPageChanged: (pageNumber: number) => void
  users: Array<UserType>
  unfollow: () => void
  follow: () => void
  followingProgress: Array<number>
}

const Users: React.FC<PropsType> = ({totalUsersCount, pageSize, currentUserPage, onPageChanged, users, ...props}) => {

		return(
			<div>
				<Paginator
					totalUsersCount={totalUsersCount}
					pageSize={pageSize}
					currentUserPage={currentUserPage}
					onPageChanged={onPageChanged}
				/>
				<div className={s.userItems}>
					{
						users.map(user => {
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
