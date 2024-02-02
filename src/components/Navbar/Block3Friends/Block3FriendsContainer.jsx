import React from 'react';
import Friend from './Friend/Friend';
import { connect } from 'react-redux';
import Block3Friends from './Block3Friends';

let mapStateToProps = (state) => {
  return {
    sidebarFriends: state.sidebarFriends
  };
}
let mapDispatchToProps = (dispatch) => {
  return {

  };
}
const Block3FriendsContainer = connect(mapStateToProps, mapDispatchToProps)(Block3Friends);

export default Block3FriendsContainer;