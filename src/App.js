import React from 'react';
import logo from './logo.svg';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import NavBar from './components/NavBar/NavBar';
import ProfileContainer from './components/Profile/ProfileContainer';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import Login from './components/Login/Login';
import OnlineUsers from './components/OnlineUsers/OnlineUsers';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {initialized} from './redux/appReducer';
import Preloader from './components/common/Preloader/Preloader';

class App extends React.Component {
  componentDidMount() {
    this.props.initialized();
  }

  render() {
    if(!this.props.initialized) {
      return <Preloader />
    }

    return (
      <BrowserRouter>
        <div className="app-wrapper">
          <HeaderContainer />
          <NavBar />
          <div className="app-wrapper-content">
            <Route
              path="/profile/:userId?"
              render={ () => <ProfileContainer/> }
            />
            <Route
              exact
              path="/dialogs"
              render={ () => <DialogsContainer/> }
            />
            <Route
              path="/users"
              render={ () => <UsersContainer/>}  
            />
            <Route path="/news" component={News}/>
            <Route path="/music" component={Music}/>
            <Route path="/settings" component={Settings}/>
            <Route path="/login" component={Login}/>
          </div>
          <OnlineUsers />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
});

export default compose(
  connect(mapStateToProps, {initialized})
)(App);
