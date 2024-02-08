import React from 'react';
import s from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import Block3FriendsContainer from './Block3Friends/Block3FriendsContainer';

//левое меню
const Navbar = (props) => {
  return (
    <nav className={s.nav}>
      <div className={`${s.item} ${s.active}`}>
        <NavLink to="/profile" className={navData => navData.isActive ? s.active : s.item}>Profile</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/dialogs" className={navData => navData.isActive ? s.active : s.item}>Message</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/news" className={navData => navData.isActive ? s.active : s.item}>News</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/music" className={navData => navData.isActive ? s.active : s.item}>Music</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/users" className={navData => navData.isActive ? s.active : s.item}>Users</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/settings" className={navData => navData.isActive ? s.active : s.item}>Settings</NavLink>
      </div>

      <div className={s.friends}>
        <div><h4>Friends</h4></div>
        <Block3FriendsContainer />
      </div>
    </nav>
  );
}

export default Navbar;