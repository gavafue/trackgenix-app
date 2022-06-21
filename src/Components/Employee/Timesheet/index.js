import styles from './timesheet.module.css';
import { useEffect } from 'react';
import EmployeeTable from '../TableAndContents';
import { useSelector } from 'react-redux';
import { getTimesheets } from 'redux/timesheet/thunks';
import { useDispatch } from 'react-redux';
import TimesheetTableContent from '../TableAndContents/Content/timesheetTableContent';

function EmployeeTimesheets() {
  const employeeLogged = useSelector((state) => state.employees.employeeLogged);
  const timesheets = useSelector((state) => state.timesheets.list);
  const dispatch = useDispatch();
  // const memberId = useSelector((state) => state.employees.employeeLogged);
  // console.log(memberId);

  // useEffect(() => {
  //   dispatch(getProjectsByMemberId(memberId._id));
  // }, []);
  useEffect(() => {
    dispatch(getTimesheets());
  }, []);
  const timesheetData = timesheets
    .filter((timesheet) => timesheet.employee?._id === employeeLogged._id)
    .map((timesheet) => ({
      ...timesheet,
      name: timesheet?.project?.name || 'Project not found'
    }));

  console.log(timesheetData);

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
          data={timesheetData}
          headers={['name', 'workDescription', 'weekSprint', 'hoursProject', 'hoursWorked']}
        />
      </EmployeeTable>
    </section>
  );
}

export default EmployeeTimesheets;
