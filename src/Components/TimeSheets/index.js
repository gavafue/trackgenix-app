import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './time-sheets.module.css';
import Table from '../Shared/Table';
import Modal from '../Shared/Modal';
import DeleteMessage from '../Shared/DeleteMessage';
import FeedbackMessage from '../Shared/FeedbackMessage';
import Button from '../Shared/Button';
import Loader from '../Shared/Preloader';

const TimeSheets = () => {
  const [timeSheets, setTimeSheets] = useState([]);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [showFeedbackMessage, setShowFeedbackMessage] = useState(false);
  const [infoForDelete, setInfoForDelete] = useState('');
  const [infoForFeedback, setInfoForFeedback] = useState({});
  const [showLoader, setShowLoader] = useState(false);
  const history = useHistory();

  const editData = (id) => {
    history.push(`/time-sheets/form/${id}`);
  };

  const createTimesheet = () => {
    history.push('/time-sheets/form');
  };

  useEffect(() => {
    setShowLoader(true);
    fetch(`${process.env.REACT_APP_API_URL}/timesheets`)
      .then((res) => res.json())
      .then((data) => {
        setTimeSheets(data.data);
        setShowLoader(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteTimesheet = (string) => {
    const options = {
      method: 'DELETE',
      url: `${`${process.env.REACT_APP_API_URL}`}/timesheets/${string}`
    };
    setShowLoader(true);
    fetch(options.url, options)
      .then((response) => response.json())
      .then((response) => {
        if (response.error === true) {
          setInfoForFeedback({
            title: 'Something went wrong',
            description: response.message
          });
        } else {
          setInfoForFeedback({
            title: 'Request done!',
            description: response.message
          });
          setTimeSheets(timeSheets.filter((timeSheet) => timeSheet._id !== string));
          setShowFeedbackMessage(true);
        }
      })
      .catch((err) => console.log(err));
    setShowLoader(false);
  };

  const timesheetData = timeSheets.map((timeSheet) => {
    return {
      name: timeSheet.project.name,
      date: timeSheet.date,
      hoursWorked: timeSheet.hoursWorked,
      weekSprint: timeSheet.weekSprint,
      ...timeSheet
    };
  });
  return (
    <section className={styles.container}>
      <h1 className={styles.label}>Timesheets</h1>
      <div className={styles.buttoncontainer}>
        <Button onClick={createTimesheet} label="Add new Timesheet" theme="secondary" />
      </div>
      <div>
        <Table
          data={timesheetData}
          headersName={['Project Name', 'Date', 'Hours Worked', 'WeekSprint']}
          headers={['name', 'date', 'hoursWorked', 'weekSprint']}
          setShowModal={setShowDeleteMessage}
          setInfoForDelete={setInfoForDelete}
          editData={editData}
        />
      </div>
      <Modal
        isOpen={showDeleteMessage}
        handleClose={() => {
          setShowDeleteMessage(false);
        }}
      >
        <DeleteMessage
          handleClose={() => {
            setShowDeleteMessage(false);
          }}
          infoForDelete={infoForDelete}
          deleteItem={deleteTimesheet}
          setShowModal={setShowDeleteMessage}
        />
      </Modal>
      <Modal
        isOpen={showFeedbackMessage}
        handleClose={() => {
          setShowFeedbackMessage(false);
        }}
      >
        <FeedbackMessage infoForFeedback={infoForFeedback} />
      </Modal>
      {showLoader && <Loader />}
    </section>
  );
};

export default TimeSheets;
