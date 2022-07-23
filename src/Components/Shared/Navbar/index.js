import styles from './navbar.module.css';
import React from 'react';
// import { Link } from 'react-router-dom';
import { employeeNavbar, superAdminNavbar, adminNavbar, publicNavbar } from 'libs/navbarConfig';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const userLogged = useSelector((state) => state.auth.authenticated.data);
  const userLoggedRole = useSelector((state) => state.auth.authenticated.role);
  const navbarItems =
    userLoggedRole == 'EMPLOYEE'
      ? employeeNavbar
      : userLoggedRole == 'SUPERADMIN'
      ? superAdminNavbar
      : userLoggedRole == 'ADMIN'
      ? adminNavbar
      : publicNavbar;
  const userName =
    userLogged?.firstName && userLogged?.lastName
      ? `${userLogged?.firstName} ${userLogged?.lastName}`
      : '';
  return (
    <nav className={styles.navbar}>
      <div className={styles.appName}>
        <div className={styles.userContainer}>
          <div className={styles.userName}>{userLogged ? userName : 'Menu'}</div>
          <div className={styles.profileImg}>
            {navbarItems === employeeNavbar ? <img src={userLogged?.photo}></img> : ''}
          </div>
        </div>
      </div>
      <ul className={styles.rutes}>
        {navbarItems.map((item) => {
          return (
            <li key={item.path}>
              <a href={item.path}>{item.name}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default Navbar;
