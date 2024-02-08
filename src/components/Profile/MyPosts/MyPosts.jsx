import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';
import { required, maxLengthCreator } from '../../../utils/validators/validators';
import { TextArea } from '../../common/FormsControls/FormsControls';

const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component={TextArea} name="newPost" placeholder="Enter new post" validate={[required, maxLengthCreator(15)]}/>
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form >
  );
}

const NewPostReduxForm = reduxForm({ form: 'addNewPostForm' })(AddNewPostForm);

const MyPosts = React.memo((props) => {

  let postsElements = [...props.posts].reverse().map(p => <Post key={p.id} message={p.post} likeCount={p.likeCount} />);

  const onSubmit = (formData) => {
    props.addPost(formData.newPost);
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
});

export default MyPosts;