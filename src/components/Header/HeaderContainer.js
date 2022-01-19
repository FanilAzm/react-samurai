import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import {logout} from '../../redux/authReducer';
import { getHeaderIsAuthSelector, getLoginSelector } from '../../redux/selectors/header-selectors';

class HeaderContainer extends React.Component {
  
  render() {
    return(
      <Header {...this.props} />
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     isAuth: state.auth.isAuth,
//     login: state.auth.login
//   }
// }

const mapStateToProps = (state) => {
  return {
    isAuth: getHeaderIsAuthSelector(state),
    login: getLoginSelector(state)
  }
}

export default connect(mapStateToProps, {logout})(HeaderContainer);