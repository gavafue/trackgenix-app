import styles from './form.module.css';
import { useEffect, useState } from 'react';
import FeedbackModal from '../FeedbackModal';

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
  const [contentFeedbackModal, setContentFeedbackModal] = useState({});
  let modalOfFeedback = document.getElementById('myModal');
  const changeVisibilityFeedbackModal = (string) => {
    modalOfFeedback.style.display = string;
  };
  let title = 'Add Timesheet';
  const querystring = window.location.search;
  const params = new URLSearchParams(querystring);
  const timesheetId = params.get('timesheetId');
  const options = {
    method: 'POST',
    url: `${process.env.REACT_APP_API_URL}/timesheets`,
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      project: projectValue,
      employee: employeeValue,
      weekSprint: weekSprintValue,
      date: dateValue,
      hoursWorked: hoursWorkedValue,
      hoursProject: projectHoursValue,
      workDescription: workDescriptionValue
    })
  };
  const onSubmit = (event) => {
    event.preventDefault();
    fetch(options.url, options).then(async (response) => {
      const res = await response.json();
      if (response.status == 201 || response.status == 200) {
        setContentFeedbackModal({ title: 'Request done!', description: res.message });
        setTimeout(() => {
          window.location = '/time-sheets';
        }, 2000);
      } else {
        setContentFeedbackModal({ title: 'Something went wrong', description: res.message });
      }
    });
  };
  if (timesheetId) {
    title = 'Update Timesheet';
    useEffect(async () => {
      try {
        const URL = process.env.REACT_APP_API_URL;
        const response = await fetch(`${URL}/timesheets/${timesheetId}`);
        const data = await response.json();
        setProjectValue(data.data.project);
        setEmployeeValue(data.data.employee);
        setWeekSprintValue(data.data.weekSprint);
        setDateValue(data.data.date);
        setHoursWorkedValue(data.data.hoursWorked);
        setProjectHoursValue(data.data.hoursProject);
        setWorkDescriptionValue(data.data.workDescription);
      } catch (error) {
        console.error(error);
      }
    }, []);
    options.method = 'PUT';
    options.url = `${process.env.REACT_APP_API_URL}/timesheets/${timesheetId}`;
    options.body = JSON.stringify({
      project: projectValue._id,
      employee: employeeValue._id,
      weekSprint: weekSprintValue,
      date: dateValue,
      hoursWorked: hoursWorkedValue,
      hoursProject: projectHoursValue,
      workDescription: workDescriptionValue
    });
  }
  console.log(projects);
  return (
    <div>
      <form className={styles.container} onSubmit={onSubmit}>
        <h2>{title}</h2>
        <label>Project</label>
        <select
          className={styles.input}
          id="project"
          name="project"
          value={projectValue._id}
          onChange={onChangeProjectSelect}
          required
        >
          {projects.map((project) => {
            return (
              <option
                id="projectOption"
                selected={Boolean(project._id === projectValue)}
                value={project._id}
                key={project._id}
              >{`${project.name}`}</option>
            );
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
              <option
                selected={Boolean(employee._id === employeeValue)}
                value={employee._id}
                key={employee._id}
              >{`${employee.firstName + ' ' + employee.lastName}`}</option>
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
        <input id="date" name="date" value={dateValue} onChange={onChangeDate} required></input>
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
        <button
          type="submit"
          className={styles.submitButton}
          onClick={() => changeVisibilityFeedbackModal('block')}
        >
          Submit
        </button>
      </form>
      <FeedbackModal
        feedbackTitle={contentFeedbackModal.title}
        messageContent={contentFeedbackModal.description}
      />
    </div>
  );
};

export default Form;
