import { useState } from 'react';
import styles from './form.module.css';
import Input from './Input/input.js';
import Select from './Input/select.js';
const Form = () => {
  const [nameValue, setNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [telephoneValue, setTelephoneValue] = useState('');
  const [countryvalue, setCountryValue] = useState('');
  const [zipvalue, setZipValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [photoValue, setPhotoValue] = useState('');

  const onChangeNameValue = (e) => {
    setNameValue(e.target.value);
  };
  const onChangeLastNameValue = (e) => {
    setLastNameValue(e.target.value);
  };
  const onChangeEmailValue = (e) => {
    setEmailValue(e.target.value);
  };
  const onChangeTelephoneValue = (e) => {
    setTelephoneValue(e.target.value);
  };
  const onChangeCountryValue = (e) => {
    setCountryValue(e.target.value);
  };
  const onChangeZipValue = (e) => {
    setZipValue(e.target.value);
  };
  const onChangePasswordValue = (e) => {
    setPasswordValue(e.target.value);
  };
  const onChangePhotoValue = (e) => {
    setPhotoValue(e.target.value);
  };
  return (
    <div className={styles.container}>
      <h1>Add an employee</h1>
      <form>
        <Select />
        <Input
          name="first-name"
          type="text"
          placeholder="Write your name."
          value={nameValue}
          onChange={onChangeNameValue}
          required
        />
        <Input
          name="last-name"
          type="text"
          placeholder="Write your last name."
          value={lastNameValue}
          onChange={onChangeLastNameValue}
          required
        />
        <Input
          name="email"
          type="text"
          placeholder="Write your email."
          value={emailValue}
          onChange={onChangeEmailValue}
          required
        />
        <Input
          name="phone"
          type="text"
          placeholder="Write your telephone."
          value={telephoneValue}
          onChange={onChangeTelephoneValue}
          required
        />
        <Input
          name="country"
          type="text"
          placeholder="Write your country."
          value={countryvalue}
          onChange={onChangeCountryValue}
          required
        />
        <Input
          name="city"
          type="text"
          placeholder="Write your city."
          value={zipvalue}
          onChange={onChangeZipValue}
          required
        />
        <Input
          name="password"
          type="text"
          placeholder="Write your city."
          value={passwordValue}
          onChange={onChangePasswordValue}
          required
        />
        <Input
          name="profile-picture"
          type="text"
          placeholder="Write your profile picture url."
          value={photoValue}
          onChange={onChangePhotoValue}
          required
        />

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Form;
