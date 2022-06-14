import styles from './form.module.css';
import { useEffect, useState } from 'react';
import SharedForm from '../../Shared/Form';
import Input from '../../Shared/Input/InputText';
import Select from '../../Shared/Input/InputSelect';
import FeedbackMessage from '../../Shared/FeedbackMessage';
import Modal from '../../Shared/Modal';
import Preloader from '../../Shared/Preloader';
import { useSelector, useDispatch } from 'react-redux';
import { editTask, postTask } from '../../../redux/tasks/thunks';
import { showFeedbackMessage } from '../../../redux/tasks/actions';

const Form = () => {
  const dispatch = useDispatch();
  const [projects, setProjects] = useState([]);
  const [projectValue, setProjectValue] = useState('');
  const [weekValue, setWeekValue] = useState('');
  const [dayValue, setDayValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [hoursValue, setHoursValue] = useState('');

  const isPending = useSelector((state) => state.tasks.pending);
  const showFeedback = useSelector((state) => state.tasks.showFeedbackMessage);
  const infoForFeedback = useSelector((state) => state.tasks.infoForFeedback);
  const selectedItem = useSelector((state) => state.tasks.selectedItem);
  const URL = process.env.REACT_APP_API_URL;
  const isItemSelected = Object.keys(selectedItem).length;
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
    fetch(`${process.env.REACT_APP_API_URL}/projects`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.data);
      });
  }, []);

  useEffect(() => {
    if (isItemSelected) {
      setProjectValue(selectedItem.nameProjectId || '');
      setDayValue(selectedItem.day);
      setWeekValue(selectedItem.week);
      setHoursValue(selectedItem.hours);
      setDescriptionValue(selectedItem.description);
    }
  }, []);

  const arrayToMapProjects = projects.map((project) => {
    return {
      id: project._id,
      optionContent: project.name || 'No project name'
    };
  });

  const title = isItemSelected ? 'Update Task' : 'Add Task';
  const onSubmit = (event) => {
    event.preventDefault();
    const options = {
      method: isItemSelected ? 'PUT' : 'POST',
      url: isItemSelected ? `${URL}/tasks/${selectedItem._id}` : `${URL}/tasks`,
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
    isItemSelected ? dispatch(editTask(options)) : dispatch(postTask(options));
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
        isOpen={showFeedback}
        handleClose={() => {
          dispatch(showFeedbackMessage(!showFeedback));
        }}
      >
        <FeedbackMessage infoForFeedback={infoForFeedback} />
      </Modal>
      {isPending && <Preloader />}
    </div>
  );
};

export default Form;
