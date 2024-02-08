import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../../redux/profile-reducer';
import { Navigate } from "react-router-dom";
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { withRouter } from '../../hoc/withRouter';

class ProfileContainer extends React.Component {

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

  componentDidUpdate(prevProps, prevState, snapshot) {
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

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  currentUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
  status: state.profilePage.status,
});

export default compose(
  withRouter,
  //withAuthRedirect,
  connect(mapStateToProps, { getProfile, getStatus, updateStatus, savePhoto, saveProfile })
)(ProfileContainer);