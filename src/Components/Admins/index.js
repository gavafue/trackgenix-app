import styles from './admins.module.css';
import AdminsTable from './Table';

function Admins() {
  return (
    <section className={styles.container}>
      <AdminsTable />
    </section>
  );
}

export default Admins;
