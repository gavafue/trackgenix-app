import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InputText from '../../Shared/Input/InputText';
import InputSelect from '../../Shared/Input/InputSelect';
import styles from './form.module.css';
import Modal from '../../Shared/Modal';
import FeedbackMessage from '../../Shared/FeedbackMessage';

const Form = () => {
  const [employees, setEmployees] = useState([]);
  const [showFeedbackMessage, setShowFeedbackMessage] = useState(false);
  const [infoForFeedback, setInfoForFeedback] = useState({});
  const URL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    fetch(`${URL}/employees`)
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [nameValue, setNameValue] = useState('');
  const onChangeNameInput = (event) => {
    setNameValue(event.target.value);
  };
  const [startDateValue, setStartDateValue] = useState('');
  const onChangeStartDateInput = (event) => {
    setStartDateValue(event.target.value);
  };
  const [endDateValue, setEndDateValue] = useState('');
  const onChangeEndDateInput = (event) => {
    setEndDateValue(event.target.value);
  };
  const [descriptionValue, setDescriptionValue] = useState('');
  const onChangeDescriptionInput = (event) => {
    setDescriptionValue(event.target.value);
  };
  const [clientValue, setClientValue] = useState('');
  const onChangeClientInput = (event) => {
    setClientValue(event.target.value);
  };
  const [activeValue, setActiveValue] = useState('');
  const onChangeActiveInput = (event) => {
    setActiveValue(event.target.value);
  };
  const [membersValue, setMembersValue] = useState('');
  const onChangeMembersInput = (event) => {
    setMembersValue(event.target.value);
  };
  const [membersRoleValue, setMembersRoleValue] = useState('');
  const onChangeMembersRoleInput = (event) => {
    setMembersRoleValue(event.target.value);
  };

  const [membersRateValue, setMembersRateValue] = useState('');
  const onChangeMembersRateInput = (event) => {
    setMembersRateValue(event.target.value);
  };

  const projectId = useParams().id;
  const title = projectId ? `Editing ${nameValue} projects's information.` : 'Add a Project';

  const options = {
    method: projectId ? 'PUT' : 'POST',
    url: `${URL}/projects/${projectId ? projectId : ''}`,
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      name: nameValue,
      startDate: startDateValue,
      endDate: endDateValue,
      description: descriptionValue,
      client: clientValue,
      members: [
        {
          name: membersValue,
          role: membersRoleValue,
          rate: membersRateValue
        }
      ],
      active: activeValue
    })
  };

  useEffect(() => {
    if (projectId) {
      fetch(`${URL}/projects/${projectId}`)
        .then((res) => res.json())
        .then((data) => {
          setNameValue(data.data.name);
          setStartDateValue(data.data.startDate);
          setEndDateValue(data.data.endDate);
          setDescriptionValue(data.data.description);
          setClientValue(data.data.client);
          setMembersValue(data.data.members[0]._id);
          setActiveValue(data.data.active);
          setMembersRateValue(data.data.members[0].rate);
          setMembersRoleValue(data.data.members[0].role);
          console.log(data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      const res = await fetch(options.url, options);
      const data = await res.json();
      if (res.status === 201 || res.status === 200) {
        setInfoForFeedback({ title: 'Request done!', description: data.message });
        setShowFeedbackMessage(true);
      } else {
        setInfoForFeedback({ title: 'Something went wrong!', description: data.message });
        setShowFeedbackMessage(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const arrayToMapEmployees = employees.map((employee) => {
    return { id: employee._id, optionContent: employee.firstName + employee.lastName };
  });

  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <InputText
          name="Name"
          type="text"
          onChange={onChangeNameInput}
          placeholder="Write the project's name"
          value={nameValue}
          required
        />
        <label htmlFor="startDate">Start Date:</label>
        <InputText
          name="startDate"
          type="text"
          onChange={onChangeStartDateInput}
          placeholder="Write the start date"
          value={startDateValue}
          required
        />
        <label htmlFor="endDate">End Date:</label>
        <InputText
          name="endDate"
          type="text"
          onChange={onChangeEndDateInput}
          placeholder="Write the end date"
          value={endDateValue}
        />
        <label htmlFor="description">Description:</label>
        <InputText
          name="description"
          type="text"
          onChange={onChangeDescriptionInput}
          placeholder="Write the description"
          value={descriptionValue}
          required
        />
        <label htmlFor="client">Client:</label>
        <InputText
          name="client"
          type="text"
          onChange={onChangeClientInput}
          placeholder="Write the Client's name"
          value={clientValue}
          required
        />
        <label htmlFor="active">Active:</label>
        <InputSelect
          arrayToMap={[
            { id: true, optionContent: 'True' },
            { id: false, optionContent: 'False' }
          ]}
          id="active"
          name="active"
          value={activeValue}
          onChange={onChangeActiveInput}
        />

        <label>Members</label>
        <InputSelect
          arrayToMap={arrayToMapEmployees}
          id="members"
          name="members"
          value={membersValue}
          onChange={onChangeMembersInput}
        />
        <label>Role</label>
        <InputSelect
          arrayToMap={[
            { id: 'TL', optionContent: 'TL' },
            { id: 'QA', optionContent: 'QA' },
            { id: 'DEV', optionContent: 'DEV' },
            { id: 'PM', optionContent: 'PM' }
          ]}
          id="role"
          name="role"
          value={membersRoleValue}
          onChange={onChangeMembersRoleInput}
        />
        <label>Rate</label>
        <InputText
          name="rate"
          type="text"
          onChange={onChangeMembersRateInput}
          placeholder="Write the rate"
          value={membersRateValue}
        />

        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
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
