import React from 'react';
import {connect} from 'react-redux';
import Profile from './Profile';
import {getProfile, getStatus, updateStatus, savePhoto, saveProfile} from '../../redux/profileReducer';
import {RouteComponentProps, withRouter } from 'react-router-dom';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { getProfileSelector, getStatusSelector, getAuthorizedUserId, getIsAuth } from '../../redux/selectors/profile-selectors';
import {AppStoreType} from "../../redux/redux-store";
import {ProfileType} from "../../types/types";

type MapPropsType = {
  profile: ProfileType | null
  status: string
  authorizedUserId: number | null
  isAuth: boolean
}

type MapDispatchPropsType = {
  getProfile: (userId: number) => void
  getStatus: (userId: number) => void
  updateStatus: (status: string) => void
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => Promise<any>
}

type PathParamsType = {
  userId: string
}

type PropsType = MapPropsType & MapDispatchPropsType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsType> {
  refreshProfile() {
    let userId: number | null = +this.props.match.params.userId;
    if(!userId) {
      userId = this.props.authorizedUserId;
      if(!userId) {
        this.props.history.push("/login")
      }
    }

    if(!userId) {
      throw new Error("ID should exists in URI params or in state 'authorizedUserId' ")
    } else {
      this.props.getProfile(userId);
      this.props.getStatus(userId);
    }
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
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
        saveProfile={this.props.saveProfile}
      />
    )
  }
}

const mapStateToProps = (state: AppStoreType): MapPropsType => {
  return {
    profile: getProfileSelector(state),
    status: getStatusSelector(state),
    authorizedUserId: getAuthorizedUserId(state),
    isAuth: getIsAuth(state)
  }
}

export default compose<React.ComponentType>(
  connect(mapStateToProps, {getProfile, getStatus, updateStatus, savePhoto, saveProfile}),
  withRouter,
  withAuthRedirect
)(ProfileContainer);

// const AuthRedirectComponent = withAuthRedirect(ProfileContainer);
// const WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);
// export default connect(mapStateToProps, {getProfile})(WithUrlDataContainerComponent);
