import React, { useState } from 'react';
import styles from './timesheet.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getTimesheets } from 'redux/timesheet/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { addTimesheet } from 'redux/timesheet/thunks';
import SharedForm from 'Components/Shared/Form';
import Input from 'Components/Shared/Input/InputText';
import timesheetsValidation from 'validations/timesheets';
import Calendar from '../Calendar';
import Modal from 'Components/Shared/Modal';
import EmployeeTable from 'Components/Employee/TableAndContents';
import ProjectsTableContent from '../TableAndContents/Content/projectsTableContent';
const AddNewTimesheet = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTimesheets());
  }, []);
  const URL = process.env.REACT_APP_API_URL;
  const selectedProject = useSelector((state) => state.projects.projectSelected);
  const allTimesheets = useSelector((state) => state.timesheets.list);
  const employeeLogged = useSelector((state) => state.auth.authenticated.data);
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
          projectName: timesheet?.project?.name || 'Project not found'
        }
      ];
    }
    return acc;
  }, []);
  console.log('timesheets', timesheetsFromProjectAndUserLogged);
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
  };
  return (
    <div className={styles.container}>
      <h2>Timesheets for {selectedProject.projectName}</h2>
      <h3>Click on date to add new timesheet</h3>
      <Calendar
        reset={reset}
        setShowForm={setShowForm}
        timesheetForCalendar={timesheetsFromProjectAndUserLogged}
      />
      <EmployeeTable headersName={['Project', 'Date', 'Hours Worked', 'Task Description']}>
        <ProjectsTableContent
          data={timesheetsFromProjectAndUserLogged}
          headers={['projectName', 'date', 'hoursWorked', 'workDescription']}
        />
      </EmployeeTable>
      <Modal isOpen={showForm} handleClose={() => setShowForm(false)}>
        <div className={styles.container}>
          <SharedForm onSubmit={handleSubmit(onSubmit)} header={'Add Timesheet'}>
            <Input
              label="Project"
              id="project"
              name="project"
              value={selectedProject.projectName}
              // disabled
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
          </SharedForm>
        </div>
      </Modal>
    </div>
  );
};

export default AddNewTimesheet;
