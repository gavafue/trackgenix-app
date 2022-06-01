import { useEffect, useState } from 'react';
import styles from './form.module.css';
import Input from '../input/input.js';
import FeedbackModal from '../FeedbackModal';

const Form = () => {
  const [nameValue, setNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [activeValue, setActiveValue] = useState('');
  const [roleValue, setRoleValue] = useState('');
  const [contentFeedbackModal, setContentFeedbackModal] = useState({});

  let modalOfFeedback = document.getElementById('myModal');

  const changeVisibilityFeedbackModal = (string) => {
    modalOfFeedback.style.display = string;
  };

  const onChangeNameInput = (e) => {
    setNameValue(e.target.value);
  };

  const onChangeLastNameInput = (e) => {
    setLastNameValue(e.target.value);
  };

  const onChangePasswordInput = (e) => {
    setPasswordValue(e.target.value);
  };

  const onChangeEmailInput = (e) => {
    setEmailValue(e.target.value);
  };

  const onChangeActiveInput = (e) => {
    setActiveValue(e.target.value);
  };

  const onChangeRoleInput = (e) => {
    setRoleValue(e.target.value);
  };

  const params = new URLSearchParams(window.location.search);
  const superadminId = params.get('superadminId');

  const options = {
    method: 'POST',
    url: `${process.env.REACT_APP_API_URL}/super-admin`,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstName: nameValue,
      lastName: lastNameValue,
      password: passwordValue,
      email: emailValue,
      role: roleValue,
      active: activeValue
    })
  };

  if (superadminId) {
    useEffect(async () => {
      try {
        const response = await fetch(`
        ${process.env.REACT_APP_API_URL}/super-admin/${superadminId}`);
        const data = await response.json();
        setNameValue(data.data.firstName);
        setLastNameValue(data.data.lastName);
        setEmailValue(data.data.email);
        setPasswordValue(data.data.password);
        setActiveValue(data.data.active);
        setRoleValue(data.data.role);
      } catch (error) {
        console.error(error);
      }
    }, []);
    options.method = 'PUT';
    options.url = `${process.env.REACT_APP_API_URL}/super-admin/${superadminId}`;
    options.body = JSON.stringify({
      firstName: nameValue,
      lastName: lastNameValue,
      active: activeValue,
      email: emailValue,
      password: passwordValue,
      role: roleValue
    });
  }

  const handleSubmit = (e) => {
    console.log(options);
    e.preventDefault();
    fetch(options.url, options).then(async (response) => {
      const res = await response.json();
      console.log(response.message);
      if (response.status == 201 || response.status == 200) {
        setContentFeedbackModal({ title: res.message, description: 'Request done!' });
      }
      setContentFeedbackModal({ title: res.message, description: 'There has been an error!' });
      setTimeout(() => {
        window.location = '/super-admins';
      }, 2000);
    });
  };

  const handleCancel = () => {
    window.location = '/super-admins';
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.container}>
        <h1>Information</h1>
        <div>
          <label>First Name</label>
          <Input
            name="firstName"
            type="text"
            value={nameValue}
            placeholder="Write your first name"
            onChange={onChangeNameInput}
            required
          />
          <label>Last Name</label>
          <Input
            name="lastName"
            type="text"
            value={lastNameValue}
            placeholder="Write your last name"
            onChange={onChangeLastNameInput}
            required
          />
          <label>Email</label>
          <Input
            name="email"
            type="text"
            value={emailValue}
            placeholder="Write your email"
            onChange={onChangeEmailInput}
            required
          />
          <label>Password</label>
          <Input
            name="password"
            type="text"
            value={passwordValue}
            placeholder="Write your password"
            onChange={onChangePasswordInput}
            required
          />
          <label>Role</label>
          <select value={roleValue} onChange={onChangeRoleInput}>
            <option defaultValue=""> Select an option </option>
            <option value="SA"> Superadmin </option>
          </select>
          <label>Status</label>
          <select value={activeValue} onChange={onChangeActiveInput}>
            <option defaultValue=""> Select an option </option>
            <option value="true"> Active </option>
            <option value="false"> Inactive </option>
          </select>
          <div className={styles.buttoncontainer}>
            <button
              type="submit"
              className={styles.submitBtn}
              onClick={() => changeVisibilityFeedbackModal('block')}
            >
              Submit
            </button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </form>
      <FeedbackModal
        feedbackTitle={contentFeedbackModal.title}
        feedbackContent={contentFeedbackModal.description}
      />
    </div>
  );
};

export default Form;
