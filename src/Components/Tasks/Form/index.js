import styles from './form.module.css';
import { useEffect, useState } from 'react';
import FeedbackModal from '../FeedbackModal';
import { useParams } from 'react-router-dom';
import Button from '../../Shared/Button';
import Input from '../../Shared/Input/InputText';
import Select from '../../Shared/Input/InputSelect';

const Form = () => {
  const URL = process.env.REACT_APP_API_URL;
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetch(`${URL}/projects`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.data);
      });
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
  const [showFeedBackModal, setShowFeedbackModal] = useState(false);

  const taskId = useParams();
  console.log(taskId);

  const title = taskId.id ? 'Update Task' : 'Add Task';
  const options = {
    method: taskId.id ? 'PUT' : 'POST',
    url: `${process.env.REACT_APP_API_URL}/tasks/${taskId.id ?? ''}`,
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
  useEffect(() => {
    if (taskId) {
      fetch(`${URL}/tasks/${taskId.id}`)
        .then((res) => res.json())
        .then((data) => {
          setProjectValue(data.data.nameProject.name);
          setWeekValue(data.data.week);
          setDayValue(data.data.day);
          setDescriptionValue(data.data.description);
          setHoursValue(data.data.hours);
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
  const arrayToMapProjects = projects.map((project) => {
    return {
      id: project._id,
      optionContent: project.name
    };
  });
  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <h2>{title}</h2>
        <Select
          label="Project"
          id="project"
          name="project"
          value={projectValue._id}
          onChange={onChangeProject}
          required
          placeholder="Select Project"
          arrayToMap={arrayToMapProjects}
        />
        <Input
          label="Week"
          type="number"
          id="week"
          name="week"
          value={weekValue}
          onChange={onChangeWeek}
          required
          placeholder="Week"
        />
        <Input
          label="Day"
          type="number"
          id="day"
          name="day"
          value={dayValue}
          onChange={onChangeDay}
          required
          placeholder="Day"
        />
        <Input
          label="Description"
          type="text"
          id="Description"
          name="Description"
          value={descriptionValue}
          onChange={onChangeDescription}
          required
          placeholder="Description"
        />
        <Input
          label="Hours"
          type="number"
          id="hours"
          name="hours"
          value={hoursValue}
          onChange={onChangeHours}
          required
          placeholder="Hours"
        />
        <div className={styles.buttonContainer}>
          <Button type="submit" className={styles.submitButton} label="Submit" />
        </div>
      </form>
      {showFeedBackModal && (
        <FeedbackModal
          feedbackTitle={contentFeedbackModal.title}
          messageContent={contentFeedbackModal.description}
          setShowFeedbackModal={setShowFeedbackModal}
          showFeedbackModal={showFeedBackModal}
        />
      )}
    </div>
  );
};

export default Form;
