import styles from './form.module.css';
import { useState, useEffect } from 'react';
import FeedbackModal from '../FeedbackModal';

function Form() {
  const [nameValue, setNameValue] = useState('');
  const onChangeNameInput = (event) => {
    setNameValue(event.target.value);
  };
  const [lastNameValue, setLastNameValue] = useState('');
  const onChangeLastNameInput = (event) => {
    setLastNameValue(event.target.value);
  };
  const [emailValue, setEmailValue] = useState('');
  const onChangeEmailInput = (event) => {
    setEmailValue(event.target.value);
  };
  const [passwordValue, setPasswordValue] = useState('');
  const onChangePasswordInput = (event) => {
    setPasswordValue(event.target.value);
  };
  const [phoneValue, setPhoneValue] = useState('');
  const onChangePhoneInput = (event) => {
    setPhoneValue(event.target.value);
  };
  const [genderValue, setGenderValue] = useState('');
  const onChangeGenderInput = (event) => {
    setGenderValue(event.target.value);
  };
  const [birthDateValue, setBirthDateValue] = useState('');
  const onChangeBirthDateInput = (event) => {
    setBirthDateValue(event.target.value);
  };
  const [cityValue, setCityValue] = useState('');
  const onChangeCityInput = (event) => {
    setCityValue(event.target.value);
  };
  const [zipValue, setZipValue] = useState('');
  const onChangeZipInput = (event) => {
    setZipValue(event.target.value);
  };
  const [activeValue, setActiveValue] = useState('');
  const onChangeActiveInput = (event) => {
    setActiveValue(event.target.value);
  };
  const [contentFeedbackModal, setContentFeedbackModal] = useState({});

  let title = 'New Admin';
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      name: nameValue,
      lastName: lastNameValue,
      email: emailValue,
      password: passwordValue,
      gender: genderValue,
      phone: phoneValue,
      dateBirth: birthDateValue,
      city: cityValue,
      zip: zipValue,
      active: activeValue
    })
  };

  const querystring = window.location.search;
  const params = new URLSearchParams(querystring);
  const paramAdminId = params.get('adminId');
  console.log(paramAdminId);

  const onSubmit = (event) => {
    event.preventDefault();
    const url = `${process.env.REACT_APP_API_URL}/admins`;
    //console.log(url);
    fetch(url, options).then(async (response) => {
      const res = await response.json();
      if (response.status !== 200 && response.status !== 201) {
        setContentFeedbackModal({ title: 'Something went wrong', description: res.message });
      }
      setContentFeedbackModal({ title: 'Request done!', description: res.message });
      setTimeout(() => {
        window.location = '/admins';
      }, 2000);
    });
  };
  if (paramAdminId) {
    title = `${nameValue} ${lastNameValue}`;
    useEffect(async () => {
      try {
        const URL = process.env.REACT_APP_API_URL;
        const response = await fetch(`${URL}/admins/${paramAdminId}`);
        console.log(response);
        //console.log(URL);
        const data = await response.json();
        setNameValue(data.data.name);
        setLastNameValue(data.data.lastName);
        setEmailValue(data.data.email);
        setPasswordValue(data.data.password);
        setCityValue(data.data.city);
        setBirthDateValue(data.data.birthDate);
        setGenderValue(data.data.gender);
        setPhoneValue(data.data.phone);
        setZipValue(data.data.zip);
        setActiveValue(data.data.active);
        //console.log(data);
      } catch (error) {
        console.error(error);
      }
    }, []);
    options.method = 'PUT';
    options.url = `${process.env.REACT_APP_API_URL}/admins/${paramAdminId}`;
    options.body = JSON.stringify({
      name: nameValue,
      lastName: lastNameValue,
      email: emailValue,
      password: passwordValue,
      gender: genderValue,
      phone: phoneValue,
      dateBirth: birthDateValue,
      city: cityValue,
      zip: zipValue,
      active: activeValue
    });
  }
  return (
    <div>
      <form onSubmit={onSubmit} className={styles.container}>
        <h2>{title}</h2>
        <label htmlFor="name">Name</label>
        <input
          className={styles.input}
          type="text"
          id="name"
          value={nameValue}
          onChange={onChangeNameInput}
          required
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          className={styles.input}
          type="text"
          id="lastName"
          value={lastNameValue}
          onChange={onChangeLastNameInput}
          required
        />
        <label htmlFor="email">E-mail</label>
        <input
          className={styles.input}
          type="text"
          id="email"
          value={emailValue}
          onChange={onChangeEmailInput}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          className={styles.input}
          type="text"
          id="password"
          value={passwordValue}
          onChange={onChangePasswordInput}
          required
        />
        <label htmlFor="gender">Gender</label>
        <select
          className={styles.input}
          id="gender"
          value={genderValue}
          onChange={onChangeGenderInput}
          required
        >
          <option value="Female">Female</option>
          <option value="Other">Other</option>
          <option value="Male">Male</option>
          <option value="" disabled selected hidden>
            Choose gender
          </option>
        </select>
        <label htmlFor="phone">Phone</label>
        <input
          className={styles.input}
          type="text"
          id="phone"
          value={phoneValue}
          onChange={onChangePhoneInput}
          required
        />
        <label htmlFor="dateBirth">Date of Birth</label>
        <input
          className={styles.input}
          type="date"
          id="dateBirth"
          value={birthDateValue}
          onChange={onChangeBirthDateInput}
          required
        />
        <label htmlFor="city">City</label>
        <input
          className={styles.input}
          type="text"
          id="city"
          value={cityValue}
          onChange={onChangeCityInput}
          required
        />
        <label htmlFor="zip">Postal Code</label>
        <input
          className={styles.input}
          type="text"
          id="zip"
          value={zipValue}
          onChange={onChangeZipInput}
          required
        />
        <label htmlFor="active">Status</label>
        <select
          className={styles.input}
          id="active"
          value={activeValue}
          onChange={onChangeActiveInput}
          required
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
          <option value="" disabled selected hidden>
            Is active?
          </option>
        </select>
        <button className={styles.input} type="submit" value="Submit">
          Submit
        </button>
      </form>
      <FeedbackModal
        feedbackTitle={contentFeedbackModal.title}
        feedbackContent={contentFeedbackModal.description}
      />
    </div>
  );
}

export default Form;
