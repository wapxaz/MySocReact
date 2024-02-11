import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post.tsx';
import { Field, reduxForm } from 'redux-form';
import { required, maxLengthCreator } from '../../../utils/validators/validators';
import { TextArea } from '../../common/FormsControls/FormsControls';
import { AppStateType } from '../../../redux/redux-store.ts';

type AddNewPostFormPropsType = {
  handleSubmit: any
}
//форма добавления нового поста в ленту
const AddNewPostForm: React.FC<AddNewPostFormPropsType> = (props) => {
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

type MyPostsPropsType = {
  addPost: (newPost: string) => void
  posts: AppStateType["profilePage"]["posts"]
}
//React.memo - оптимизация отрисовки, аналог PureComponent в классовой компоненте
const MyPosts: React.FC<MyPostsPropsType> = React.memo((props) => {

  let postsElements = [...props.posts].reverse().map(p => <Post key={p.id} message={p.post} likeCount={p.likeCount} />);

  const onSubmit = (formData: any) => {
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