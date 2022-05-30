import EmployeesTable from './EmployeesTable';
import styles from './employees.module.css';

function Employees() {
  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      <a href="/employees/form" className={styles.button}>
        Add new employee +
      </a>
      <EmployeesTable />
    </section>
  );
}

export default Employees;
