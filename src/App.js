import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import NavBar from './components/NavBar/NavBar';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import Login from './components/Login/Login';
import OnlineUsers from './components/OnlineUsers/OnlineUsers';
import { HashRouter, Route, withRouter } from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {initialized} from './redux/appReducer';
import Preloader from './components/common/Preloader/Preloader';
import store from './redux/redux-store';
import {Provider} from 'react-redux';
import withSuspense from './hoc/withSuspense';
import { Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

class App extends React.Component {
  componentDidMount() {
    this.props.initialized();
  }

  render() {
    if(!this.props.initialized) {
      return <Preloader />
    }

    return (
      <HashRouter>
        <div className="app-wrapper">
          <HeaderContainer />
          <NavBar />
          <div className="app-wrapper-content">
            <Switch>
              <Route
                exact
                path="/"
                render={ withSuspense(ProfileContainer) }
              />
              <Route
                path="/profile/:userId?"
                render={ withSuspense(ProfileContainer) }
              />
              <Route
                exact
                path="/dialogs"
                render={ withSuspense(DialogsContainer) }
              />
              <Route
                path="/users"
                render={ () => <UsersContainer/>}  
              />
              <Route path="/news" component={News}/>
              <Route path="/music" component={Music}/>
              <Route path="/settings" component={Settings}/>
              <Route path="/login" component={Login}/>
              <Route
                path="*"
                render={ () => <div>404 NotFound</div>}  
              />
            </Switch>
          </div>
          <OnlineUsers />
        </div>
      </HashRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
});

const AppContainer = compose(
  connect(mapStateToProps, {initialized})
)(App);

const SamuraiJSApp = (props) => {
  return(
    <React.StrictMode>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </React.StrictMode>
  )
}

export default SamuraiJSApp;