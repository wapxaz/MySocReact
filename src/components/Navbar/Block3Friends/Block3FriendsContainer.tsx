import React from 'react';
import { connect } from 'react-redux';
import Block3Friends from './Block3Friends.tsx';
import { AppStateType } from '../../../redux/redux-store';

type MapStateToPropsType = {
  sidebarFriends: AppStateType["sidebarFriends"]
}
type MapDispatchToPropsType = {
}
type OwnPropsType = {
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;
let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    sidebarFriends: state.sidebarFriends
  };
}

const Block3FriendsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {})(Block3Friends);

export default Block3FriendsContainer;