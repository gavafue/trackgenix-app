import styles from './timesheet.module.css';
import { useEffect } from 'react';
import EmployeeTable from '../TableAndContents';
import { useSelector, useDispatch } from 'react-redux';
import { getTimesheets } from 'redux/timesheet/thunks';
import TimesheetTableContent from '../TableAndContents/Content/timesheetTableContent';
import Modal from 'Components/Shared/Modal';
import Loader from 'Components/Shared/Preloader';
import { showFeedbackMessage } from 'redux/timesheet/actions';
import Form from 'Components/Shared/Form';
import Input from 'Components/Shared/Input/InputText';
import { useForm } from 'react-hook-form';
function EmployeeTimesheets() {
  const employeeLogged = useSelector((state) => state.employees.employeeLogged);
  const timesheets = useSelector((state) => state.timesheets.list);
  const showFeedback = useSelector((state) => state.timesheets.showFeedbackMessage);
  const isPending = useSelector((state) => state.timesheets.isPending);
  const dispatch = useDispatch();
  const { handleSubmit, register } = useForm({
    mode: 'onBlur'
  });

  useEffect(() => {
    dispatch(getTimesheets());
  }, []);
  const timesheetData = timesheets
    .filter((timesheet) => timesheet.employee?._id === employeeLogged._id)
    .map((timesheet) => ({
      ...timesheet,
      name: timesheet?.project?.name || 'Project not found'
    }));

  const onSubmitAddHours = (data, event) => {
    event.preventDefault();
    console.log(data);
  };
  return (
    <section className={styles.container}>
      <h2>Your Timesheets</h2>
      <EmployeeTable
        headersName={[
          'Project',
          'Work Description',
          'Week Sprint',
          'Hours Projected',
          'Hours Worked'
        ]}
      >
        <TimesheetTableContent
          setShowModal={(isModalShowed) => dispatch(showFeedbackMessage(isModalShowed))}
          data={timesheetData}
          headers={['name', 'workDescription', 'weekSprint', 'hoursProject', 'hoursWorked']}
        />
      </EmployeeTable>
      <Modal
        isOpen={showFeedback}
        handleClose={() => {
          dispatch(showFeedbackMessage(false));
        }}
      >
        <Form onSubmit={handleSubmit(onSubmitAddHours)}>
          <Input name="addHoursWorked" register={register} label="Hours to add"></Input>
        </Form>
      </Modal>
      {isPending && <Loader />}
    </section>
  );
}

export default EmployeeTimesheets;
