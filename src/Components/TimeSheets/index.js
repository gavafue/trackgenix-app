import styles from './time-sheets.module.css';
import TimesheetsTable from './Table';
import { useEffect, useState } from 'react';

const TimeSheets = () => {
  const [timeSheets, setTimeSheets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const url = `${process.env.REACT_APP_API_URL}`;
  useEffect(() => {
    fetch(`${url}/timesheets`)
      .then((res) => res.json())
      .then((data) => {
        setTimeSheets(data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const deleteTimesheet = (string, setContentFeedbackModal) => {
    const options = {
      method: 'DELETE',
      url: `${`${process.env.REACT_APP_API_URL}`}/timesheets/${string}`
    };
    fetch(options.url, options)
      .then((response) => response.json())
      .then((response) => {
        if (response.error === true) {
          // setShowModal(false);
          setContentFeedbackModal({ title: 'Something went wrong', description: response.message });
        } else {
          // setShowModal(false);
          setContentFeedbackModal({ title: 'Request done!', description: response.message });
          setTimeSheets(timeSheets.filter((timeSheet) => timeSheet._id !== string));
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <section className={styles.container}>
      <h2>Timesheets</h2>
      <TimesheetsTable
        timeSheets={timeSheets}
        deleteTimesheet={deleteTimesheet}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <button className={styles.addBtn}>
        <a href="/time-sheets/form">Add New Timesheet</a>
      </button>
    </section>
  );
};

export default TimeSheets;
