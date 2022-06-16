import { useState, useEffect } from 'react';
import styles from './form.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { showFeedbackMessage } from '../../../redux/admins/actions';
import SharedForm from '../../Shared/Form';
import Input from '../../Shared/Input/InputText';
import Select from '../../Shared/Input/InputSelect';
import Modal from '../../Shared/Modal';
import Preloader from '../../Shared/Preloader';
import FeedbackMessage from '../../Shared/FeedbackMessage';
import { editAdmin, postAdmin } from '../../../redux/admins/thunks';

const Form = () => {
  const dispatch = useDispatch();
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
  const isPending = useSelector((state) => state.admins.pending);
  const feedbackInfo = useSelector((state) => state.admins.infoForFeedback);
  const showFeedback = useSelector((state) => state.admins.showFeedbackMessage);
  const adminSelected = useSelector((state) => state.admins.adminSelected);
  const isAdminSelected = Object.keys(adminSelected).length;

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

  const arrayToMapGender = [
    { id: 'male', optionContent: 'Male' },
    { id: 'female', optionContent: 'Female' },
    { id: 'other', optionContent: 'Other' }
  ];

  const arrayToMapActive = [
    { id: true, optionContent: 'Active' },
    { id: false, optionContent: 'Inactive' }
  ];

  useEffect(() => {
    if (isAdminSelected) {
      setNameValue(adminSelected.name);
      setLastNameValue(adminSelected.lastName);
      setEmailValue(adminSelected.email);
      setPasswordValue(adminSelected.password);
      setCityValue(adminSelected.city);
      setBirthDateValue(adminSelected.dateBirth);
      setGenderValue(adminSelected.gender);
      setPhoneValue(adminSelected.phone);
      setZipValue(adminSelected.zip);
      setActiveValue(adminSelected.active);
    }
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    const options = {
      method: isAdminSelected ? 'PUT' : 'POST',
      url: isAdminSelected
        ? `${process.env.REACT_APP_API_URL}/admins/${adminSelected._id}`
        : `${process.env.REACT_APP_API_URL}/admins`,
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
    isAdminSelected ? dispatch(editAdmin(options)) : dispatch(postAdmin(options));
  };

  const title = isAdminSelected ? `Editing ${nameValue} admin information.` : 'Add an Admin';

  const dayInput = birthDateValue.substring(5, 7);
  const monthInput = birthDateValue.substring(8, 10);
  const yearInput = birthDateValue.substring(0, 4);
  const dateFormat = `${yearInput}-${monthInput}-${dayInput}`;

  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <SharedForm onSubmit={onSubmit}>
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
          arrayToMap={arrayToMapGender}
          id="gender"
          name="gender"
          value={genderValue}
          onChange={onChangeGenderInput}
          placeholder="Enter the admin gender"
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
          label="Active"
          arrayToMap={arrayToMapActive}
          id="active"
          name="active"
          value={activeValue}
          onChange={onChangeActiveInput}
          placeholder="Enter the admin status"
          required
        />
      </SharedForm>
      <Modal
        isOpen={showFeedback}
        handleClose={() => {
          dispatch(showFeedbackMessage(!showFeedback));
        }}
      >
        <FeedbackMessage infoForFeedback={feedbackInfo} />
      </Modal>
      {isPending && <Preloader />}
    </div>
  );
};

export default Form;
