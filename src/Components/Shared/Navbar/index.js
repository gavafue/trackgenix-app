import styles from './navbar.module.css';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { employeeNavbar, defaultNavbaritems } from 'libs/navbarConfig';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const employeeLogged = useSelector((state) => state.employees.employeeLogged);
  const location = useLocation().pathname;
  const navBarItems = location.includes('/employee/') ? employeeNavbar : defaultNavbaritems;
  return (
    <nav className={styles.navbar}>
      <div className={styles.appName}>
        <div className={styles.userContainer}>
          <div className={styles.userName}>
            {navBarItems != employeeNavbar
              ? 'Pepito'
              : `${employeeLogged?.firstName} ${employeeLogged?.lastName}` || ''}
          </div>
          <div className={styles.profileImg}>
            {navBarItems != employeeNavbar ? (
              <img src="http://www.4x4.ec/overlandecuador/wp-content/uploads/2017/06/default-user-icon-8.jpg" />
            ) : (
              <img src={employeeLogged?.photo}></img>
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
