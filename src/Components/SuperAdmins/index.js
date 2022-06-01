import styles from './super-admins.module.css';
import SuperAdminsTable from './Table';

const createSuperAdmin = () => {
  window.location.href = '/super-admins/form';
};

function SuperAdmins() {
  return (
    <section className={styles.container}>
      <SuperAdminsTable />
      <button onClick={createSuperAdmin}>Add SuperAdmin</button>
    </section>
  );
}

export default SuperAdmins;
