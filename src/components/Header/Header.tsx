import React, {FC} from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';

type PropsType = {
  isAuth: boolean
  login: string | null
  logout: () => void
}

const Header: FC<PropsType> = (props) => {
  return(
    <header className={s.header}>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQWEtOjmSIgLT_6bSSd0jx8IFdmocKUAG7nQ&usqp=CAU" />
      <div className={s.login}>
        { props.isAuth
          ? <div>{props.login} <button onClick={props.logout}>Log out</button></div>
          : <NavLink to={'/login'}>Login</NavLink> }
      </div>
    </header>
  );
}

export default Header;
