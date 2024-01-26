import React from 'react';
import s from './ProfileInfo.module.css';

const ProfileInfo = () => {
  return (
    <div>
      <div>
        <img src="https://media.istockphoto.com/id/1370813651/ru/фото/доска-для-серфинга-и-пальма-на-пляже-летом.jpg?s=612x612&w=0&k=20&c=aenv9jHp7T2KuUDsFh-Sf3cg6bVVWN9TKdWssXWK7Sw=" />
      </div>
      <div className={s.descriptionBlock}>
        ava + desc
      </div>
    </div>
  );
}

export default ProfileInfo;