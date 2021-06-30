import React from 'react'
import s from './Post.module.css';

const Post = (props) => {
	return(
		<div className={s.item}>
			<img src="https://static.toiimg.com/thumb/resizemode-4,msid-76729750,imgsize-249247,width-720/76729750.jpg"/>
			{ props.message }
			<div className={s.action}>
				<span>{ props.likeCount }</span>
				<span> Likes</span>
			</div>
		</div>
	)
}

export default Post;