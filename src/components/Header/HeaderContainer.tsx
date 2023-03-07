import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import {logout} from '../../redux/authReducer';
import { getHeaderIsAuthSelector, getLoginSelector } from '../../redux/selectors/header-selectors';
import {AppStoreType} from "../../redux/redux-store";

type MapStatePropsType = {
  isAuth: boolean
  login: string | null
}

type MapDispatchPropsType = {
  logout: () => void
}

class HeaderContainer extends React.Component<MapStatePropsType & MapDispatchPropsType> {
  render() {
    return(
      <Header {...this.props} />
    )
  }
}

const mapStateToProps = (state: AppStoreType): MapStatePropsType => {
  return {
    isAuth: getHeaderIsAuthSelector(state),
    login: getLoginSelector(state)
  }
}

export default connect(mapStateToProps, {logout})(HeaderContainer);
