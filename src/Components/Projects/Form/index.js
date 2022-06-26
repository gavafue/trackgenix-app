import { useEffect } from 'react';
import SharedForm from '../../Shared/Form';
import InputText from '../../Shared/Input/InputText';
import InputSelect from '../../Shared/Input/InputSelect';
import styles from './form.module.css';
import Modal from '../../Shared/Modal';
import FeedbackMessage from '../../Shared/FeedbackMessage';
import Loader from '../../Shared/Preloader';
import Button from 'Components/Shared/Button';
import { useSelector, useDispatch } from 'react-redux';
import { editProject, postProject } from '../../../redux/projects/thunks';
import { showFeedbackMessage } from '../../../redux/projects/actions';
import { useForm, useFieldArray } from 'react-hook-form';
import projectsValidation from 'validations/projects';
import { joiResolver } from '@hookform/resolvers/joi';
import { getEmployee } from 'redux/employees/thunks';

const Form = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.list);
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

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(projectsValidation)
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'members'
  });

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
        active: data.active,
        members: data.members
      })
    };
    isProjectSelected ? dispatch(editProject(options)) : dispatch(postProject(options));
  };

  useEffect(() => {
    dispatch(getEmployee());
    if (isProjectSelected)
      reset({
        name: projectSelected.name,
        startDate: projectSelected.startDate?.slice(0, 10),
        endDate: projectSelected.endDate?.slice(0, 10),
        description: projectSelected.description,
        client: projectSelected.client,
        active: projectSelected.active,
        members: projectSelected.members
      });
  }, [projectSelected]);

  return (
    <div className={styles.container}>
      {isPending && <Loader />}
      <h2>{title}</h2>
      <SharedForm onSubmit={handleSubmit(onSubmit)}>
        <InputText
          id="name"
          name="name"
          type="text"
          label="Name"
          placeholder="Write the project's name"
          register={register}
          error={errors.name?.message}
          required
        />
        <InputText
          id="startDate"
          name="startDate"
          type="date"
          label="Start date"
          placeholder="Write the start date"
          register={register}
          error={errors.startDate?.message}
          required
        />
        <InputText
          id="endDate"
          name="endDate"
          type="date"
          label="End date"
          placeholder="Write the end date"
          register={register}
          error={errors.endDate?.message}
          required
        />
        <InputText
          id="description"
          name="description"
          type="text"
          label="Description"
          placeholder="Write the description"
          register={register}
          error={errors.description?.message}
          required
        />
        <InputText
          id="client"
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
            { id: true, optionContent: 'Active' },
            { id: false, optionContent: 'Inactive' }
          ]}
          id="active"
          name="active"
          label="Active"
          placeholder="Select the project's status"
          register={register}
          error={errors.active?.message}
          required
        />
        {fields.map(({ id }, index) => {
          return (
            <div className={styles.appended} key={id}>
              <h3>Member {index + 1}</h3>
              <InputSelect
                className={styles.select}
                arrayToMap={arrayToMapEmployees}
                id="employee"
                name={`members[${index}].name`}
                label="Employee"
                placeholder="Select employee"
                register={register}
                error={errors.members?.name?.message}
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
                name={`members[${index}].role`}
                label="Role"
                placeholder="Select member's role"
                register={register}
                error={errors.members?.role?.message}
                required
              />
              <InputText
                id="rate"
                name={`members[${index}].rate`}
                type="text"
                label="Rate"
                placeholder="Write the member's rate"
                register={register}
                error={errors.members?.rate?.message}
                required
              />
              <Button
                onClick={() => remove(index)}
                label={`Remove member ${index + 1}`}
                theme="secondary"
              />
            </div>
          );
        })}
        <Button onClick={() => append({})} label="Add member +"></Button>
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
