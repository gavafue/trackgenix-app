import { useState, useEffect } from 'react';
import FeedbackModal from '../FeedbackModal';
import styles from './form.module.css';

const Form = () => {
  const [employees, setEmployees] = useState([]);
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
  const [contentFeedbackModal, setContentFeedbackModal] = useState({});
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const querystring = window.location.search;
  const params = new URLSearchParams(querystring);
  const projectId = params.get('projectId');
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
          setMembersValue(data.data.members);
          setActiveValue(data.data.active);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      const res = await fetch(options.url, options);
      const data = await res.json();
      if (data.status !== 201 && data.status !== 200) {
        setContentFeedbackModal({ title: 'Something went wrong', description: data.message });
        setShowFeedbackModal(true);
      } else {
        setContentFeedbackModal({ title: 'Request done!', description: data.message });
        setShowFeedbackModal(true);
        // setTimeout(() => {
        //   window.location = '/projects';
        // }, 3000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <form onSubmit={onSubmit}>
        <fieldset>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={nameValue} onChange={onChangeNameInput} required />
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDateValue}
            onChange={onChangeStartDateInput}
            required
          />
          <label htmlFor="endDate">End Date:</label>
          <input type="date" id="endDate" value={endDateValue} onChange={onChangeEndDateInput} />
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={descriptionValue}
            onChange={onChangeDescriptionInput}
            required
          />
          <label htmlFor="client">Client:</label>
          <input
            type="text"
            id="client"
            value={clientValue}
            onChange={onChangeClientInput}
            required
          />
          <label htmlFor="active">Active:</label>
          <select id="active" value={activeValue} onChange={onChangeActiveInput} required>
            <option defaultValue value={true}>
              True
            </option>
            <option value={false}>False</option>
          </select>
          <label>Employee</label>
          <select
            id="employee"
            name="employee"
            value={membersValue}
            onChange={onChangeMembersInput}
            required
          >
            {employees &&
              employees.map((employee) => {
                return (
                  <option
                    defaultValue={Boolean(employee._id === membersValue)}
                    value={employee._id}
                    key={employee._id}
                  >{`${employee.firstName + ' ' + employee.lastName}`}</option>
                );
              })}
            ;
            <option disabled defaultValue hidden>
              Choose Member
            </option>
          </select>
          <label>Role</label>
          <select
            id="role"
            name="role"
            value={membersRoleValue}
            onChange={onChangeMembersRoleInput}
            required
          >
            <option value={'TL'}>TL</option>
            <option value={'QA'}>QA</option>
            <option value={'DEV'}>DEV</option>
            <option value={'PM'}>PM</option>
            <option disabled defaultValue hidden>
              Choose Member
            </option>
          </select>
          <label>Rate</label>
          <input
            type="num"
            value={membersRateValue}
            onChange={onChangeMembersRateInput}
            placeholder="Enter the employee's rate"
          />
        </fieldset>
        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
      </form>
      {showFeedbackModal && (
        <FeedbackModal
          feedbackTitle={contentFeedbackModal.title}
          messageContent={contentFeedbackModal.description}
          setShowFeedbackModal={setShowFeedbackModal}
          showFeedbackModal={showFeedbackModal}
        />
      )}
    </div>
  );
};

export default Form;
