import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';

const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component={"textarea"} name={"newPost"} placeholder={"Enter new post"} />
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form >
  );
}

const NewPostReduxForm = reduxForm({ form: 'addNewPostForm' })(AddNewPostForm);

const MyPosts = (props) => {

  let postsElements = props.posts.map(p => <Post message={p.post} likeCount={p.likeCount} key={p.id} />);

  const onSubmit = (formData) => {
    console.log(formData);
    props.updateNewPostText(formData.newPost);
    props.addPost();
  }

  return (
    <div className={s.postBlock}>
      <h3>My posts</h3>

      <NewPostReduxForm onSubmit={onSubmit} />

      <div className={s.posts}>
        {postsElements}
      </div>
    </div>
  );
}

export default MyPosts;