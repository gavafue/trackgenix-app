import styles from './navbar.module.css';

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
          <a href="/admins">admins</a>
        </li>
        <li>
          <a href="/super-admins">super admins</a>
        </li>
        <li>
          <a href="/employees">employees</a>
        </li>
        <li>
          <a href="/projects">projects</a>
        </li>
        <li>
          <a href="/time-sheets">timesheets</a>
        </li>
        <li>
          <a href="/tasks">tasks</a>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
