import styles from './form.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SharedForm from '../../Shared/Form';
import Input from '../../Shared/Input/InputText';
import Select from '../../Shared/Input/InputSelect';
import FeedbackMessage from '../../Shared/FeedbackMessage';
import Modal from '../../Shared/Modal';
import Preloader from '../../Shared/Preloader';

const Form = () => {
  const URL = process.env.REACT_APP_API_URL;
  const [projects, setProjects] = useState([]);
  const [projectValue, setProjectValue] = useState('');
  const [weekValue, setWeekValue] = useState('');
  const [dayValue, setDayValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [hoursValue, setHoursValue] = useState('');
  const [infoForFeedback, setInfoForFeedback] = useState({});
  const [showFeedbackMessage, setShowFeedbackMessage] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);

  const onChangeProject = (event) => {
    setProjectValue(event.target.value);
  };
  const onChangeWeek = (event) => {
    setWeekValue(event.target.value);
  };
  const onChangeDay = (event) => {
    setDayValue(event.target.value);
  };
  const onChangeDescription = (event) => {
    setDescriptionValue(event.target.value);
  };
  const onChangeHours = (event) => {
    setHoursValue(event.target.value);
  };
  useEffect(() => {
    setShowPreloader(true);
    fetch(`${URL}/projects`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.data);
        setShowPreloader(false);
      });
  }, []);
  const arrayToMapProjects = projects.map((project) => {
    return {
      id: project._id,
      optionContent: project.name
    };
  });
  const taskId = useParams();
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
      setShowPreloader(true);
      fetch(`${URL}/tasks/${taskId.id}`)
        .then((res) => res.json())
        .then((data) => {
          setProjectValue(data.data.nameProject._id);
          setWeekValue(data.data.week);
          setDayValue(data.data.day);
          setDescriptionValue(data.data.description);
          setHoursValue(data.data.hours);
          setShowPreloader(false);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      setShowPreloader(true);
      const res = await fetch(options.url, options);
      const data = await res.json();
      if (res.status == 201 || res.status == 200) {
        setInfoForFeedback({ title: 'Request done!', description: data.message });
        setShowFeedbackMessage(true);
        setShowPreloader(false);
      } else {
        setInfoForFeedback({ title: 'Something went wrong', description: data.message });
        setShowFeedbackMessage(true);
        setShowPreloader(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <SharedForm onSubmit={onSubmit}>
        <Select
          label="Project"
          id="project"
          name="project"
          value={projectValue}
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
      </SharedForm>
      <Modal
        isOpen={showFeedbackMessage}
        handleClose={() => {
          setShowFeedbackMessage(false);
        }}
      >
        <FeedbackMessage infoForFeedback={infoForFeedback} />
      </Modal>
      {showPreloader && <Preloader />}
    </div>
  );
};

export default Form;
