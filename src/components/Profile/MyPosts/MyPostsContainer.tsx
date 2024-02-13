import React from 'react';
import { actions } from '../../../redux/profile-reducer.ts';
import MyPosts from './MyPosts.tsx';
import { connect } from 'react-redux';
import { AppStateType } from '../../../redux/redux-store.ts';

type MapStateToPropsType = {
  posts: AppStateType["profilePage"]["posts"]
}
type MapDispatchToPropsType = {
  addPost: (newPost: string) => void
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    posts: state.profilePage.posts

  };
}

const MyPostsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {addPost: actions.addPostActionCreator})(MyPosts);

export default MyPostsContainer;