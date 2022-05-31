import { useState, useEffect } from 'react';
import styles from './form.module.css';

function Form() {
  const [employees, setEmployees] = useState([]);
  useEffect(async () => {
    try {
      const URL = process.env.REACT_APP_API_URL;
      const response = await fetch(`${URL}/employees`);
      const data = await response.json();
      setEmployees(data.data);
    } catch (error) {
      console.error(error);
    }
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

  let title = 'Add a Project';
  const querystring = window.location.search;
  const params = new URLSearchParams(querystring);
  const paramProjectId = params.get('projectId');

  const options = {
    method: 'POST',
    url: `${process.env.REACT_APP_API_URL}/projects`,
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

  const onSubmit = (event) => {
    console.log({
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
    });
    event.preventDefault();
    fetch(options.url, options).then(async (response) => {
      const res = await response.json();
      if (response.status !== 200 && response.status !== 201) {
        throw new Error(res.message);
      }
      alert(res.message);
      window.location = '/projects';
    });
  };

  if (paramProjectId) {
    title = `Editing ${nameValue} projects's information.`;
    useEffect(async () => {
      try {
        const URL = process.env.REACT_APP_API_URL;
        const response = await fetch(`${URL}/projects/${paramProjectId}`);
        const data = await response.json();
        setNameValue(data.data.name);
        setStartDateValue(data.data.startDate);
        setEndDateValue(data.data.endDate);
        setDescriptionValue(data.data.description);
        setClientValue(data.data.client);
        setMembersValue(data.data.members);
        setActiveValue(data.data.active);
      } catch (error) {
        console.error(error);
      }
    }, []);
    options.method = 'PUT';
    options.url = `${process.env.REACT_APP_API_URL}/projects/${paramProjectId}`;
    options.body = JSON.stringify({
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
    });
  }

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
        <button className={styles.smallBtn} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
