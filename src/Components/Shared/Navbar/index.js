import styles from './navbar.module.css';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { employeeNavbar, defaultNavbaritems } from 'libs/navbarConfig';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const employeeLogged = useSelector((state) => state.employees.employeeLogged);
  const location = useLocation().pathname;
  const navBarItems = location.includes('/employee/') ? employeeNavbar : defaultNavbaritems;
  const employeeName =
    employeeLogged.firstName && employeeLogged.lastName
      ? `${employeeLogged.firstName} ${employeeLogged.lastName}`
      : '';
  return (
    <nav className={styles.navbar}>
      <div className={styles.appName}>
        <div className={styles.userContainer}>
          <div className={styles.userName}>
            {location.includes('/employee/') ? employeeName : 'Pepito'}
          </div>
          <div className={styles.profileImg}>
            {location.includes('/employee/') ? (
              <img src={employeeLogged?.photo}></img>
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
