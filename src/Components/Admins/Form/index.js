import styles from './form.module.css';
import { useState, useEffect } from 'react';

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
  const onSubmit = (event) => {
    event.preventDefault();
    const url = `${process.env.REACT_APP_API_URL}/admins`;
    fetch(url, options).then(async (response) => {
      if (response.status !== 200 && response.status !== 201) {
        const { message } = await response.json();
        throw new Error(message);
      }
      return response.json();
    });
  };
  if (paramAdminId) {
    useEffect(async () => {
      try {
        const URL = process.env.REACT_APP_API_URL;
        const response = await fetch(`${URL}/admins/${paramAdminId}`);
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
      } catch (error) {
        console.error(error);
      }
    }, []);
    options.method = 'PUT';
    options.url = `${process.env.REACT_APP_API_URL}/employees/${paramAdminId}`;
  }
  return (
    <form onSubmit={onSubmit} className={styles.container}>
      <h2>Admin</h2>
      <label htmlFor="name">Name</label>
      <input
        className={styles.input}
        type="text"
        id="name"
        value={nameValue}
        onChange={onChangeNameInput}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        className={styles.input}
        type="text"
        id="lastName"
        value={lastNameValue}
        onChange={onChangeLastNameInput}
      />
      <label htmlFor="email">E-mail</label>
      <input
        className={styles.input}
        type="text"
        id="email"
        value={emailValue}
        onChange={onChangeEmailInput}
      />
      <label htmlFor="password">Password</label>
      <input
        className={styles.input}
        type="text"
        id="password"
        value={passwordValue}
        onChange={onChangePasswordInput}
      />
      <label htmlFor="gender">Gender</label>
      <select
        className={styles.input}
        id="gender"
        value={genderValue}
        onChange={onChangeGenderInput}
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
      />
      <label htmlFor="dateBirth">Date of Birth</label>
      <input
        className={styles.input}
        type="date"
        id="dateBirth"
        value={birthDateValue}
        onChange={onChangeBirthDateInput}
      />
      <label htmlFor="city">City</label>
      <input
        className={styles.input}
        type="text"
        id="city"
        value={cityValue}
        onChange={onChangeCityInput}
      />
      <label htmlFor="zip">Postal Code</label>
      <input
        className={styles.input}
        type="text"
        id="zip"
        value={zipValue}
        onChange={onChangeZipInput}
      />
      <label htmlFor="active">Status</label>
      <select
        className={styles.input}
        id="active"
        value={activeValue}
        onChange={onChangeActiveInput}
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
  );
}

export default Form;

// name
// lastName
// email
// password
// gender
// phone
// dateBirth
// city
// zip
// active
