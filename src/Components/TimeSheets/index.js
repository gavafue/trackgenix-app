import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './timesheets.module.css';
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
  showFeedbackMessage,
  selectOneTimesheet,
  cleanSelectedTimesheet
} from '../../redux/timesheet/actions';

const TimeSheets = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cleanSelectedTimesheet());
    dispatch(getTimesheets());
  }, []);

  const timesheets = useSelector((state) => state.timesheets.list);
  const isPending = useSelector((state) => state.timesheets.isPending);
  const feedbackInfo = useSelector((state) => state.timesheets.infoForFeedback);
  const deleteInfo = useSelector((state) => state.timesheets.infoForDelete);
  const showDelete = useSelector((state) => state.timesheets.showDeleteMessage);
  const showFeedback = useSelector((state) => state.timesheets.showFeedbackMessage);

  const history = useHistory();

  const editData = (row) => {
    dispatch(selectOneTimesheet(row));
    history.push(`/time-sheets/form/`);
  };
  const deleteHandler = () => {
    dispatch(deleteTimesheet(deleteInfo));
  };
  const createTimesheet = () => {
    history.push('/time-sheets/form');
  };

  const timesheetData = timesheets.map((timeSheet) => {
    return {
      ...timeSheet,
      name: timeSheet?.project?.name || 'Project not found',
      employeeName: timeSheet?.employee?.firstName || 'Employee not found'
    };
  });
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
          setShowModal={(isModalShowed) => dispatch(showDeleteMessage(isModalShowed))}
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
      {isPending && <Loader />}
    </section>
  );
};

export default TimeSheets;
