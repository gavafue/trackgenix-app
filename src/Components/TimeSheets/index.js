import styles from './time-sheets.module.css';
import TimesheetsTable from './Table';

const TimeSheets = () => {
  return (
    <section className={styles.container}>
      <h2>Timesheets</h2>
      <TimesheetsTable />
      <button className={styles.addBtn}>
        <a href="/time-sheets/form">Add New Timesheet</a>
      </button>
    </section>
  );
};

export default TimeSheets;
