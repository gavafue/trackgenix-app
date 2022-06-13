import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './time-sheets.module.css';
import Table from '../Shared/Table';
import Modal from '../Shared/Modal';
import DeleteMessage from '../Shared/DeleteMessage';
import FeedbackMessage from '../Shared/FeedbackMessage';
import Button from '../Shared/Button';
import Loader from '../Shared/Preloader';
import { useSelector, useDispatch } from 'react-redux';
import { getTimesheets, deleteTimesheet } from '../../redux/timesheet/thunks';
import {
  setInfoForDelete,
  showDeleteMessage,
  showFeedbackMessage
} from '../../redux/timesheet/actions';

const TimeSheets = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTimesheets());
  }, []);
  const timesheets = useSelector((state) => state.timesheets.list);
  const pending = useSelector((state) => state.timesheets.pending);
  const feedbackInfo = useSelector((state) => state.timesheets.infoForFeedback);
  const deleteInfo = useSelector((state) => state.timesheets.infoForDelete);
  const showDelete = useSelector((state) => state.timesheets.showDeleteMessage);
  const showFeedback = useSelector((state) => state.timesheets.showFeedbackMessage);

  const history = useHistory();

  const editData = (id) => {
    history.push(`/time-sheets/form/${id}`);
  };
  const deleteHandler = () => {
    dispatch(deleteTimesheet(deleteInfo));
  };
  const createTimesheet = () => {
    history.push('/time-sheets/form');
  };

  // const deleteTimesheet = (string) => {
  //   const options = {
  //     method: 'DELETE',
  //     url: `${`${process.env.REACT_APP_API_URL}`}/timesheets/${string}`
  //   };

  //   fetch(options.url, options)
  //     .then((response) => response.json())
  //     .then((response) => {
  //       if (response.error === true) {
  //         setInfoForFeedback({
  //           title: 'Something went wrong',
  //           description: response.message
  //         });
  //       } else {
  //         setInfoForFeedback({
  //           title: 'Request done!',
  //           description: response.message
  //         });
  //         setTimeSheets(timeSheets.filter((timeSheet) => timeSheet._id !== string));
  //         setShowFeedbackMessage(true);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

  const timesheetData = timesheets.map((timeSheet) => {
    return {
      ...timeSheet,
      name: timeSheet?.project?.name || 'Project not found',
      employeeName: timeSheet?.employee?.firstName || 'Employee not found'
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
          headersName={[
            'Project Name',
            'Date',
            'Description',
            'Hours Worked',
            'WeekSprint',
            'Employee'
          ]}
          headers={['name', 'date', 'workDescription', 'hoursWorked', 'weekSprint', 'employeeName']}
          setShowModal={(boolean) => dispatch(showDeleteMessage(boolean))}
          setInfoForDelete={(timesheetId) => dispatch(setInfoForDelete(timesheetId))}
          editData={editData}
          deleteTimesheet={deleteHandler}
        />
      </div>
      <Modal
        isOpen={showDelete}
        handleClose={() => {
          dispatch(showDeleteMessage(false));
        }}
      >
        <DeleteMessage
          handleClose={() => {
            dispatch(showDeleteMessage(false));
          }}
          infoForDelete={deleteInfo}
          deleteItem={deleteHandler}
          setShowModal={(boolean) => dispatch(showDeleteMessage(boolean))}
        />
      </Modal>
      <Modal
        isOpen={showFeedback}
        handleClose={() => {
          dispatch(showFeedbackMessage(false));
        }}
      >
        <FeedbackMessage infoForFeedback={feedbackInfo} />
      </Modal>
      {pending && <Loader />}
    </section>
  );
};

export default TimeSheets;
