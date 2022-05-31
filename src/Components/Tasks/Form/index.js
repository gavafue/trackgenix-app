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
  const [projectValue, setProjectValue] = useState('');
  const onChangeProject = (event) => {
    setProjectValue(event.target.value);
    console.log(event.target.value);
  };
  const [weekValue, setWeekValue] = useState('');
  const onChangeWeek = (event) => {
    setWeekValue(event.target.value);
    console.log(event.target.value);
  };
  const [dayValue, setDayValue] = useState('');
  const onChangeDay = (event) => {
    setDayValue(event.target.value);
    console.log(event.target.value);
  };
  const [descriptionValue, setDescriptionValue] = useState('');
  const onChangeDescription = (event) => {
    setDescriptionValue(event.target.value);
    console.log(event.target.value);
  };
  const [hoursValue, setHoursValue] = useState('');
  const onChangeHours = (event) => {
    setHoursValue(event.target.value);
    console.log(event.target.value);
  };
  const [contentFeedbackModal, setContentFeedbackModal] = useState({});
  let modalOfFeedback = document.getElementById('myModal');
  const changeVisibilityFeedbackModal = (string) => {
    modalOfFeedback.style.display = string;
  };
  let title = 'Add Task';
  const querystring = window.location.search;
  const params = new URLSearchParams(querystring);
  const taskId = params.get('taskId');
  const options = {
    method: 'POST',
    url: `${process.env.REACT_APP_API_URL}/tasks`,
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      nameProject: projectValue,
      week: weekValue,
      day: dayValue,
      description: descriptionValue,
      hours: hoursValue
    })
  };
  const onSubmit = (event) => {
    event.preventDefault();
    fetch(options.url, options).then(async (response) => {
      const res = await response.json();
      if (response.status == 201 || response.status == 200) {
        setContentFeedbackModal({ title: 'Request done!', description: res.message });
        setTimeout(() => {
          window.location = '/tasks';
        }, 2000);
      } else {
        setContentFeedbackModal({ title: 'Something went wrong', description: res.message });
      }
    });
  };
  if (taskId) {
    title = 'Update Task';
    useEffect(async () => {
      try {
        const URL = process.env.REACT_APP_API_URL;
        const response = await fetch(`${URL}/tasks/${taskId}`);
        const data = await response.json();
        setProjectValue(data.data.nameProject);
        setWeekValue(data.data.week);
        setDayValue(data.data.day);
        setDescriptionValue(data.data.description);
        setHoursValue(data.data.hours);
      } catch (error) {
        console.error(error);
      }
    }, []);
    options.method = 'PUT';
    options.url = `${process.env.REACT_APP_API_URL}/tasks/${taskId}`;
    options.body = JSON.stringify({
      nameProject: projectValue._id,
      week: weekValue,
      day: dayValue,
      description: descriptionValue,
      hours: hoursValue
    });
  }
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
          onChange={onChangeProject}
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
        <label>Week</label>
        <input
          type="number"
          id="week"
          name="week"
          value={weekValue}
          onChange={onChangeWeek}
          required
        ></input>
        <label>Day</label>
        <input
          type="number"
          id="day"
          name="day"
          value={dayValue}
          onChange={onChangeDay}
          required
        ></input>
        <label>Description</label>
        <input
          className={styles.workInput}
          type="text"
          id="Description"
          name="Description"
          value={descriptionValue}
          onChange={onChangeDescription}
          required
        ></input>
        <label>Hours</label>
        <input
          type="number"
          id="hours"
          name="hours"
          value={hoursValue}
          onChange={onChangeHours}
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
