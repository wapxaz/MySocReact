import React from 'react';
import Friend from './Friend/Friend';

const Block3Friends = (props) => {
  let friendsElements = props.sidebarFriends.map(f => <Friend name={f.name} key={f.id} id={f.id} img={f.img} />);

  return friendsElements;
}

export default Block3Friends;