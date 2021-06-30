import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import {setUsersProfile} from '../../redux/profileReducer';
import { withRouter } from 'react-router-dom';
import {profileAPI} from '../../api/api';

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if(!userId) {
      userId = 2;
    }
    profileAPI.getProfileUser(userId)
      .then(data => {
        this.props.setUsersProfile(data)
      })
  }
  
  render() {
    return(
      <>
        <Profile {...this.props} profile={this.props.profile}/>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile
  }
}

const WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {setUsersProfile})(WithUrlDataContainerComponent);