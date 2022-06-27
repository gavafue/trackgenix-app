import styles from './timesheet.module.css';
import { useEffect, useState } from 'react';
import EmployeeTable from '../TableAndContents';
import { useSelector, useDispatch } from 'react-redux';
import { getTimesheets } from 'redux/timesheet/thunks';
import TimesheetTableContent from '../TableAndContents/Content/timesheetTableContent';
import Modal from 'Components/Shared/Modal';
import Loader from 'Components/Shared/Preloader';
import { showFeedbackMessage } from 'redux/timesheet/actions';
import Input from 'Components/Shared/Input/InputText';
import { useForm } from 'react-hook-form';
import { editTimesheet } from 'redux/timesheet/thunks';
import Button from 'Components/Shared/Button';
import FeedbackMessage from 'Components/Shared/FeedbackMessage';
import { joiResolver } from '@hookform/resolvers/joi';
import employeeTimesheetValidation from 'validations/employeeTimesheet';

function EmployeeTimesheets() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTimesheets());
  }, []);

  const employeeLogged = useSelector((state) => state.employees.employeeLogged);
  const timesheets = useSelector((state) =>
    state.timesheets.list
      .filter((timesheet) => timesheet.employee?._id === employeeLogged._id)
      .map((timesheet) => ({
        ...timesheet,
        projectName: timesheet?.project?.name || 'Project not found'
      }))
  );
  const showFeedback = useSelector((state) => state.timesheets.showFeedbackMessage);
  const isPending = useSelector((state) => state.timesheets.isPending);
  const selectedTimesheet = useSelector((state) => state.timesheets.timesheetSelected);
  const feedbackInfo = useSelector((state) => state.timesheets.infoForFeedback);
  const [showForm, setShowForm] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onSubmit',
    resolver: joiResolver(employeeTimesheetValidation)
  });

  const onSubmitAddHours = (data, event) => {
    console.log(selectedTimesheet);
    event.preventDefault();
    const URL = process.env.REACT_APP_API_URL;
    const options = {
      method: 'PUT',
      url: `${URL}/timesheets/${selectedTimesheet._id}`,
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        date: selectedTimesheet.date,
        project: selectedTimesheet.project?._id,
        employee: selectedTimesheet.employee?._id,
        hoursProject: selectedTimesheet.hoursProject,
        weekSprint: selectedTimesheet.weekSprint,
        workDescription: selectedTimesheet.workDescription,
        hoursWorked: parseInt(data.hoursWorked) + parseInt(data.addHoursWorked)
      })
    };
    dispatch(editTimesheet(options));
    reset({
      addHoursWorked: ''
    });
    setShowForm(false);
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
          setShowForm={setShowForm}
          data={timesheets}
          resetFormAddHours={reset}
          headers={['projectName', 'workDescription', 'weekSprint', 'hoursProject', 'hoursWorked']}
        />
      </EmployeeTable>
      <Modal
        isOpen={showForm}
        handleClose={() => {
          setShowForm(false);
        }}
      >
        <form className={styles.form} onSubmit={handleSubmit(onSubmitAddHours)}>
          <Input
            name="timesheetId"
            register={register}
            label="Timesheet Id"
            error={errors.timesheetId?.message}
            disabled="disabled"
          ></Input>
          <Input
            name="timesheetName"
            register={register}
            label="Name of the project"
            error={errors.timesheetName?.message}
            disabled="disabled"
          ></Input>
          <Input
            name="hoursWorked"
            register={register}
            label="Hours Worked"
            error={errors.hoursWorked?.message}
            disabled="disabled"
          ></Input>
          <Input
            name="addHoursWorked"
            type="number"
            register={register}
            error={errors.addHoursWorked?.message}
            label="Hours to add"
          ></Input>
          <Button type="submit" label="Submit" />
        </form>
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
}

export default EmployeeTimesheets;
