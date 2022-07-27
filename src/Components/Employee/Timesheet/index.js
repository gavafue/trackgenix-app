import styles from './timesheet.module.css';
import { useEffect } from 'react';
import EmployeeTable from 'Components/Employee/TableAndContents';
import { useSelector, useDispatch } from 'react-redux';
import { getTimesheets } from 'redux/timesheet/thunks';
import TimesheetTableContent from 'Components/Employee/TableAndContents/Content/timesheetTableContent';
import Preloader from 'Components/Shared/Preloader';
import Calendario from '../Calendar';
import { getProjects } from 'redux/projects/thunks';

function EmployeeTimesheets() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTimesheets());
    dispatch(getProjects());
  }, []);

  const employeeLogged = useSelector((state) => state.auth.authenticated.data);
  const allTimesheets = useSelector((state) => state.timesheets.list);
  const projects = useSelector((state) => state.projects.list);

  //ARRAY OF PROJECTS
  const employeeProjects = projects.reduce((acc, project) => {
    const assignedProject = project.members.find((employee) => {
      return employee.name?._id === employeeLogged?._id;
    });
    if (assignedProject || project.pm._id === employeeLogged._id) {
      return [
        ...acc,
        {
          projectName: project.name,
          projectId: project._id,
          status: project.active ? 'Active' : 'Inactive',
          client: project.client,
          description: project.description,
          role: assignedProject?.role || 'PM',
          rate: assignedProject?.rate
        }
      ];
    }
    return acc;
  }, []);

  const timesheets = allTimesheets.reduce((acc, timesheet) => {
    const employeeTimesheet = timesheet.employee?._id === employeeLogged?._id;
    if (employeeTimesheet) {
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

  const isPending = useSelector((state) => state.timesheets.isPending);

  // const onSubmitAddHours = (data, event) => {
  //   event.preventDefault();
  //   const URL = process.env.REACT_APP_API_URL;
  //   const options = {
  //     method: 'PUT',
  //     url: `${URL}/timesheets/${selectedTimesheet._id}`,
  //     headers: {
  //       'Content-type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       date: selectedTimesheet.date,
  //       project: selectedTimesheet.project?._id,
  //       employee: selectedTimesheet.employee?._id,
  //       hoursProject: selectedTimesheet.hoursProject,
  //       weekSprint: selectedTimesheet.weekSprint,
  //       workDescription: selectedTimesheet.workDescription,
  //       hoursWorked: parseInt(data.hoursWorked) + parseInt(data.addHoursWorked)
  //     })
  //   };
  //   dispatch(editTimesheet(options));
  //   reset({
  //     addHoursWorked: ''
  //   });
  //   setShowForm(false);
  // };

  return (
    <section className={styles.container}>
      <h2>Timesheets</h2>
      <Calendario timesheetForCalendar={timesheets} />
      <h3>Projects</h3>
      <EmployeeTable headersName={['Project', 'Role', 'Rate', 'Status', 'Client', 'Description']}>
        <TimesheetTableContent
          // setShowForm={setShowForm}
          data={employeeProjects}
          headers={['projectName', 'role', 'rate', 'status', 'client', 'description']}
        />
      </EmployeeTable>
      {isPending && <Preloader />}
    </section>
  );
}

export default EmployeeTimesheets;
