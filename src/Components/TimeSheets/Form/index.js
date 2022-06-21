import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import styles from './form.module.css';
import Preloader from '../../Shared/Preloader';
import SharedForm from '../../Shared/Form';
import Select from '../../Shared/Input/InputSelect';
import Input from '../../Shared/Input/InputText';
import Modal from '../../Shared/Modal';
import FeedbackMessage from '../../Shared/FeedbackMessage';
import { editTimesheet, addTimesheet } from '../../../redux/timesheet/thunks';
import { showFeedbackMessage } from '../../../redux/timesheet/actions';
import timesheetsValidation from 'validations/timesheets';
const URL = process.env.REACT_APP_API_URL;

const Form = () => {
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const dispatch = useDispatch();
  const showFeedback = useSelector((state) => state.timesheets.showFeedbackMessage);
  const pending = useSelector((state) => state.timesheets.pending);
  const feedbackInfo = useSelector((state) => state.timesheets.infoForFeedback);
  const selectedTimesheet = useSelector((store) => store.timesheets.timesheetSelected);
  const isTimesheetSelected = Object.keys(selectedTimesheet).length;
  const title = isTimesheetSelected ? 'Update Timesheet' : 'Add Timesheet';

  const arrayToMapEmployees = employees.map((item) => {
    return {
      id: item._id,
      optionContent: `${item.firstName} ${item.lastName}`
    };
  });

  const arrayToMapProjects = projects.map((item) => {
    return {
      id: item._id,
      optionContent: `${item.name}`
    };
  });

  const onSubmit = (data) => {
    const options = {
      method: isTimesheetSelected ? 'PUT' : 'POST',
      url: isTimesheetSelected ? `${URL}/timesheets/${selectedTimesheet._id}` : `${URL}/timesheets`,
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        project: data.project,
        employee: data.employee,
        weekSprint: data.weekSprint,
        date: data.date,
        hoursWorked: data.hoursWorked,
        hoursProject: data.hoursProject,
        workDescription: data.workDescription
      })
    };
    isTimesheetSelected ? dispatch(editTimesheet(options)) : dispatch(addTimesheet(options));
  };

  useEffect(() => {
    fetch(`${URL}/projects`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.data);
      })
      .catch((err) => console.log(err));
    fetch(`${URL}/employees`)
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(timesheetsValidation)
  });

  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <SharedForm onSubmit={handleSubmit(onSubmit)}>
        <Select
          label="Project"
          arrayToMap={arrayToMapProjects}
          id="project"
          name="project"
          placeholder="Choose the project"
          register={register}
          error={errors.project?.message}
          value={selectedTimesheet ? selectedTimesheet.project : ''}
          required
        />
        <Select
          label="Employees"
          arrayToMap={arrayToMapEmployees}
          id="employee"
          name="employee"
          placeholder="Choose the employee"
          register={register}
          error={errors.employee?.message}
          value={selectedTimesheet ? selectedTimesheet.employee : ''}
          required
        />
        <Input
          label="Week Sprint"
          id="weekSprint"
          name="weekSprint"
          type="text"
          placeholder="Write the week sprint"
          register={register}
          error={errors.weekSprint?.message}
          value={selectedTimesheet ? selectedTimesheet.weekSprint : ''}
          required
        />
        <Input
          label="Date"
          id="date"
          name="date"
          type="date"
          placeholder="Write the date"
          register={register}
          error={errors.date?.message}
          value={selectedTimesheet ? selectedTimesheet.date.slice(10) : ''}
          required
        />
        <Input
          label="Hours worked"
          type="text"
          id="hoursWorked"
          name="hoursWorked"
          placeholder="Write the hours worked"
          register={register}
          error={errors.hoursWorked?.message}
          value={selectedTimesheet ? selectedTimesheet.hoursWorked : ''}
          required
        />
        <Input
          label="Project Hours"
          id="hoursProject"
          name="hoursProject"
          type="text"
          placeholder="Write the project hours"
          register={register}
          error={errors.hoursProject?.message}
          value={selectedTimesheet ? selectedTimesheet.hoursProject : ''}
          required
        />
        <Input
          label="Work description"
          id="workDescription"
          name="workDescription"
          type="text"
          placeholder="Write the work description"
          register={register}
          error={errors.workDescription?.message}
          value={selectedTimesheet ? selectedTimesheet.workDescription : ''}
          required
        />
      </SharedForm>
      <Modal
        isOpen={showFeedback}
        handleClose={() => {
          dispatch(showFeedbackMessage(false));
        }}
      >
        <FeedbackMessage infoForFeedback={feedbackInfo} />
        {pending && <Preloader />}
      </Modal>
    </div>
  );
};
export default Form;
