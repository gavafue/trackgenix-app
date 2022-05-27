import { useEffect, useState } from 'react';
import styles from './time-sheets.module.css';

const TimeSheets = () => {
  const [timeSheets, saveTimeSheets] = useState([]);
  console.log(timeSheets);
  const url = `${process.env.REACT_APP_API_URL}timesheets`;
  useEffect(async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      saveTimeSheets(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <section className={styles.container}>
      <h2>TimeSheets</h2>
      <table className={styles.table}>
        <thead>
          <th>Project</th>
          <th>Date</th>
          <th>Hours Worked</th>
          <th>Week Sprint</th>
          <th></th>
          <th></th>
        </thead>
        <tbody>
          {timeSheets.map((timeSheet) => {
            return (
              <tr key={timeSheet._id}>
                <td>{timeSheet.project.name}</td>
                <td>{timeSheet.date}</td>
                <td>{timeSheet.hoursWorked}</td>
                <td>{timeSheet.weekSprint}</td>
                <td>
                  <button>edit</button>
                </td>
                <td>
                  <button>delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default TimeSheets;
