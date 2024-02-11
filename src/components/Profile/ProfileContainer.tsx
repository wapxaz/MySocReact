import React from 'react';
import Profile from './Profile.tsx';
import { connect } from 'react-redux';
import { getProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../../redux/profile-reducer.ts';
import { Navigate } from "react-router-dom";
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { withRouter } from '../../hoc/withRouter';
import { AppStateType } from '../../redux/redux-store.ts';

type MapStateToPropsType = {
  profile: AppStateType["profilePage"]["profile"]
  currentUserId: number | null
  isAuth: boolean
  status: string
  isOwner?: boolean
}
type MapDispatchToPropsType = {
  getProfile: (profileId: number) => void
  getStatus: (profileId: number) => void
  updateStatus: (newStatus: string) => void
  savePhoto: (file: any) => void
  saveProfile: (profileData: any) => void
}
type RouterParamsProfileIdType = {
  profileId: number | null
}
type RouterParamsType = {
  params: RouterParamsProfileIdType
}
type OwnPropsType = {
  router: RouterParamsType
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType
type StateType = {
  isRedirectRoLogin: boolean
}

class ProfileContainer extends React.Component<PropsType, StateType> {

  //локальный стейт для редиректа на страницу логина, когда не авторизованы и не настранице конеретного пользователя
  state = {
    isRedirectRoLogin: false
  }

  activateRedirectToLogin = () => {
    this.setState({
      isRedirectRoLogin: true
    });
  }

  deactivateRedirectToLogin = () => {
    this.setState({
      isRedirectRoLogin: false
    });
  }

  refreshProfile() {
    let profileId = this.props.router.params.profileId;
    if (!profileId) {
      profileId = this.props.currentUserId;
      if (!profileId) {
        this.activateRedirectToLogin();
      }

    }
    if (profileId) {
      this.props.getProfile(profileId);
      this.props.getStatus(profileId);
    }
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: PropsType, prevState: StateType, snapshot: any) {
    if (this.props.router.params.profileId != prevProps.router.params.profileId) {
      this.refreshProfile();
    }
  }

  render() {
    //редирект на страницу логина
    if (this.state.isRedirectRoLogin) {
      this.deactivateRedirectToLogin();
      return <Navigate to={"/login"} />;
    } else {
      return (
        <div>
          <Profile {...this.props}
            isOwner={!this.props.router.params.profileId}
            profile={this.props.profile}
            status={this.props.status}
            updateStatus={this.props.updateStatus}
            savePhoto={this.props.savePhoto}
            saveProfile={this.props.saveProfile} />
        </div>
      );
    }
  }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  profile: state.profilePage.profile,
  currentUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
  status: state.profilePage.status,
});

export default compose(
  withRouter,
  //withAuthRedirect,
  connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, { getProfile, getStatus, updateStatus, savePhoto, saveProfile })
)(ProfileContainer);