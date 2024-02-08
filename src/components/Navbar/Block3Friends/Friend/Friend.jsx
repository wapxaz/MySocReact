import React from 'react';
import s from './Friend.module.css';
import { NavLink } from 'react-router-dom';

//разметка для отображения друга в блоке "Friends"
const Friend = (props) => {
  return (
    <div className={s.friend}>
      <NavLink to={"/friends/" + props.id}>
        <img src={props.img} />
        <div>{props.name}</div>
      </NavLink>
    </div>
  );
}

export default Friend;