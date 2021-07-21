import React from 'react';
import s from './Users.module.css';
import UserImg from '../../assets/images/user.png';
import { NavLink } from 'react-router-dom';

const Users = (props) => {
	let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
		const pages = [];

		for(let i = 1; i <= 10; i++) {
			pages.push(i);
		}

		const deleteRequest = (userId) => {
			props.unfollow(userId);
		}

		const postRequest = (userId) => {
			props.follow(userId);
		}

		return(
			<div>
				<div>
					{
						pages.map(page => {
							return  (
								<span
									className={ props.currentUserPage === page && s.selectedPage }
									onClick={() => { props.onPageChanged(page) }}
								>
									{ page }
								</span>
							)
						})
					}
				</div>
				<div className={s.userItems}>
					{
						props.users.map(user => {
							return (
								<div className={s.userItem} key={user.id}>
									<div className={s.userItemHeader}>
										<img src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300" alt=""/>
									</div>
									<div className={s.userInfo}>
										<NavLink to={'/profile/' + user.id}>
											<img src={user.photos.small ? null : UserImg} alt={user.name}/>
										</NavLink>
										<div>
											<h4>{user.name}</h4>
											<p>{user.status}</p>
										</div>
										{user.followed
											? <button disabled={props.followingProgress.some(id => id === user.id)} onClick={() => { deleteRequest(user.id) }}>UnFollow</button>
											: <button disabled={props.followingProgress.some(id => id === user.id)} onClick={() => { postRequest(user.id) }}>Follow</button>}
									</div>
								</div>
							)
						})
					}
				</div>
			</div>
		)
}

export default Users;