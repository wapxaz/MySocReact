import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader.tsx';
import defaultAvatar from '../../../assets/images/avatar_default.png';
//import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatusWithHooks.tsx';
import { useState } from 'react';
import ProfileDataForm from './ProfileDataForm.tsx';
import Contact from './Contact.tsx';
import { AppStateType } from '../../../redux/redux-store.ts';
import { ProfileType } from '../../../types/types.ts';

type PropsType = {
  profile: AppStateType["profilePage"]["profile"] | null
  isOwner: boolean
  status: string
  savePhoto: (file: File) => void
  saveProfile: (profileData: ProfileType) => void
  updateStatus: (status: string) => void
}
const ProfileInfo: React.FC<PropsType> = (props) => {
  let [editMode, setEditMode] = useState(false); //хук переключатель режима редактирования данных пользователя

  const onSubmit = (formData) => {
    props.saveProfile(formData)
      .then((result) => {
        if (result != false) {
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
        {//переключатель режима редактирования данных пользователя
          editMode
            ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit} />
            : <ProfileData profile={props.profile} status={props.status} updateStatus={props.updateStatus} isOwner={props.isOwner} goToEditMode={() => { setEditMode(true) }} />}

      </div>
    </div>
  );
}

type ProfileDataPropsType = {
  isOwner: boolean
  profile: ProfileType | null //AppStateType["profilePage"]["profile"] | null
  status: string
  goToEditMode: () => void
  updateStatus: (newStatus: string) => void
}
const ProfileData: React.FC<ProfileDataPropsType> = (props) => {
  if (props.profile === null) {
    return <>Error: Profile is not be null</>
  }

  return <div>
    {props.isOwner &&
      <div>
        <button onClick={props.goToEditMode}>Edit</button>
      </div>
    }
    <div className={s.fullName}>{props.profile.fullName}</div>
    <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
    <div><b>Looking for a job:</b> {props.profile.lookingForAJob ? 'Yes' : 'No'}</div>
    {props.profile.lookingForAJobDescription &&
      <div><b>My professionl skils:</b> {props.profile.lookingForAJobDescription}</div>}

    {props.profile.aboutMe && <div>
      <b>About me:</b> {props.profile.aboutMe}
    </div>}

    {//если заполнена хоть одна строчка контактов, выводится строка "Contacts"
      (props.profile.contacts.github
        || props.profile.contacts.vk
        || props.profile.contacts.facebook
        || props.profile.contacts.instagram
        || props.profile.contacts.twitter
        || props.profile.contacts.website
        || props.profile.contacts.youtube
        || props.profile.contacts.mainLink)
        ? <div><b>Contacts:</b></div>
        : ''}

    {//возвращает массив ключей и проходится по каждому через ф-ю map, которая возвращает разметку для каждой строчки контактов пользователя(его соцсетей)
      Object.keys(props.profile.contacts).map(key => {
        if (props.profile === null) {
          return <>Error: Profile is not be null</>
        }
        return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]} />
      })}

  </div>
}

export default ProfileInfo;