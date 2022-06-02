import { useState } from 'react';
import styles from './table.module.css';
import DeleteModal from '../DeleteModal';

const TimesheetsTable = ({
  setShowFeedbackModal,
  showFeedbackModal,
  timeSheets,
  deleteTimesheet,
  showModal,
  setShowModal
}) => {
  const editTimesheet = (string) => {
    window.location = `/time-sheets/form?timesheetId=${string}`;
  };
  const [infoForDelete, setInfoForDelete] = useState({
    id: ''
  });
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
                    setShowModal(!showModal);
                    setInfoForDelete({
                      id: timeSheet._id
                    });
                  }}
                >
                  delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
      {showModal && (
        <DeleteModal
          deleteTimesheet={deleteTimesheet}
          modalId={infoForDelete.id}
          setInfoFoDelete={setInfoForDelete}
          showFeedbackModal={showFeedbackModal}
          setShowFeedbackModal={setShowFeedbackModal}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </table>
  );
};

export default TimesheetsTable;
