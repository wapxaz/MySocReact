import React from 'react';
import { addPostActionCreator } from '../../../redux/profile-reducer.ts';
import MyPosts from './MyPosts.tsx';
import { connect } from 'react-redux';
import { AppStateType } from '../../../redux/redux-store.ts';

type MapStateToPropsType = {
  posts: AppStateType["profilePage"]["posts"]
}
type MapDispatchToPropsType = {
  addPost: (newPost: string) => void
}
type OwnPropsType = {

}
type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    posts: state.profilePage.posts

  };
}
let mapDispatchToProps = (dispatch: any): MapDispatchToPropsType => {
  return {
    addPost: (newPost) => {
      dispatch(addPostActionCreator(newPost));
    }
  };
}
const MyPostsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;