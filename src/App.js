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
import { BrowserRouter, Route } from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';

function App() {
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

export default App;
