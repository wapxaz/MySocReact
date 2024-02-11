import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post.tsx';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { required, maxLengthCreator } from '../../../utils/validators/validators.ts';
import { TextArea } from '../../common/FormsControls/FormsControls.tsx';
import { AppStateType } from '../../../redux/redux-store.ts';

//форма добавления нового поста в ленту
const AddNewPostForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
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

const NewPostReduxForm = reduxForm<FormDataType>({ form: 'addNewPostForm' })(AddNewPostForm);

type MyPostsPropsType = {
  addPost: (newPost: string) => void
  posts: AppStateType["profilePage"]["posts"]
}
type FormDataType = {
  newPost: string
}
//React.memo - оптимизация отрисовки, аналог PureComponent в классовой компоненте
const MyPosts: React.FC<MyPostsPropsType> = React.memo((props) => {

  let postsElements = [...props.posts].reverse().map(p => <Post key={p.id} message={p.post} likeCount={p.likeCount} />);

  const onSubmit = (formData: FormDataType) => {
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