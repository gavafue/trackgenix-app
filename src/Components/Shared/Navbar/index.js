import styles from './navbar.module.css';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { employeeNavbar, defaultNavbaritems } from 'libs/navbarConfig';

const Navbar = () => {
  const location = useLocation().pathname;
  const navBarItems = location.includes('/employee/') ? employeeNavbar : defaultNavbaritems;
  return (
    <nav className={styles.navbar}>
      <div className={styles.appName}>
        <div className={styles.username}>
          <div>Pepito</div>
          <div className={styles.profileImg}></div>
        </div>
        <p>Role</p>
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
