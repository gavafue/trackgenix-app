import { useEffect, useState } from 'react';
import styles from './form.module.css';
import Input from '../input/input.js';

const Form = () => {
  const [nameValue, setNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [activeValue, setActiveValue] = useState('');
  const [roleValue, setRoleValue] = useState('');

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
      console.log(res.message);
      if (response.status == 201 || response.status == 200) {
        setTimeout(() => {
          window.location = '/super-admin';
          console.log(res.message);
        }, 3000);
      } else {
        alert('alert');
      }
    });
  };

  return (
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
        <Input
          name="role"
          type="text"
          value={roleValue}
          placeholder="Select role"
          onChange={onChangeRoleInput}
          required
        />
        <label>Status</label>
        <select value={activeValue} onChange={onChangeActiveInput}>
          <option value="true"> Active </option>
          <option value="false"> Inactive </option>
        </select>
        <button type="submit"> Save </button>
        <button>Cancel</button>
      </div>
    </form>
  );
};

export default Form;
