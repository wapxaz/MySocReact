import React, { useEffect } from 'react';
import Profile from './Profile.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, getStatus } from '../../redux/profile-reducer.ts';
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, AppStateType } from '../../redux/redux-store.ts';

export const ProfilePage: React.FC = (props) => {
  const currentUserId = useSelector((state: AppStateType) => state.auth.userId);

  //получаю ид текущего пользователя из урла
  const paramsUrl = useParams();

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    refreshProfile();
  }, []);

  useEffect(() => {
    refreshProfile();
  }, [paramsUrl.profileId]);

  //для редиректа на страницу логина
  const navigate = useNavigate();

  const refreshProfile = () => {
    let profileId = Number(paramsUrl.profileId);
    if (!profileId) {
      if (currentUserId !== null) {
        profileId = currentUserId;
      }
      if (!profileId) {
        navigate("/login"); //редирект на страницу логина
      }

    }
    if (profileId) {
      dispatch(getProfile(profileId));
      dispatch(getStatus(profileId));
    }
  }

  return (
    <div>
      <Profile />
    </div>
  );
}