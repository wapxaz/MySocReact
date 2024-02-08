import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import defaultAvatar from '../../../assets/images/avatar_default.png';
//import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import { useState } from 'react';
import ProfileDataForm from './ProfileDataForm';
import Contact from './Contact';

const ProfileInfo = (props) => {
  let [editMode, setEditMode] = useState(false);

  const onSubmit = (formData) => {
    props.saveProfile(formData)
    .then((result) => {
      if(result != false)
      {
        setEditMode(false);
      }
    });
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  }

  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <div>
      <div className={s.descriptionBlock}>
        <div className={s.profileAvatar}>
          <img src={props.profile.photos.large
            ? props.profile.photos.large
            : defaultAvatar} />
          {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
        </div>
        { editMode
          ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit} /> 
          : <ProfileData profile={props.profile} isOwner={props.isOwner} goToEditMode={() => {setEditMode(true)}} />}

      </div>
    </div>
  );
}

const ProfileData = (props) => {
  return <div>
    {props.isOwner &&
      <div>
        <button onClick={props.goToEditMode}>Edit</button>
      </div>
    }
    <div className={s.fullName}>{props.profile.fullName}</div>
    <div><b>Looking for a job:</b> {props.profile.lookingForAJob ? 'Yes' : 'No'}</div>
    {props.profile.lookingForAJobDescription &&
      <div><b>My professionl skils:</b> {props.profile.lookingForAJobDescription}</div>}

    <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />

    {props.profile.aboutMe && <div>
      <b>About me:</b> {props.profile.aboutMe}
    </div>}

    {(props.profile.contacts.github
      || props.profile.contacts.vk
      || props.profile.contacts.facebook
      || props.profile.contacts.instagram
      || props.profile.contacts.twitter
      || props.profile.contacts.website
      || props.profile.contacts.youtube
      || props.profile.contacts.mainLink)
      ? <div><b>Contacts:</b></div>
      : ''}

    {Object.keys(props.profile.contacts).map(key => {
      return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]} />
    })}

  </div>
}

export default ProfileInfo;