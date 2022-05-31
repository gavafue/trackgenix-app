import { useEffect, useState } from 'react';
import styles from '../time-sheets.module.css';
import DeleteModal from '../DeleteModal';

const TimesheetsTable = () => {
  const editTimesheet = (string) => {
    window.location = `/time-sheets/form?timesheetId=${string}`;
  };
  const changeDisplayModal = (property) => {
    document.getElementById('id01').style.display = property;
  };
  const [timeSheets, saveTimeSheets] = useState([]);
  const [infoForDelete, setInfoToDelete] = useState({
    id: ''
  });
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
              <td>{JSON.stringify(timeSheet.project.name)}</td>
              <td>{timeSheet.date}</td>
              <td>{timeSheet.hoursWorked}</td>
              <td>{timeSheet.weekSprint}</td>
              <td>
                <button onClick={() => editTimesheet(timeSheet._id)}>edit</button>
              </td>
              <td>
                <button
                  onClick={() => {
                    setInfoToDelete({
                      id: timeSheet._id
                    });
                    changeDisplayModal('flex');
                  }}
                >
                  delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
      <DeleteModal modalId={infoForDelete.id} />
    </table>
  );
};

export default TimesheetsTable;
