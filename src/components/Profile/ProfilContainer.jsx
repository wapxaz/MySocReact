import React from 'react';
import Profile from './Profile';
import axios from 'axios';
import { connect } from 'react-redux';
import {setUserProfile} from '../../redux/profile-reducer';
import {useLocation, useNavigate, useParams} from "react-router-dom";

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
    if(!profileId)
    {
      profileId = 2;
    }
    axios.get(`https://social-network.samuraijs.com/api/1.0//profile/${profileId}`).then(response => {
            this.props.setUserProfile(response.data);
        });
        debugger;
  }
  render() {
    return (
      <div>
        <Profile {...this.props} profile={this.props.profile} />
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile
});

let WithUrlDataConteinerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps,{setUserProfile})(WithUrlDataConteinerComponent);