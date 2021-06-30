import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';

const Header = (props) => {
  return(
    <header className={s.header}>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQWEtOjmSIgLT_6bSSd0jx8IFdmocKUAG7nQ&usqp=CAU" />
      <div className={s.login}>
        { props.isAuth ? props.login : <NavLink to={'/auth'}>Login</NavLink> }
      </div>
    </header>
  );
}

export default Header;