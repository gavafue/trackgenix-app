import styles from './navbar.module.css';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
        <li>
          <Link to="/admins">admins</Link>
        </li>
        <li>
          <Link to="/super-admins">super admins</Link>
        </li>
        <li>
          <Link to="/employees">employees</Link>
        </li>
        <li>
          <Link to="/projects">projects</Link>
        </li>
        <li>
          <Link to="/time-sheets">timesheets</Link>
        </li>
        <li>
          <Link to="/tasks">tasks</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
