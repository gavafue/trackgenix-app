import { useEffect, useState } from 'react';
import SharedForm from '../../Shared/Form';
import styles from './form.module.css';
import Select from '../../Shared/Input/InputSelect';
import Input from '../../Shared/Input/InputText';
import Modal from '../../Shared/Modal';
import FeedbackMessage from '../../Shared/FeedbackMessage';
import Preloader from '../../Shared/Preloader';
import { addOrEditTimesheet } from '../../../redux/timesheet/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { showFeedbackMessage } from '../../../redux/timesheet/actions';
const URL = process.env.REACT_APP_API_URL;

const Form = () => {
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [projectValue, setProjectValue] = useState('');
  const [employeeValue, setEmployeeValue] = useState('');
  const [weekSprintValue, setWeekSprintValue] = useState('');
  const [hoursWorkedValue, setHoursWorkedValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [projectHoursValue, setProjectHoursValue] = useState('');
  const [workDescriptionValue, setWorkDescriptionValue] = useState('');
  const dispatch = useDispatch();
  const showFeedback = useSelector((state) => state.timesheets.showFeedbackMessage);
  const pending = useSelector((state) => state.timesheets.pending);
  const feedbackInfo = useSelector((state) => state.timesheets.infoForFeedback);
  const selectedTimesheet = useSelector((store) => store.timesheets.timesheetSelected);
  useEffect(() => {
    //Get data for projects
    fetch(`${URL}/projects`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.data);
      })
      .catch((err) => console.log(err));
    //Get data for employees
    fetch(`${URL}/employees`)
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const onChangeProjectSelect = (event) => {
    setProjectValue(event.target.value);
  };

  const onChangeEmployeeSelect = (event) => {
    setEmployeeValue(event.target.value);
  };

  const onChangeWeekSprint = (event) => {
    setWeekSprintValue(event.target.value);
  };

  const onChangeDate = (event) => {
    setDateValue(event.target.value);
  };

  const onChangeHoursWork = (event) => {
    setHoursWorkedValue(event.target.value);
  };

  const onChangeProjectHours = (event) => {
    setProjectHoursValue(event.target.value);
  };

  const onChangeWorkDescription = (event) => {
    setWorkDescriptionValue(event.target.value);
  };

  const title = selectedTimesheet.length != 0 ? 'Update Timesheet' : 'Add Timesheet';

  const options = {
    method: selectedTimesheet.length != 0 ? 'PUT' : 'POST',
    url:
      selectedTimesheet.length != 0
        ? `${URL}/timesheets/${selectedTimesheet._id}`
        : `${URL}/timesheets`,
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
    dispatch(addOrEditTimesheet(options));
  };

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

  useEffect(() => {
    if (selectedTimesheet.length != 0) {
      setProjectValue(selectedTimesheet.project?._id || '');
      setEmployeeValue(selectedTimesheet.employee?._id || '');
      setWeekSprintValue(selectedTimesheet.weekSprint);
      setDateValue(selectedTimesheet.date ?? '');
      setHoursWorkedValue(selectedTimesheet.hoursWorked);
      setProjectHoursValue(selectedTimesheet.hoursProject);
      setWorkDescriptionValue(selectedTimesheet.workDescription);
    }
  }, []);

  const dayInput = dateValue?.substring(5, 7);
  const monthInput = dateValue?.substring(8, 10);
  const yearInput = dateValue?.substring(0, 4);
  const dateFormat = `${yearInput}-${monthInput}-${dayInput}`;

  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <SharedForm onSubmit={onSubmit}>
        <Select
          label="Project"
          arrayToMap={arrayToMapProjects}
          id="project"
          name="project"
          value={projectValue}
          onChange={onChangeProjectSelect}
          placeholder="Choose the project"
          required
        />
        <Select
          label="Employees"
          arrayToMap={arrayToMapEmployees}
          id="employee"
          name="employee"
          value={employeeValue}
          onChange={onChangeEmployeeSelect}
          placeholder="Choose the employee"
          required
        />
        <Input
          label="Week Sprint"
          id="weeksprint"
          name="weeksprint"
          type="text"
          placeholder="Write the week sprint"
          value={weekSprintValue}
          onChange={onChangeWeekSprint}
          required
        />
        <Input
          label="Date"
          id="date"
          name="date"
          type="date"
          placeholder="Write the date"
          value={dateFormat}
          onChange={onChangeDate}
          required
        />
        <Input
          label="Hours worked"
          type="number"
          id="hoursWorked"
          name="hoursWorked"
          value={hoursWorkedValue}
          placeholder="Write the hours worked"
          onChange={onChangeHoursWork}
          required
        />
        <Input
          label="Project Hours"
          id="projectHours"
          name="projectHours"
          type="number"
          placeholder="Write the project hours"
          value={projectHoursValue}
          onChange={onChangeProjectHours}
          required
        />
        <Input
          label="Work description"
          id="workDescription"
          name="workDescription"
          type="text"
          placeholder="Write the work description"
          value={workDescriptionValue}
          onChange={onChangeWorkDescription}
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
