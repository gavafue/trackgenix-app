import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../Shared/Input/InputText';
import FeedbackMessage from '../../Shared/FeedbackMessage';
import Modal from '../../Shared/Modal';
import Button from '../../Shared/Button';
import styles from './form.module.css';

const Form = () => {
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
  const [infoForFeedback, setInfoForFeedback] = useState({});
  const [showFeedbackMessage, setShowFeedbackMessage] = useState(false);
  const URL = process.env.REACT_APP_API_URL;

  const paramEmployeeId = useParams();

  const title = paramEmployeeId.id ? `${nameValue} ${lastNameValue}` : 'Add Employee';
  const options = {
    method: paramEmployeeId.id ? 'PUT' : 'POST',
    url: paramEmployeeId.id ? `${URL}/employees/${paramEmployeeId.id}` : `${URL}/employees`,
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
  useEffect(() => {
    if (paramEmployeeId.id) {
      fetch(`${URL}/employees/${paramEmployeeId.id}`)
        .then((response) => response.json())
        .then((data) => {
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
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    let correctStatus;
    fetch(options.url, options)
      .then((response) => {
        correctStatus = response.status === 201 || response.status === 200;
        return response.json();
      })
      .then((response) => {
        if (correctStatus) {
          setInfoForFeedback({
            title: 'Request done!',
            description: response.message
          });
          setShowFeedbackMessage(true);
        } else {
          setInfoForFeedback({
            title: 'Something went wrong',
            description: response.message
          });
          setShowFeedbackMessage(true);
        }
      })
      .catch((error) => console.log(error));
  };

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

  return (
    <div>
      <h1 className={styles.title}>{title}</h1>
      <form onSubmit={onSubmit}>
        <Input
          className={styles.input}
          id={paramEmployeeId.id}
          label="First Name"
          name="first-name"
          type="text"
          placeholder="Write your name."
          value={nameValue}
          onChange={onChangeNameValue}
          required
        />
        <Input
          label="Last Name"
          name="last-name"
          id="last-name"
          type="text"
          placeholder="Write your last name."
          value={lastNameValue}
          onChange={onChangeLastNameValue}
          required
        />
        <Input
          label="E-mail"
          name="email"
          id="email"
          type="text"
          placeholder="Write your email."
          value={emailValue}
          onChange={onChangeEmailValue}
          required
        />
        <Input
          label="Password"
          name="password"
          id="password"
          type="text"
          placeholder="Write your password."
          value={passwordValue}
          onChange={onChangePasswordValue}
          required
        />
        <Input
          label="Date of birth"
          name="birthday"
          id="birthday"
          type="text"
          placeholder="Write your birthday on format dd/mm/yyyy"
          value={birthdayValue}
          onChange={onChangeBirthdayValue}
          required
        />
        <Input
          label="Phone"
          name="phone"
          id="phone"
          type="text"
          placeholder="Write your telephone."
          value={telephoneValue}
          onChange={onChangeTelephoneValue}
          required
        />
        <Input
          label="Country"
          name="country"
          id="country"
          type="text"
          placeholder="Write your country."
          value={countryValue}
          onChange={onChangeCountryValue}
          required
        />
        <Input
          label="City"
          name="city"
          id="city"
          type="text"
          placeholder="Write your city."
          value={cityValue}
          onChange={onChangeCityValue}
          required
        />
        <Input
          label="Postal Code"
          name="ZIP"
          id="ZIP"
          type="text"
          placeholder="Write your postal code."
          value={zipValue}
          onChange={onChangeZipValue}
          required
        />
        <Input
          label="Profile picture"
          name="profile-picture"
          id="profile-picture"
          type="text"
          placeholder="Write your profile picture url."
          value={photoValue}
          onChange={onChangePhotoValue}
          required
        />
        <div className={styles.button}>
          <Button
            label={paramEmployeeId.id ? 'Update Employee' : 'Add Employee'}
            theme="secondary"
            type="submit"
          />
        </div>
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
