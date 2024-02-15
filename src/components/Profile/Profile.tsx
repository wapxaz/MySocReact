import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo.tsx';
import MyPostsContainer from './MyPosts/MyPostsContainer.tsx';
import { ProfileType } from '../../types/types.ts';

type PropsType = {}
const Profile: React.FC<PropsType> = (props) => {
  return (
    <div>
      <ProfileInfo />
      <MyPostsContainer />
    </div>
  );
}
 
export default Profile;