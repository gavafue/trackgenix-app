import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './form.module.css';
import Input from '../../Shared/Input/InputText';
import Select from '../../Shared/Input/InputSelect';
import Modal from '../../Shared/Modal';
import FeedbackMessage from '../../Shared/FeedbackMessage';
import Button from '../../Shared/Button';

const Form = () => {
  const URL = process.env.REACT_APP_API_URL;
  const [nameValue, setNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [activeValue, setActiveValue] = useState('');
  const [roleValue, setRoleValue] = useState('');
  const [infoForFeedback, setInfoForFeedback] = useState({});
  const [showFeedbackMessage, setShowFeedbackMessage] = useState(false);

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

  const arrayToMapRole = [{ id: 'SA', optionContent: 'SuperAdmin' }];
  const arrayToMapStatus = [
    { id: 'true', optionContent: 'Active' },
    { id: 'false', optionContent: 'Inactive' }
  ];
  const superAdminId = useParams();
  const title = superAdminId.id ? 'Update Super Admin' : 'Add Super Admin';

  const options = {
    method: superAdminId.id ? 'PUT' : 'POST',
    url: `${URL}/super-admin/${superAdminId.id ?? ''}`,
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
      fetch(`${URL}/super-admin/${superAdminId.id}`)
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
        setInfoForFeedback({
          title: 'Request done!',
          description: data.message
        });
        setShowFeedbackMessage(true);
      } else {
        setInfoForFeedback({
          title: 'Something went wrong',
          description: data.message
        });
        setShowFeedbackMessage(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <h2>{title}</h2>
        <Input
          id="firstName"
          name="firstName"
          type="text"
          value={nameValue}
          placeholder="Write your first name"
          onChange={onChangeNameInput}
          required
          label="Name"
        />
        <Input
          name="lastName"
          id="lastName"
          type="text"
          value={lastNameValue}
          placeholder="Write your last name"
          onChange={onChangeLastNameInput}
          label="Last Name"
          required
        />
        <Input
          name="email"
          id="email"
          type="text"
          value={emailValue}
          placeholder="Write your email"
          onChange={onChangeEmailInput}
          label="Email"
          required
        />
        <Input
          name="password"
          id="password"
          type="text"
          value={passwordValue}
          placeholder="Write your password"
          onChange={onChangePasswordInput}
          label="Password"
          required
        />
        <Select
          label="Role"
          arrayToMap={arrayToMapRole}
          id="role"
          name="role"
          value={roleValue}
          onChange={onChangeRoleInput}
          placeholder="Choose Role"
          required
        />
        <Select
          label="Status"
          arrayToMap={arrayToMapStatus}
          id="status"
          name="status"
          value={activeValue}
          onChange={onChangeActiveInput}
          placeholder="Choose Status"
          required
        />
        <div className={styles.buttoncontainer}>
          <Button type="submit" label="Submit" theme="secondary" />
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
