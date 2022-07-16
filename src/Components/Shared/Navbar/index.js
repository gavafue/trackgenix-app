import styles from './navbar.module.css';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  employeeNavbar,
  superAdminNavbar,
  defaultNavbaritems,
  adminNavbar
} from 'libs/navbarConfig';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const userLogged = useSelector((state) => state.auth.authenticated.data);
  const location = useLocation().pathname;
  const locationEmployee = location.includes('/employee/');
  const locationSuperAdmin = location.includes('/superadmin/');
  const locationAdmin = location.includes('/admin/');
  const navBarItems = locationEmployee
    ? employeeNavbar
    : locationSuperAdmin
    ? superAdminNavbar
    : locationAdmin
    ? adminNavbar
    : defaultNavbaritems;
  const userName =
    userLogged?.firstName && userLogged?.lastName
      ? `${userLogged?.firstName} ${userLogged?.lastName}`
      : '';
  return (
    <nav className={styles.navbar}>
      <div className={styles.appName}>
        <div className={styles.userContainer}>
          <div className={styles.userName}>{userLogged ? userName : ''}</div>
          <div className={styles.profileImg}>
            {userLogged.photo ? (
              <img src={userLogged?.photo}></img>
            ) : (
              <img src="http://www.4x4.ec/overlandecuador/wp-content/uploads/2017/06/default-user-icon-8.jpg" />
            )}
          </div>
        </div>
      </div>
      <ul className={styles.rutes}>
        {navBarItems.map((item) => {
          return (
            <li key={item.path}>
              <Link to={item.path}>{item.name}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default Navbar;
