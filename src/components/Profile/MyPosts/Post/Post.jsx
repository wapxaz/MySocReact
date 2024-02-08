import React from 'react';
import s from './Post.module.css';

//отрисовка одного поста
const Post = (props) => {
  return (
    <div className={s.item}>
      <img src="https://imgix.bustle.com/uploads/image/2022/12/22/bc9d8fc7-5855-431a-820c-51ebeb6c7fcf-3e2ba297-d13b-4d9c-b91c-622b2c9a46dd-avatar-the-way-of-water612-4.jpg?w=350&fit=crop&crop=faces&auto=format%2Ccompress" />
      {props.message}
      <div>
        <span>{props.likeCount} like(s)</span>
      </div>
    </div>
  );
}

export default Post;