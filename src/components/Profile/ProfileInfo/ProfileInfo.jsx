import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import defaultAvatar from '../../../assets/images/avatar_default.png';
//import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (e) => {
    if(e.target.files.length)
    {
      props.savePhoto(e.target.files[0]);
    }
  }

  return (
    <div>
      <div className={s.descriptionBlock}>
        <div className={s.profileAvatar}>
            <img src={props.profile.photos.large
            ? props.profile.photos.large
            : defaultAvatar} />
            {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
          </div>
        <div className={s.fullName}>{props.profile.fullName}</div>
        <div>Looking for a job: {props.profile.lookingForAJob ? 'Yes' : 'No'}</div>

        <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />

        {(props.profile.contacts.github 
        || props.profile.contacts.vk
        || props.profile.contacts.facebook
        || props.profile.contacts.instagram
        || props.profile.contacts.twitter
        || props.profile.contacts.website
        || props.profile.contacts.youtube
        || props.profile.contacts.mainLink)
          ? <div>Contacts:</div>
          : ''}

        {props.profile.contacts.github !== null ? <div>github: {props.profile.contacts.github}</div> : ''}
        {props.profile.contacts.vk !== null ? <div>vk: {props.profile.contacts.vk}</div> : ''}
        {props.profile.contacts.facebook !== null ? <div>facebook: {props.profile.contacts.facebook}</div> : ''}
        {props.profile.contacts.instagram !== null ? <div>instagram: {props.profile.contacts.instagram}</div> : ''}
        {props.profile.contacts.twitter !== null ? <div>twitter: {props.profile.contacts.twitter}</div> : ''}
        {props.profile.contacts.website !== null ? <div>website: {props.profile.contacts.website}</div> : ''}
        {props.profile.contacts.youtube !== null ? <div>youtube: {props.profile.contacts.youtube}</div> : ''}
        {props.profile.contacts.mainLink !== null ? <div>mainLink: {props.profile.contacts.mainLink}</div> : ''}

      </div>
    </div>
  );
}

export default ProfileInfo;