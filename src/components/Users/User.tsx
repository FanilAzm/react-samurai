import React, {FC} from 'react';
import s from './Users.module.css';
import UserImg from '../../assets/images/user.png';
import { NavLink } from 'react-router-dom';
import {UserType} from "../../types/types";

type PropsType = {
  user: UserType
  followingProgress: Array<number>
  unfollow: (userId: number) => void
  follow: (userId: number) => void
}

const User: FC<PropsType> = ({user, unfollow, follow, followingProgress}) => {

		const deleteRequest = (userId: number) => {
			unfollow(userId);
		}

		const postRequest = (userId: number) => {
			follow(userId);
		}

		return (
			<div className={s.userItem}>
				<div className={s.userItemHeader}>
					<img src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300" alt=""/>
				</div>
				<div className={s.userInfo}>
					<NavLink to={'/profile/' + user.id}>
						<img src={user.photos.small ? undefined : UserImg} alt={user.name}/>
					</NavLink>
					<div>
						<h4>{user.name}</h4>
						<p>{user.status}</p>
					</div>
					{user.followed
						? <button disabled={followingProgress.some(id => id === user.id)} onClick={() => { deleteRequest(user.id) }}>UnFollow</button>
						: <button disabled={followingProgress.some(id => id === user.id)} onClick={() => { postRequest(user.id) }}>Follow</button>}
				</div>
			</div>
		)
}

export default User;
