import React from 'react';
import Post from './Post/Post';
import s from './MyPosts.module.css';
import NewPostContainer from './NewPost/NewPostContainer';

const MyPosts = (props) => {
	const postsElements = props.posts.map(p => <Post key={p.id} message={p.message} likeCount={p.likeCount}/>)

	return(
		<div>
      <NewPostContainer store={props.store}/>
			<div className={s.posts}>
				{ postsElements }
			</div>
		</div>
	)
}

export default MyPosts;