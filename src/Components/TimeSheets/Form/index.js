import styles from './form.module.css';
import { useEffect, useState } from 'react';
import FeedbackModal from '../FeedbackModal';

const Form = () => {
  const URL = process.env.REACT_APP_API_URL;
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetch(`${URL}/projects`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    fetch(`${URL}/employees`)
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data.data);
      })
      .catch((err) => console.log(err));
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
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const querystring = window.location.search;
  const params = new URLSearchParams(querystring);
  const timesheetId = params.get('timesheetId');
  const title = timesheetId ? 'Update Timesheet' : 'Add Timesheet';
  const options = {
    method: timesheetId ? 'PUT' : 'POST',
    url: `${process.env.REACT_APP_API_URL}/timesheets/${timesheetId ? timesheetId : ''} `,
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
  useEffect(() => {
    if (timesheetId) {
      fetch(`${URL}/timesheets/${timesheetId}`)
        .then((res) => res.json())
        .then((data) => {
          setProjectValue(data.data.project._id);
          setEmployeeValue(data.data.employee._id);
          setWeekSprintValue(data.data.weekSprint);
          setDateValue(data.data.date);
          setHoursWorkedValue(data.data.hoursWorked);
          setProjectHoursValue(data.data.hoursProject);
          setWorkDescriptionValue(data.data.workDescription);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      const res = await fetch(options.url, options);
      const data = await res.json();
      if (res.status == 201 || res.status == 200) {
        setContentFeedbackModal({ title: 'Request done!', description: data.message });
        setShowFeedbackModal(true);
      } else {
        setContentFeedbackModal({ title: 'Something went wrong', description: data.message });
        setShowFeedbackModal(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form className={styles.container} onSubmit={onSubmit}>
        <h2>{title}</h2>
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
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
      {showFeedbackModal && (
        <FeedbackModal
          feedbackTitle={contentFeedbackModal.title}
          messageContent={contentFeedbackModal.description}
          setShowFeedbackModal={setShowFeedbackModal}
          showFeedbackModal={showFeedbackModal}
        />
      )}
    </div>
  );
};

export default Form;
