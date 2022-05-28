import styles from './form.module.css';
import { useEffect, useState } from 'react';

const Form = () => {
  const [projects, setProjects] = useState([]);
  useEffect(async () => {
    try {
      const URL = process.env.REACT_APP_API_URL;
      const response = await fetch(`${URL}/projects`);
      const data = await response.json();
      setProjects(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);
  const [employees, setEmployees] = useState([]);
  useEffect(async () => {
    try {
      const URL = process.env.REACT_APP_API_URL;
      const response = await fetch(`${URL}/employees`);
      const data = await response.json();
      setEmployees(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);
  const [projectValue, setProjectValue] = useState('');
  const onChangeProjectSelect = (event) => {
    setProjectValue(event.target.value);
    console.log(event.target.value);
  };
  const [employeeValue, setEmployeeValue] = useState('');
  const onChangeEmployeeSelect = (event) => {
    setEmployeeValue(event.target.value);
    console.log(event.target.value);
  };
  const [weekSprintValue, setWeekSprintValue] = useState('');
  const onChangeWeekSprint = (event) => {
    setWeekSprintValue(event.target.value);
    console.log(event.target.value);
  };
  const [dateValue, setDateValue] = useState('');
  const onChangeDate = (event) => {
    setDateValue(event.target.value);
    console.log(event.target.value);
  };
  const [hoursWorkedValue, setHoursWorkedValue] = useState('');
  const onChangeHoursWork = (event) => {
    setHoursWorkedValue(event.target.value);
    console.log(event.target.value);
  };
  const [projectHoursValue, setProjectHoursValue] = useState('');
  const onChangeProjectHours = (event) => {
    setProjectHoursValue(event.target.value);
    console.log(event.target.value);
  };
  const [workDescriptionValue, setWorkDescriptionValue] = useState('');
  const onChangeWorkDescription = (event) => {
    setWorkDescriptionValue(event.target.value);
    console.log(event.target.value);
  };
  const onSumbmit = (event) => {
    event.preventDefault();
    // const options = {
    //   method: 'POST',
    //   headers: {
    //     'Content type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     project: projectValue,
    //     employee: employeeValue,
    //     weekSprint: weekSprintValue,
    //     date: dateValue,
    //     hoursWorked: hoursWorkedValue,
    //     hoursProject: projectHoursValue,
    //     workDescrption: workDescriptionValue
    //   })
    // };
    // fetch(`${URL}/timesheets`, options).then((response) => {
    //   if (response.status !== 201) {
    //     return response.json().then(({ message }) => {
    //       throw new Error(message);
    //     });
    //   }
    //   return response.json();
    // });
  };
  return (
    <div>
      <form className={styles.container} onSubmit={onSumbmit}>
        <h2>Timesheet</h2>
        <label>Project</label>
        <select
          className={styles.input}
          id="project"
          name="project"
          value={projectValue}
          onChange={onChangeProjectSelect}
          required
        >
          {projects.map((project) => {
            return <option key={project._id}>{`${project.name}`}</option>;
          })}
          ;
          <option value="" disabled selected hidden>
            Choose Project
          </option>
        </select>
        <label>Employee</label>
        <select
          id="employee"
          name="employee"
          value={employeeValue}
          onChange={onChangeEmployeeSelect}
          required
        >
          {employees.map((employee) => {
            return (
              <option key={employee._id}>{`${
                employee.firstName + ' ' + employee.lastName
              }`}</option>
            );
          })}
          ;
          <option value="" disabled selected hidden>
            Choose Employee
          </option>
        </select>
        <label>Week Sprint</label>
        <input
          type="number"
          id="weekSprint"
          name="weekSprint"
          value={weekSprintValue}
          onChange={onChangeWeekSprint}
          required
        ></input>
        <label>Date</label>
        <input
          type="datetime-local"
          id="date"
          name="date"
          value={dateValue}
          onChange={onChangeDate}
          required
        ></input>
        <label>Hours Worked</label>
        <input
          type="number"
          id="hoursWorked"
          name="hoursWorked"
          value={hoursWorkedValue}
          onChange={onChangeHoursWork}
          required
        ></input>
        <label>Project Hours</label>
        <input
          type="number"
          id="projectHours"
          name="projectHours"
          value={projectHoursValue}
          onChange={onChangeProjectHours}
          required
        ></input>
        <label>Work Description</label>
        <input
          className={styles.workInput}
          type="text"
          id="workDescription"
          name="workDescription"
          value={workDescriptionValue}
          onChange={onChangeWorkDescription}
          required
        ></input>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
