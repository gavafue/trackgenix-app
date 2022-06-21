import { useState, useEffect } from 'react';
import SharedForm from '../../Shared/Form';
import InputText from '../../Shared/Input/InputText';
import InputSelect from '../../Shared/Input/InputSelect';
import styles from './form.module.css';
import Modal from '../../Shared/Modal';
import FeedbackMessage from '../../Shared/FeedbackMessage';
import Loader from '../../Shared/Preloader';
import { useSelector, useDispatch } from 'react-redux';
import { editProject, postProject } from '../../../redux/projects/thunks';
import { showFeedbackMessage } from '../../../redux/projects/actions';
import { useForm } from 'react-hook-form';
import projectsValidation from 'validations/projects';
import { joiResolver } from '@hookform/resolvers/joi';

const Form = () => {
  const dispatch = useDispatch();
  const [employees, setEmployees] = useState([]);
  const isPending = useSelector((state) => state.projects.isPending);
  const feedbackInfo = useSelector((state) => state.projects.infoForFeedback);
  const showFeedback = useSelector((state) => state.projects.showFeedbackMessage);
  const projectSelected = useSelector((state) => state.projects.projectSelected);
  const isProjectSelected = Boolean(Object.keys(projectSelected).length);
  const URL = process.env.REACT_APP_API_URL;

  const title = isProjectSelected
    ? `Editing ${projectSelected.name} projects's information.`
    : 'Add a Project';

  const arrayToMapEmployees = employees.map((employee) => {
    return { id: employee._id, optionContent: `${employee.firstName} ${employee.lastName}` };
  });

  useEffect(() => {
    fetch(`${URL}/employees`)
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const onSubmit = (data) => {
    const options = {
      method: isProjectSelected ? 'PUT' : 'POST',
      url: isProjectSelected ? `${URL}/projects/${projectSelected._id}` : `${URL}/projects`,
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        startDate: data.startDate,
        endDate: data.endDate,
        description: data.description,
        client: data.client,
        members: [
          {
            name: data.name,
            role: data.role,
            rate: data.rate
          }
        ],
        active: data.active
      })
    };
    isProjectSelected ? dispatch(editProject(options)) : dispatch(postProject(options));
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(projectsValidation)
  });

  useEffect(() => {
    if (isProjectSelected)
      reset({
        name: projectSelected.name,
        startDate: projectSelected.startDate?.slice(0, 10),
        endDate: projectSelected.endDate?.slice(0, 10),
        description: projectSelected.description,
        client: projectSelected.client,
        members: projectSelected.members[0]?.name || '',
        role: projectSelected.members[0]?.role || '',
        rate: projectSelected.members[0]?.rate || '',
        active: projectSelected.active
      });
  }, [isProjectSelected]);

  console.log(projectSelected.name);
  console.log(errors);

  return (
    <div className={styles.container}>
      {isPending && <Loader />}
      <h2>{title}</h2>
      <SharedForm onSubmit={handleSubmit(onSubmit)}>
        <InputText
          name="name"
          type="text"
          label="Name"
          placeholder="Write the project's name"
          register={register}
          error={errors.name?.message}
          required
        />
        <InputText
          name="startDate"
          type="date"
          label="Start date"
          placeholder="Write the start date"
          register={register}
          error={errors.startDate?.message}
          required
        />
        <InputText
          name="endDate"
          type="date"
          label="End date"
          placeholder="Write the end date"
          register={register}
          error={errors.endDate?.message}
          required
        />
        <InputText
          name="description"
          type="text"
          label="Description"
          placeholder="Write the description"
          register={register}
          error={errors.description?.message}
          required
        />
        <InputText
          name="client"
          label="Client"
          type="text"
          placeholder="Write the Client's name"
          register={register}
          error={errors.client?.message}
          required
        />
        <InputSelect
          className={styles.select}
          arrayToMap={[
            { id: true, optionContent: 'True' },
            { id: false, optionContent: 'False' }
          ]}
          id="active"
          name="active"
          label="Active"
          register={register}
          error={errors.active?.message}
          required
        />
        <InputSelect
          className={styles.select}
          arrayToMap={arrayToMapEmployees}
          id="members"
          name="members"
          label="Members"
          register={register}
          error={errors.members?.message}
          required
        />
        <InputSelect
          className={styles.select}
          arrayToMap={[
            { id: 'TL', optionContent: 'TL' },
            { id: 'QA', optionContent: 'QA' },
            { id: 'DEV', optionContent: 'DEV' },
            { id: 'PM', optionContent: 'PM' }
          ]}
          id="role"
          name="role"
          label="Role"
          placeholer="enter member role"
          register={register}
          error={errors.role?.message}
          required
        />
        <InputText
          name="rate"
          type="text"
          label="Rate"
          placeholder="Write the rate"
          register={register}
          error={errors.rate?.message}
          required
        />
      </SharedForm>
      <Modal
        isOpen={showFeedback}
        handleClose={() => {
          dispatch(showFeedbackMessage(!showFeedback));
        }}
      >
        <FeedbackMessage infoForFeedback={feedbackInfo} />
      </Modal>
    </div>
  );
};

export default Form;
