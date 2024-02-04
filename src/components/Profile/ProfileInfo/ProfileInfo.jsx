import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <div>
      <div>
        <img src="https://media.istockphoto.com/id/1370813651/ru/фото/доска-для-серфинга-и-пальма-на-пляже-летом.jpg?s=612x612&w=0&k=20&c=aenv9jHp7T2KuUDsFh-Sf3cg6bVVWN9TKdWssXWK7Sw=" />
      </div>
      <div className={s.descriptionBlock}>
        <div><img src={props.profile.photos.large} /></div>
        <div className={s.fullName}>{props.profile.fullName}</div>
        <div>Looking for a job: {props.profile.lookingForAJob ? 'Yes' : 'No'}</div>
        {props.profile.lookingForAJobDescription !== null ? <div>{props.profile.lookingForAJobDescription}</div> : ''}
        <div>Contacts:</div>
        {props.profile.contacts.github !== null ? <div>github: {props.profile.contacts.github}</div> : ''}
        {props.profile.contacts.vk !== null ? <div>vk: {props.profile.contacts.vk}</div> : ''}
        {props.profile.contacts.facebook !== null ? <div>facebook: {props.profile.contacts.facebook}</div> : ''}
        {props.profile.contacts.instagram !== null ? <div>instagram: {props.profile.contacts.instagram}</div> : ''}
        {props.profile.contacts.twitter !== null ? <div>twitter: {props.profile.contacts.twitter}</div> : ''}
        {props.profile.contacts.website !== null ? <div>website: {props.profile.contacts.website}</div> : ''}
        {props.profile.contacts.youtube !== null ? <div>youtube: {props.profile.contacts.youtube}</div> : ''}
        {props.profile.contacts.mainLink !== null ? <div>mainLink: {props.profile.contacts.mainLink}</div> : ''}

        {/* ava + desc */}
      </div>
    </div>
  );
}

export default ProfileInfo;