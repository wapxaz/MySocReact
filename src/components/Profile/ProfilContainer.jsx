import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getProfile, getStatus, updateStatus } from '../../redux/profile-reducer';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

// wrapper to use react router's v6 hooks in class component(to use HOC pattern, like in router v5)
function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

class ProfileContainer extends React.Component {
  componentDidMount() {
    let profileId = this.props.router.params.profileId;
    if(this.props.isAuth && this.props.currentUserId)
    {
      profileId = this.props.currentUserId;

    }else if (!profileId) {
      profileId = 2;
    }
    this.props.getProfile(profileId);
    this.props.getStatus(profileId);
  }
  render() {
    return (
      <div>
        <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} />
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
  withAuthRedirect,
  connect(mapStateToProps, { getProfile, getStatus, updateStatus })
)(ProfileContainer);