import styles from './preloader.module.css';
const Preloader = () => {
  return (
    <div className={styles.body}>
      <div className={styles.loader}>Loading...</div>
    </div>
  );
};
export default Preloader;
