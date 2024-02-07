import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getProfile, getStatus, updateStatus, savePhoto } from '../../redux/profile-reducer';
import { Navigate } from "react-router-dom";
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { withRouter } from '../../hoc/withRouter';

class ProfileContainer extends React.Component {

  refreshProfile() {
    let profileId = this.props.router.params.profileId;
    if (!profileId) {
      profileId = this.props.currentUserId;
      if (!profileId) {
        window.location.replace("/login");
        //return <Navigate to={"/login"} />
      }

    }
    this.props.getProfile(profileId);
    this.props.getStatus(profileId);
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
    return (
      <div>
        <Profile {...this.props}
            isOwner={!this.props.router.params.profileId}
            profile={this.props.profile}
            status={this.props.status}
            updateStatus={this.props.updateStatus}
            savePhoto={this.props.savePhoto} />
      </div>
    );
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
  connect(mapStateToProps, { getProfile, getStatus, updateStatus, savePhoto })
)(ProfileContainer);