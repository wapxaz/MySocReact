import React from 'react';
import Friend from './Friend/Friend.tsx';
import { AppStateType } from '../../../redux/redux-store';

type PropsType = {
  sidebarFriends: AppStateType["sidebarFriends"]
}
const Block3Friends: React.FC<PropsType> = (props) => {
  return props.sidebarFriends.map(f => <Friend name={f.name} key={f.id} id={f.id} img={f.img} />);
}

export default Block3Friends;