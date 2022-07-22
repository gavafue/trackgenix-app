import styles from './header.module.css';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import firebase from 'helper/firebase';
import Button from '../Button';

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
  const history = useHistory();

  return (
    <header>
      <div className={styles.container}>
        <div className={styles.title}>{HeaderTitle[location.pathname] ?? 'TRACKGENIX'}</div>
        <div>
          {!userLogged && location.pathname !== '/login' && (
            <Button label="Login" onClick={() => history.push('/login')} theme="secondary" />
          )}
          {!userLogged && !location.pathname.startsWith('/home') && location.pathname !== '/' && (
            <Button label="Home" onClick={() => history.push('/home')} theme="secondary" />
          )}
          {!userLogged && location.pathname !== '/register/employee' && (
            <Button
              label="Signup"
              onClick={() => history.push('/register/employee')}
              theme="secondary"
            />
          )}
          {userLogged && (
            <Button
              label="Logout"
              onClick={() => {
                firebase.auth().signOut();
                history.push('/home');
              }}
              theme="secondary"
            />
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
