import React, { useState } from 'react';
import styles from 'Components/Employee/Timesheet/AddTimesheet/addTimesheet.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getTimesheets } from 'redux/timesheet/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { addTimesheet } from 'redux/timesheet/thunks';
import Input from 'Components/Shared/Input/InputText';
import timesheetsValidation from 'validations/timesheets';
import Calendar from '../../Calendar';
import WiderModal from 'Components/Shared/WiderModal';
import EmployeeTable from 'Components/Employee/TableAndContents';
import ProjectsTableContent from '../../TableAndContents/Content/projectsTableContent';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import Preloader from 'Components/Shared/Preloader';
import FeedbackMessage from 'Components/Shared/FeedbackMessage';
import { showFeedbackMessage } from 'redux/timesheet/actions';
import { useHistory } from 'react-router-dom';

const AddNewTimesheet = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTimesheets());
  }, []);
  const URL = process.env.REACT_APP_API_URL;
  const selectedProject = useSelector((state) => state.projects.projectSelected);
  const allTimesheets = useSelector((state) => state.timesheets.list);
  const employeeLogged = useSelector((state) => state.auth.authenticated.data);
  const isPending = useSelector((state) => state.timesheets.isPending);
  const feedbackInfo = useSelector((state) => state.timesheets.infoForFeedback);
  const showFeedback = useSelector((state) => state.timesheets.showFeedbackMessage);
  const [showForm, setShowForm] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onSubmit',
    resolver: joiResolver(timesheetsValidation)
  });
  const timesheetsFromProjectAndUserLogged = allTimesheets.reduce((acc, timesheet) => {
    const employeeAndProjectTimesheet =
      timesheet.employee?._id === employeeLogged?._id &&
      timesheet.project._id === selectedProject?.projectId;
    if (employeeAndProjectTimesheet) {
      return [
        ...acc,
        {
          ...timesheet,
          date: timesheet.date.slice(0, 10),
          projectName: timesheet?.project?.name || 'Project not found'
        }
      ];
    }
    return acc;
  }, []);
  const arrayOfHoursWorked = timesheetsFromProjectAndUserLogged.map(
    (timesheet) => timesheet.hoursWorked
  );
  const totalHours = arrayOfHoursWorked.reduce((a, b) => a + b, 0);

  const onSubmit = (data) => {
    const options = {
      method: 'POST',
      url: `${URL}/timesheets`,
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        project: selectedProject.projectId,
        date: data.date,
        hoursWorked: data.hoursWorked,
        workDescription: data.workDescription,
        employee: employeeLogged._id
      })
    };
    dispatch(addTimesheet(options));
    setShowForm(false);
  };
  return (
    <div className={styles.container}>
      <h2>Timesheets for {selectedProject.projectName}</h2>
      <p>You have {totalHours} hours worked in this project.</p>
      <div className={styles.tableContainer}>
        <EmployeeTable headersName={['Date', 'Hours Worked', 'Task Description']}>
          <ProjectsTableContent
            data={timesheetsFromProjectAndUserLogged}
            headers={['date', 'hoursWorked', 'workDescription']}
          />
        </EmployeeTable>
      </div>
      <h3>Click on date to add new timesheet</h3>
      <Calendar
        reset={reset}
        setShowForm={setShowForm}
        timesheetForCalendar={timesheetsFromProjectAndUserLogged}
      />
      <Button label="Go back" onClick={() => history.goBack()} theme="secondary" />
      <WiderModal isOpen={showForm} handleClose={() => setShowForm(false)}>
        <div className={styles.container}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.header}>Add New Timesheet</div>
            <Input
              label="Project"
              id="project"
              name="project"
              value={selectedProject.projectName}
              register={register}
              error={errors.project?.message}
            />
            <Input
              label="Date"
              id="date"
              name="date"
              type="date"
              placeholder="Write the date"
              register={register}
              error={errors.date?.message}
              required
            />
            <Input
              label="Hours worked"
              type="text"
              id="hoursWorked"
              name="hoursWorked"
              placeholder="Write the hours worked"
              register={register}
              error={errors.hoursWorked?.message}
              required
            />
            <Input
              label="Work description"
              id="workDescription"
              name="workDescription"
              type="text"
              placeholder="Write the work description"
              register={register}
              error={errors.workDescription?.message}
              required
            />
            <div className={styles.submit}>
              <Button type="submit" label="Submit" />
            </div>
          </form>
        </div>
      </WiderModal>
      <Modal
        isOpen={showFeedback}
        handleClose={() => {
          dispatch(showFeedbackMessage(!showFeedback));
        }}
      >
        <FeedbackMessage infoForFeedback={feedbackInfo} />
      </Modal>
      {isPending && <Preloader />}
    </div>
  );
};

export default AddNewTimesheet;
