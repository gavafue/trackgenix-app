import { useState, useEffect } from 'react';
import styles from './form.module.css';
import Input from './Input/input.js';

const Form = () => {
  // const [employeeFound, setEmployeeFound] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [telephoneValue, setTelephoneValue] = useState('');
  const [countryValue, setCountryValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [zipValue, setZipValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [photoValue, setPhotoValue] = useState('');
  const [birthdayValue, setBirthdayValue] = useState('');

  let title = 'Add an employee';
  const querystring = window.location.search;
  const params = new URLSearchParams(querystring);
  const paramEmployeeId = params.get('employeeId');
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
  const onChangeCityValue = (e) => {
    setCityValue(e.target.value);
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
  const onChangeBirthdayValue = (e) => {
    setBirthdayValue(e.target.value);
  };
  const options = {
    method: 'POST',
    url: `${process.env.REACT_APP_API_URL}/employees`,
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      firstName: nameValue,
      lastName: lastNameValue,
      email: emailValue,
      country: countryValue,
      city: cityValue,
      zip: zipValue,
      phone: telephoneValue,
      birthDate: birthdayValue,
      photo: photoValue,
      password: passwordValue,
      active: false
    })
  };
  const onSubmit = (event) => {
    event.preventDefault();
    fetch(options.url, options).then((response) => {
      if (response.status !== 201) {
        return response.json().then(({ message }) => {
          throw new Error(message);
        });
      }
      return response.json();
    });
  };

  if (paramEmployeeId) {
    title = `Editing ${nameValue} ${lastNameValue} information.`;
    useEffect(async () => {
      try {
        const URL = process.env.REACT_APP_API_URL;
        const response = await fetch(`${URL}/employees/${paramEmployeeId}`);
        const data = await response.json();
        setNameValue(data.data.firstName);
        setLastNameValue(data.data.lastName);
        setEmailValue(data.data.email);
        setPasswordValue(data.data.password);
        setCityValue(data.data.city);
        setBirthdayValue(data.data.birthDate);
        setPhotoValue(data.data.photo);
        setTelephoneValue(data.data.phone);
        setZipValue(data.data.zip);
        setCountryValue(data.data.country);
      } catch (error) {
        console.error(error);
      }
    }, []);
    options.method = 'PUT';
    options.url = `${process.env.REACT_APP_API_URL}/employees/${paramEmployeeId}`;
  }
  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <form onSubmit={onSubmit}>
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
          name="password"
          type="text"
          placeholder="Write your password."
          value={passwordValue}
          onChange={onChangePasswordValue}
          required
        />
        <Input
          name="birthday"
          type="text"
          placeholder="Write your birthday on format dd/mm/yyyy"
          value={birthdayValue}
          onChange={onChangeBirthdayValue}
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
          value={countryValue}
          onChange={onChangeCountryValue}
          required
        />{' '}
        <Input
          name="city"
          type="text"
          placeholder="Write your city."
          value={cityValue}
          onChange={onChangeCityValue}
          required
        />
        <Input
          name="ZIP"
          type="text"
          placeholder="Write your city."
          value={zipValue}
          onChange={onChangeZipValue}
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
