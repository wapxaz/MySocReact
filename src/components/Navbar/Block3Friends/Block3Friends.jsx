import React from 'react';
import Friend from './Friend/Friend';

const Block3Friends = (props) => {
  return props.sidebarFriends.map(f => <Friend name={f.name} key={f.id} id={f.id} img={f.img} />);
}

export default Block3Friends;