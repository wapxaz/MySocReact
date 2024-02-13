import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo.tsx';
import MyPostsContainer from './MyPosts/MyPostsContainer.tsx';
import { ProfileType } from '../../types/types.ts';

type PropsType = {
  isOwner: boolean
  profile: ProfileType | null
  status: string
  updateStatus: (newStatus: string) => void
  savePhoto: (file: File) => void
  saveProfile: (profileData: ProfileType) => void
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
      <MyPostsContainer />
    </div>
  );
}
 
export default Profile;