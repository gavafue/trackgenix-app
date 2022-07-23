import styles from './header.module.css';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import firebase from 'helper/firebase';

function Header() {
  const userLogged = useSelector((state) => state.auth.authenticated.data);
  const HeaderTitle = {
    '/employee/home': `Welcome ${userLogged?.firstName} ${userLogged?.lastName}!`,
    '/employee/profile': 'Edit Profile',
    '/employee/projects': 'Projects',
    '/employee/timesheet': 'Personal Timesheet',
    '/superadmin/home': `Welcome ${userLogged?.firstName} ${userLogged?.lastName}!`,
    '/superadmin/admins': 'Admins',
    '/superadmin/addAdmin': 'Admins',
    '/admin/home': `Welcome ${userLogged?.name} ${userLogged?.lastName}!`,
    '/admin/employees': 'Employees',
    '/admin/projects': 'Projects'
  };
  const location = useLocation();

  return (
    <header>
      <div className={styles.container}>
        <div className={styles.title}>{HeaderTitle[location.pathname] ?? 'TRACKGENIX'}</div>
        <div>
          {userLogged ? (
            <a
              href="/home"
              rel="noreferrer"
              onClick={() => {
                firebase.auth().signOut();
              }}
            >
              Log out
            </a>
          ) : (
            ''
          )}
          {location.pathname === '/login' || userLogged ? (
            ''
          ) : (
            <a href="/login" rel="noreferrer">
              Log in
            </a>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
