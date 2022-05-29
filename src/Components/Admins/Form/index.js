import styles from './form.module.css';
import { useState } from 'react';

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
  const [phoneValue, setPhoneValue] = useState('');
  const onChangePhoneInput = (event) => {
    setPhoneValue(event.target.value);
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

  return (
    <div className={styles.container}>
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
      <label htmlFor="gender">Gender</label>
      <select className={styles.input} id="gender">
        <option value="female">Female</option>
        <option value="other">Other</option>
        <option value="male">Male</option>
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
      <label htmlFor="status">Status</label>
      <select className={styles.input} id="active">
        <option value="true">Active</option>
        <option value="false">Inactive</option>
      </select>
      <input className={styles.input} type="submit" value="Submit" />
    </div>
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
