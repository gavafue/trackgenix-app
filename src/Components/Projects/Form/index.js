import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SharedForm from '../../Shared/Form';
import InputText from '../../Shared/Input/InputText';
import InputSelect from '../../Shared/Input/InputSelect';
import styles from './form.module.css';
import Modal from '../../Shared/Modal';
import FeedbackMessage from '../../Shared/FeedbackMessage';
import Loader from '../../Shared/Preloader';

const Form = () => {
  const [employees, setEmployees] = useState([]);
  const [showFeedbackMessage, setShowFeedbackMessage] = useState(false);
  const [infoForFeedback, setInfoForFeedback] = useState({});
  const [showLoader, setShowLoader] = useState(false);
  const URL = process.env.REACT_APP_API_URL;

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
    setShowLoader(true);
    fetch(`${URL}/employees`)
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data.data);
      })
      .catch((err) => console.log(err));

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
        })
        .catch((err) => console.log(err));
    }
    setShowLoader(false);
  }, []);

  const onSubmit = async (event) => {
    setShowLoader(true);
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
    setShowLoader(false);
  };

  const arrayToMapEmployees = employees.map((employee) => {
    return { id: employee._id, optionContent: `${employee.firstName} ${employee.lastName}` };
  });

  return (
    <div className={styles.container}>
      {showLoader && <Loader />}
      <h2>{title}</h2>
      <SharedForm onSubmit={onSubmit}>
        <InputText
          name="Name"
          type="text"
          label="Name"
          onChange={onChangeNameInput}
          placeholder="Write the project's name"
          value={nameValue}
          required
        />
        <InputText
          name="startDate"
          type="text"
          label="Start date"
          onChange={onChangeStartDateInput}
          placeholder="Write the start date"
          value={startDateValue}
          required
        />
        <InputText
          name="endDate"
          type="text"
          label="End date"
          onChange={onChangeEndDateInput}
          placeholder="Write the end date"
          value={endDateValue}
        />
        <InputText
          name="description"
          type="text"
          label="Description"
          onChange={onChangeDescriptionInput}
          placeholder="Write the description"
          value={descriptionValue}
          required
        />
        <InputText
          name="client"
          label="Client"
          type="text"
          onChange={onChangeClientInput}
          placeholder="Write the Client's name"
          value={clientValue}
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
          value={activeValue}
          onChange={onChangeActiveInput}
        />
        <InputSelect
          className={styles.select}
          arrayToMap={arrayToMapEmployees}
          id="members"
          name="members"
          label="Members"
          value={membersValue}
          onChange={onChangeMembersInput}
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
          value={membersRoleValue}
          onChange={onChangeMembersRoleInput}
        />
        <InputText
          name="rate"
          type="text"
          label="Rate"
          onChange={onChangeMembersRateInput}
          placeholder="Write the rate"
          value={membersRateValue}
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
    </div>
  );
};

export default Form;
