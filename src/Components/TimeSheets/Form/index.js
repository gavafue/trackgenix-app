import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './form.module.css';
import Select from '../../Shared/Input/InputSelect';
import Input from '../../Shared/Input/InputText';
import Modal from '../../Shared/Modal';
import FeedbackMessage from '../../Shared/FeedbackMessage';
import Button from '../../Shared/Button';

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

  useEffect(() => {
    fetch(`${URL}/projects`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
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

  const [infoForFeedback, setInfoForFeedback] = useState({});

  const [showFeedbackMessage, setShowFeedbackMessage] = useState(false);

  const timesheetId = useParams();

  const title = timesheetId.id ? 'Update Timesheet' : 'Add Timesheet';

  const options = {
    method: timesheetId.id ? 'PUT' : 'POST',
    url: `${process.env.REACT_APP_API_URL}/timesheets/${timesheetId ? timesheetId.id : ''} `,
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

  const arrayToMapEmployees = employees.map((item) => {
    return {
      id: item._id,
      optionContent: `${item.firstName + ' ' + item.lastName}`
    };
  });

  const arrayToMapProjects = projects.map((item) => {
    return {
      id: item._id,
      optionContent: `${item.name}`
    };
  });

  useEffect(() => {
    if (timesheetId) {
      fetch(`${URL}/timesheets/${timesheetId.id}`)
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
        setInfoForFeedback({
          title: 'Request done!',
          description: data.message
        });
        setShowFeedbackMessage(true);
      } else {
        setInfoForFeedback({
          title: 'Something went wrong',
          description: data.message
        });
        setShowFeedbackMessage(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form className={styles.container} onSubmit={onSubmit}>
        <h2>{title}</h2>
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
          type="text"
          placeholder="Write the date"
          value={dateValue}
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
        <div className={styles.buttoncontainer}>
          <Button type="submit" label="Submit" theme="secondary" />
        </div>
      </form>
      <Modal
        isOpen={showFeedbackMessage}
        handleClose={() => {
          setShowFeedbackMessage(false);
        }}
      >
        <FeedbackMessage infoForFeedback={infoForFeedback} />
      </Modal>
    </div>
  );
};
export default Form;
