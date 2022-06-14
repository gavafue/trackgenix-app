import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SharedForm from '../../Shared/Form';
import styles from './form.module.css';
import Input from '../../Shared/Input/InputText';
import Select from '../../Shared/Input/InputSelect';
import Modal from '../../Shared/Modal';
import FeedbackMessage from '../../Shared/FeedbackMessage';
import Preloader from '../../Shared/Preloader';
import { useDispatch, useSelector } from 'react-redux';
import { editSuperAdmin, postSuperAdmin } from '../../../redux/superadmin/thunks';
import { showFeedbackMessage } from '../../../redux/superadmin/actions';

const Form = () => {
  const URL = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const infoForFeedback = useSelector((state) => state.tasks.infoForFeedback);
  const showFeedback = useSelector((state) => state.tasks.showFeedbackMessage);

  const [nameValue, setNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [activeValue, setActiveValue] = useState('');
  const [roleValue, setRoleValue] = useState('');
  const [showPreloader, setShowPreloader] = useState(false);

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
          setShowPreloader(false);
        })
        .catch((error) => console.log(error));
    }
  }, []);
  const superAdminId = useParams();
  const title = superAdminId.id ? 'Update Super Admin' : 'Add Super Admin';
  const onSubmit = (event) => {
    event.preventDefault();
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
    superAdminId ? dispatch(editSuperAdmin(options)) : dispatch(postSuperAdmin(options));
  };
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <SharedForm onSubmit={onSubmit}>
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
      </SharedForm>
      <Modal
        isOpen={showFeedbackMessage}
        handleClose={() => {
          showFeedbackMessage(!showFeedback);
        }}
      >
        <FeedbackMessage infoForFeedback={infoForFeedback} />
      </Modal>
      {showPreloader && <Preloader />}
    </div>
  );
};

export default Form;
