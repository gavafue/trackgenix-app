import styles from './header.module.css';

function Header() {
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.brand}>Radium Rocket</div>
        <div>
          <a href="#" rel="noreferrer">
            Log out
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
