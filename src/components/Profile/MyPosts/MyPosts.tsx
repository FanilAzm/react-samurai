import React, {FC} from 'react';
import Post from './Post/Post';
import s from './MyPosts.module.css';
import NewPostForm from "./NewPost/NewPost";
import {PostType} from "../../../types/types";

export type MapPropsType = {
  posts: Array<PostType>
}

export type DispatchPropsType = {
  addPost: (newPostText: string) => void
}

export type NewPostFormValuesType = {
  newPostText: string
}

const MyPosts: FC<MapPropsType & DispatchPropsType> = (props) => {
	const postsElements = props.posts.map(p => <Post key={p.id} message={p.message} likeCount={p.likeCount}/>)

  let onAddPost = (values: NewPostFormValuesType) => {
    props.addPost(values.newPostText);
  }

	return(
		<div>
      <NewPostForm onSubmit={onAddPost}/>
			<div className={s.posts}>
				{ postsElements }
			</div>
		</div>
	)
}

export default MyPosts;
