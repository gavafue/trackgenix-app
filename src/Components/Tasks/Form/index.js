import styles from './form.module.css';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import SharedForm from '../../Shared/Form';
import Input from '../../Shared/Input/InputText';
import Select from '../../Shared/Input/InputSelect';
import FeedbackMessage from '../../Shared/FeedbackMessage';
import Modal from '../../Shared/Modal';
import Preloader from '../../Shared/Preloader';
import { useSelector, useDispatch } from 'react-redux';
import { editTask, postTask } from '../../../redux/tasks/thunks';
import { showFeedbackMessage } from '../../../redux/tasks/actions';
import { getProjects } from 'redux/projects/thunks';
import tasksValidation from 'validations/tasks';

const Form = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const projects = useSelector((state) => state.projects.list);
  const isPending = useSelector((state) => state.tasks.isPending);
  const showFeedback = useSelector((state) => state.tasks.showFeedbackMessage);
  const infoForFeedback = useSelector((state) => state.tasks.infoForFeedback);
  const selectedItem = useSelector((state) => state.tasks.selectedItem);
  const isItemSelected = Boolean(Object.keys(selectedItem).length);
  const title = isItemSelected ? 'Update Task' : 'Add Task';
  const URL = process.env.REACT_APP_API_URL;

  const arrayToMapProjects = projects.map((item) => {
    return {
      id: item._id,
      optionContent: `${item.name}`
    };
  });

  const onSubmit = (data) => {
    const options = {
      method: isItemSelected ? 'PUT' : 'POST',
      url: isItemSelected ? `${URL}/tasks/${selectedItem._id}` : `${URL}/tasks`,
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        nameProject: data.nameProject,
        week: data.week,
        day: data.day,
        description: data.description,
        hours: data.hours
      })
    };
    isItemSelected ? dispatch(editTask(options)) : dispatch(postTask(options));
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(tasksValidation)
  });

  useEffect(() => {
    dispatch(getProjects());
    if (isItemSelected)
      reset({
        nameProject: selectedItem.nameProjectId || undefined,
        day: selectedItem.day,
        week: selectedItem.week,
        hours: selectedItem.hours,
        description: selectedItem.description
      });
  }, [selectedItem]);

  return (
    <div className={styles.container}>
      <SharedForm onSubmit={handleSubmit(onSubmit)} header={title}>
        <Select
          label="Project"
          id="nameProject"
          name="nameProject"
          arrayToMap={arrayToMapProjects}
          placeholder="Select Project"
          register={register}
          error={errors.nameProject?.message}
          value={selectedItem ? selectedItem.nameProject : ''}
          required
        />
        <Input
          label="Description"
          id="description"
          name="description"
          type="text"
          placeholder="Description"
          register={register}
          error={errors.description?.message}
          value={selectedItem ? selectedItem.description : ''}
          required
        />
        <Input
          label="Week"
          id="week"
          name="week"
          type="text"
          placeholder="Week"
          register={register}
          error={errors.week?.message}
          value={selectedItem ? selectedItem.week : ''}
          required
        />
        <Input
          label="Day"
          id="day"
          name="day"
          type="text"
          placeholder="Day"
          register={register}
          error={errors.day?.message}
          value={selectedItem ? selectedItem.day : ''}
          required
        />
        <Input
          label="Hours"
          id="hours"
          name="hours"
          type="text"
          placeholder="Hours"
          register={register}
          error={errors.hours?.message}
          value={selectedItem ? selectedItem.hours : ''}
          required
        />
      </SharedForm>
      <Modal
        isOpen={showFeedback}
        handleClose={() => {
          dispatch(showFeedbackMessage(!showFeedback));
          if (!infoForFeedback.error) {
            history.goBack();
          }
        }}
      >
        <FeedbackMessage infoForFeedback={infoForFeedback} />
      </Modal>
      {isPending && <Preloader />}
    </div>
  );
};

export default Form;
