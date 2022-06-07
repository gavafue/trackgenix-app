import styles from './form.module.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../Shared/Button';
import Input from '../../Shared/Input/InputText';
import Select from '../../Shared/Input/InputSelect';
import Modal from '../../Shared/Modal';

function Form() {
  const [nameValue, setNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [genderValue, setGenderValue] = useState('');
  const [birthDateValue, setBirthDateValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [zipValue, setZipValue] = useState('');
  const [activeValue, setActiveValue] = useState('');

  const onChangeNameInput = (event) => {
    setNameValue(event.target.value);
  };
  const onChangeLastNameInput = (event) => {
    setLastNameValue(event.target.value);
  };
  const onChangeEmailInput = (event) => {
    setEmailValue(event.target.value);
  };
  const onChangePasswordInput = (event) => {
    setPasswordValue(event.target.value);
  };
  const onChangePhoneInput = (event) => {
    setPhoneValue(event.target.value);
  };
  const onChangeGenderInput = (event) => {
    setGenderValue(event.target.value);
  };
  const onChangeBirthDateInput = (event) => {
    setBirthDateValue(event.target.value);
  };
  const onChangeCityInput = (event) => {
    setCityValue(event.target.value);
  };
  const onChangeZipInput = (event) => {
    setZipValue(event.target.value);
  };
  const onChangeActiveInput = (event) => {
    setActiveValue(event.target.value);
  };

  const adminId = useParams();
  const title = adminId ? `${nameValue} ${lastNameValue}` : 'Add admin';
  const options = {
    method: adminId ? 'PUT' : 'POST',
    url: `${process.env.REACT_APP_API_URL}/admins/${adminId ? adminId.id : ''}`,
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
  const URL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    if (adminId) {
      fetch(`${URL}/admins/${adminId.id}`)
        .then((res) => res.json())
        .then((data) => {
          setNameValue(data.data.name);
          setLastNameValue(data.data.lastName);
          setEmailValue(data.data.email);
          setPasswordValue(data.data.password);
          setCityValue(data.data.city);
          setBirthDateValue(data.data.dateBirth);
          setGenderValue(data.data.gender);
          setPhoneValue(data.data.phone);
          setZipValue(data.data.zip);
          setActiveValue(data.data.active);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      const res = await fetch(options.url, options);
      const data = await res.json();
      if (data.status == 201 || data.status == 200) {
        return (
          <Modal>
            <h2>Request done!</h2>
            <p>{data.message}</p>
          </Modal>
        );
      } else {
        return (
          <Modal>
            <h2>Something went wrong</h2>
            <p>{data.message}</p>
          </Modal>
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  const dayInput = birthDateValue.substring(5, 7);
  const monthInput = birthDateValue.substring(8, 10);
  const yearInput = birthDateValue.substring(0, 4);
  const dateFormat = `${yearInput}-${monthInput}-${dayInput}`;

  return (
    <div className={styles.adminForm}>
      <h2>{title}</h2>
      <form onSubmit={onSubmit} className={styles.container}>
        <fieldset className={styles.adminFieldset}>
          <Input
            label="Name"
            id="name"
            name="name"
            type="text"
            placeholder="Enter admin's name"
            value={nameValue}
            onChange={onChangeNameInput}
            required
          />
          <Input
            label="Last&nbsp;name"
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Enter admin's last name"
            value={lastNameValue}
            onChange={onChangeLastNameInput}
            required
          />
          <Input
            label="E-mail"
            id="email"
            name="email"
            type="email"
            placeholder="Enter a valid email"
            value={emailValue}
            onChange={onChangeEmailInput}
            required
          />
          <Input
            label="Password"
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={passwordValue}
            onChange={onChangePasswordInput}
            required
          />
          <Select
            label="Gender"
            arrayToMap={['Male', 'Female', 'Other']}
            id="gender"
            name="gender"
            value={genderValue}
            onChange={onChangeGenderInput}
            placeholder={[genderValue ? genderValue : 'Enter your gender']}
            required
          />
          <Input
            label="Phone"
            id="phone"
            name="phone"
            type="tel"
            placeholder="Enter admin's phone number"
            value={phoneValue}
            onChange={onChangePhoneInput}
            required
          />
          <Input
            label="Date&nbsp;of&nbsp;birth"
            id="dateBirth"
            name="dateBirth"
            type="date"
            value={dateFormat}
            onChange={onChangeBirthDateInput}
            required
          />
          <Input
            label="City"
            id="city"
            name="city"
            type="text"
            placeholder="Enter admin's city"
            value={cityValue}
            onChange={onChangeCityInput}
            required
          />
          <Input
            label="Postal&nbsp;code"
            id="zip"
            name="zip"
            type="text"
            placeholder="Enter admin's postal code"
            value={zipValue}
            onChange={onChangeZipInput}
            required
          />
          <Select
            label="Status"
            arrayToMap={['Active', 'Inactive']}
            id="active"
            name="active"
            value={activeValue ? 'Active' : 'Inactive'}
            onChange={onChangeActiveInput}
            placeholder={activeValue ? 'Active' : 'Inactive'}
            required
          />
        </fieldset>
        <Button type="submit" label="Submit" />
      </form>
    </div>
  );
}

export default Form;
