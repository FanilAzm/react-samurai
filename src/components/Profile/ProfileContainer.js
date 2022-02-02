import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import {getProfile, getStatus, updateStatus, savePhoto} from '../../redux/profileReducer';
import { withRouter } from 'react-router-dom';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { getProfileSelector, getStatusSelector, getAuthorizedUserId, getIsAuth } from '../../redux/selectors/profile-selectors';

class ProfileContainer extends React.Component {
  refreshProfile() {
    let userId = this.props.match.params.userId;
    if(!userId) {
      userId = this.props.authorizedUserId;
    }

    this.props.getProfile(userId);
    this.props.getStatus(userId);
  }
  
  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.match.params.userId != prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }
  
  render() {
    return(
      <Profile
        {...this.props}
        profile={this.props.profile}
        status={this.props.status}
        isOwner={!this.props.match.params.userId}
        savePhoto={this.props.savePhoto}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: getProfileSelector(state),
    status: getStatusSelector(state),
    authorizedUserId: getAuthorizedUserId(state),
    isAuth: getIsAuth(state)
  }
}

export default compose(
  connect(mapStateToProps, {getProfile, getStatus, updateStatus, savePhoto}),
  withRouter,
  withAuthRedirect
)(ProfileContainer);

// const AuthRedirectComponent = withAuthRedirect(ProfileContainer);
// const WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);
// export default connect(mapStateToProps, {getProfile})(WithUrlDataContainerComponent);