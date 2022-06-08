import { useEffect, useState } from 'react';
import styles from './form.module.css';
import Input from '../../Shared/Input/InputText';
import FeedbackModal from '../FeedbackModal';

const Form = () => {
  const URL = process.env.REACT_APP_API_URL;
  const [nameValue, setNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [activeValue, setActiveValue] = useState('');
  const [roleValue, setRoleValue] = useState('');
  const [contentFeedbackModal, setContentFeedbackModal] = useState({});
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

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
  const superAdminId = params.get('superadminId');

  const options = {
    method: superAdminId ? 'PUT' : 'POST',
    url: `${URL}/super-admin/${superAdminId ? superAdminId : ''}`,
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

  useEffect(() => {
    if (superAdminId) {
      fetch(`${URL}/super-admin/${superAdminId}`)
        .then((response) => response.json())
        .then((data) => {
          setNameValue(data.data.firstName);
          setLastNameValue(data.data.lastName);
          setEmailValue(data.data.email);
          setPasswordValue(data.data.password);
          setActiveValue(data.data.active);
          setRoleValue(data.data.role);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      const res = await fetch(options.url, options);
      const data = await res.json();
      if (res.status == 201 || res.status == 200) {
        setContentFeedbackModal({ title: 'Request done!', description: data.message });
        setShowFeedbackModal(true);
      } else {
        setContentFeedbackModal({ title: 'Something went wrong', description: data.message });
        setShowFeedbackModal(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    window.location = '/super-admin';
  };

  return (
    <div>
      <form className={styles.container} onSubmit={onSubmit}>
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
            <option value="SA"> SuperAdmin </option>
          </select>
          <label>Status</label>
          <select value={activeValue} onChange={onChangeActiveInput}>
            <option defaultValue=""> Select an option </option>
            <option value="true"> Active </option>
            <option value="false"> Inactive </option>
          </select>
          <div className={styles.buttoncontainer}>
            <button type="submit" className={styles.submitBtn}>
              Submit
            </button>
            <button type="submit" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </form>
      {showFeedbackModal && (
        <FeedbackModal
          feedbackTitle={contentFeedbackModal.title}
          messageContent={contentFeedbackModal.description}
          setShowFeedbackModal={setShowFeedbackModal}
          showFeedbackModal={showFeedbackModal}
        />
      )}
    </div>
  );
};

export default Form;
