import React, {FC} from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import NavBar from './components/NavBar/NavBar';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import Login from './components/Login/Login';
import OnlineUsers from './components/OnlineUsers/OnlineUsers';
import { HashRouter, Route } from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {initialized} from './redux/appReducer';
import Preloader from './components/common/Preloader/Preloader';
import store, {AppStoreType} from './redux/redux-store';
import {Provider} from 'react-redux';
import {withSuspense} from './hoc/withSuspense';
import { Switch } from 'react-router-dom';

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

const SuspendedProfile = withSuspense(ProfileContainer)
const SuspendedDialogs = withSuspense(DialogsContainer)

type StatePropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initialized: () => void
}

class App extends React.Component<StatePropsType & DispatchPropsType> {
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
                render={ () => <SuspendedProfile /> }
              />
              <Route
                path="/profile/:userId?"
                render={ () => <SuspendedProfile /> }
              />
              <Route
                exact
                path="/dialogs"
                render={ () => <SuspendedDialogs /> }
              />
              <Route
                path="/users"
                // @ts-ignore
                render={ () => <UsersContainer pageTitle={"Самураи"} />}
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

const mapStateToProps = (state: AppStoreType) => ({
  initialized: state.app.initialized
});

const AppContainer = compose<React.ComponentType>(
  connect(mapStateToProps, {initialized})
)(App);

const SamuraiJSApp: FC = () => {
  return(
    <React.StrictMode>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </React.StrictMode>
  )
}

export default SamuraiJSApp;
