import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo.tsx';
import MyPostsContainer from './MyPosts/MyPostsContainer.tsx';
import { AppStateType } from '../../redux/redux-store';

type PropsType = {
  isOwner: boolean
  profile: AppStateType["profilePage"]["profile"]
  status: string
  updateStatus: (newStatus: string) => void
  savePhoto: (file: any) => void
  saveProfile: (profileData: any) => void
  //store: any
}
const Profile: React.FC<PropsType> = (props) => {
  return (
    <div>
      <ProfileInfo isOwner={props.isOwner} 
                profile={props.profile} 
                status={props.status} 
                updateStatus={props.updateStatus}
                savePhoto={props.savePhoto}
                saveProfile={props.saveProfile} />
      <MyPostsContainer /*store={props.store}*/ />
    </div>
  );
}
 
export default Profile;