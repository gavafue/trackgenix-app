import { useEffect, useState } from 'react';
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
  const selectedItem = useSelector((state) => state.superadmins.selectedItem);
  const isItemSelected = Object.keys(selectedItem).length;
  const isPending = useSelector((state) => state.superadmins.pending);
  const infoForFeedback = useSelector((state) => state.superadmins.infoForFeedback);
  const showFeedback = useSelector((state) => state.superadmins.showFeedbackMessage);

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

  useEffect(() => {
    if (isItemSelected) {
      setNameValue(selectedItem.firstName);
      setLastNameValue(selectedItem.lastName);
      setEmailValue(selectedItem.email);
      setPasswordValue(selectedItem.password);
      setActiveValue(selectedItem.active);
      setRoleValue(selectedItem.role);
    }
  }, []);

  const arrayToMapRole = [{ id: 'SA', optionContent: 'SuperAdmin' }];
  const arrayToMapStatus = [
    { id: true, optionContent: 'True' },
    { id: false, optionContent: 'False' }
  ];

  const title = isItemSelected ? 'Update Super Admin' : 'Add Super Admin';
  const onSubmit = (event) => {
    event.preventDefault();
    const options = {
      method: isItemSelected ? 'PUT' : 'POST',
      url: isItemSelected ? `${URL}/super-admin/${selectedItem._id}` : `${URL}/super-admin`,
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
    isItemSelected ? dispatch(editSuperAdmin(options)) : dispatch(postSuperAdmin(options));
  };
  return (
    <div className={styles.container}>
      {isPending && <Preloader />}
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
          type="password"
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
          label="Active"
          arrayToMap={arrayToMapStatus}
          id="active"
          name="active"
          value={activeValue}
          onChange={onChangeActiveInput}
          placeholder="Choose Status"
          required
        />
      </SharedForm>
      <Modal
        isOpen={showFeedback}
        handleClose={() => {
          dispatch(showFeedbackMessage(!showFeedback));
        }}
      >
        <FeedbackMessage infoForFeedback={infoForFeedback} />
      </Modal>
    </div>
  );
};

export default Form;
