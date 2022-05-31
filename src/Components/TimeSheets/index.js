import styles from './time-sheets.module.css';
import TimesheetsTable from './Table';
import { useEffect, useState } from 'react';

const TimeSheets = () => {
  const [timeSheets, setTimeSheets] = useState([]);
  const changeVisibilityDeleteModal = (property) => {
    document.getElementById('id01').style.display = property;
  };
  const url = `${process.env.REACT_APP_API_URL}/timesheets`;
  useEffect(async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setTimeSheets(data.data);
      console.log(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);
  const deleteTimesheet = (string, setContentFeedbackModal) => {
    const options = {
      method: 'DELETE',
      url: `${process.env.REACT_APP_API_URL}/timesheets/${string}`
    };
    fetch(options.url, options).then(async (response) => {
      const res = await response.json();
      if (response.error === true) {
        setContentFeedbackModal({ title: 'Something went wrong', description: res.message });
      } else {
        setContentFeedbackModal({ title: 'Request done!', description: res.message });
        setTimeSheets(timeSheets.filter((timeSheet) => timeSheet._id !== string));
        changeVisibilityDeleteModal('none');
      }
    });
  };
  return (
    <section className={styles.container}>
      <h2>Timesheets</h2>
      <TimesheetsTable
        timeSheets={timeSheets}
        deleteTimesheet={deleteTimesheet}
        changeVisibilityDeleteModal={changeVisibilityDeleteModal}
      />
      <button className={styles.addBtn}>
        <a href="/time-sheets/form">Add New Timesheet</a>
      </button>
    </section>
  );
};

export default TimeSheets;
