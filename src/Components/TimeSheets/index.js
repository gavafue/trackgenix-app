import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './time-sheets.module.css';
import Table from '../Shared/Table';
import Modal from '../Shared/Modal';
import DeleteMessage from '../Shared/DeleteMessage';
import FeedbackMessage from '../Shared/FeedbackMessage';
import Button from '../Shared/Button';
import Loader from '../Shared/Preloader';
import { useSelector, useDispatch } from 'react-redux';
import { getTimesheets } from '../../redux/timesheet/thunks';

const TimeSheets = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTimesheets());
  }, []);
  const timesheets = useSelector((state) => state.timesheets.list);
  const pending = useSelector((state) => state.timesheets.pending);
  const [timeSheets, setTimeSheets] = useState([]);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [showFeedbackMessage, setShowFeedbackMessage] = useState(false);
  const [infoForDelete, setInfoForDelete] = useState('');
  const [infoForFeedback, setInfoForFeedback] = useState({});

  const history = useHistory();

  const editData = (id) => {
    history.push(`/time-sheets/form/${id}`);
  };

  const createTimesheet = () => {
    history.push('/time-sheets/form');
  };

  const deleteTimesheet = (string) => {
    const options = {
      method: 'DELETE',
      url: `${`${process.env.REACT_APP_API_URL}`}/timesheets/${string}`
    };

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
  };

  const timesheetData = timesheets.map((timeSheet) => {
    return {
      ...timeSheet,
      name: timeSheet.project?.name
    };
  });
  console.log(timesheetData);
  return (
    <section className={styles.container}>
      <h1>Timesheets</h1>
      <div>
        <Button onClick={createTimesheet} label="Add new timesheet" />
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
      {pending && <Loader />}
    </section>
  );
};

export default TimeSheets;
