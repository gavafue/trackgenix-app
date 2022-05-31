import styles from './time-sheets.module.css';
import TimesheetsTable from './Table';
import { useEffect, useState } from 'react';

const TimeSheets = () => {
  const [timeSheets, saveTimeSheets] = useState([]);
  const url = `${process.env.REACT_APP_API_URL}/timesheets`;
  useEffect(async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      saveTimeSheets(data.data);
      console.log(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <section className={styles.container}>
      <h2>Timesheets</h2>
      <TimesheetsTable timeSheets={timeSheets} />
      <button className={styles.addBtn}>
        <a href="/time-sheets/form">Add New Timesheet</a>
      </button>
    </section>
  );
};

export default TimeSheets;
