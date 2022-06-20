import { useSelector, useDispatch } from 'react-redux';
import { showFeedbackMessage } from 'redux/admins/actions';
import { editAdmin, postAdmin } from 'redux/admins/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import styles from './form.module.css';
import Preloader from 'Components/Shared/Preloader';
import SharedForm from 'Components/Shared/Form';
import Input from 'Components/Shared/Input/InputText';
import Select from 'Components/Shared/Input/InputSelect';
import Modal from 'Components/Shared/Modal';
import FeedbackMessage from 'Components/Shared/FeedbackMessage';
import validations from 'Components/Shared/validations';

const Form = () => {
  const dispatch = useDispatch();
  const isPending = useSelector((state) => state.admins.isPending);
  const feedbackInfo = useSelector((state) => state.admins.infoForFeedback);
  const showFeedback = useSelector((state) => state.admins.showFeedbackMessage);
  const adminSelected = useSelector((state) => state.admins.adminSelected);
  const isAdminSelected = Object.keys(adminSelected).length;

  const arrayToMapGender = [
    { id: 'male', optionContent: 'Male' },
    { id: 'female', optionContent: 'Female' },
    { id: 'other', optionContent: 'Other' }
  ];

  const arrayToMapActive = [
    { id: true, optionContent: 'Active' },
    { id: false, optionContent: 'Inactive' }
  ];

  const onSubmit = (data) => {
    const options = {
      method: isAdminSelected ? 'PUT' : 'POST',
      url: isAdminSelected
        ? `${process.env.REACT_APP_API_URL}/admins/${adminSelected._id}`
        : `${process.env.REACT_APP_API_URL}/admins`,
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        gender: data.gender,
        phone: data.phone,
        dateBirth: data.dateBirth,
        city: data.city,
        zip: data.zip,
        active: data.active
      })
    };
    isAdminSelected ? dispatch(editAdmin(options)) : dispatch(postAdmin(options));
  };

  const title = isAdminSelected
    ? `Editing ${adminSelected.name} ${adminSelected.lastName}'s information`
    : 'Add an Admin';

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(validations)
  });

  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <SharedForm onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Name"
          name="name"
          id="name"
          type="text"
          placeholder="Enter admin's first name"
          register={register}
          error={errors.name?.message}
          value={adminSelected ? adminSelected.name : ''}
          required
        />
        <Input
          label="Last&nbsp;name"
          name="lastName"
          id="lastName"
          type="text"
          placeholder="Enter admin's last name"
          register={register}
          error={errors.lastName?.message}
          value={adminSelected ? adminSelected.lastName : ''}
          required
        />
        <Input
          label="E-mail"
          name="email"
          id="email"
          type="email"
          placeholder="Enter a valid email"
          register={register}
          error={errors.email?.message}
          value={adminSelected ? adminSelected.email : ''}
          required
        />
        <Input
          label="Password"
          name="password"
          id="password"
          type="password"
          placeholder="Enter your password"
          register={register}
          error={errors.password?.message}
          value={adminSelected ? adminSelected.password : ''}
          required
        />
        <Select
          label="Gender"
          name="gender"
          id="gender"
          arrayToMap={arrayToMapGender}
          placeholder="Enter admin's gender"
          register={register}
          error={errors.gender?.message}
          value={adminSelected ? adminSelected.gender : ''}
          required
        />
        <Input
          label="Phone"
          name="phone"
          id="phone"
          type="tel"
          placeholder="Enter admin's phone number"
          register={register}
          error={errors.phone?.message}
          value={adminSelected ? adminSelected.phone : ''}
          required
        />
        <Input
          label="Date&nbsp;of&nbsp;birth"
          name="dateBirth"
          id="dateBirth"
          type="date"
          register={register}
          error={errors.dateBirth?.message}
          value={adminSelected.dateBirth ? adminSelected.dateBirth.slice(0, 10) : ''}
          required
        />
        <Input
          label="City"
          name="city"
          id="city"
          type="text"
          placeholder="Enter admin's city"
          register={register}
          error={errors.city?.message}
          value={adminSelected ? adminSelected.city : ''}
          required
        />
        <Input
          label="Postal&nbsp;code"
          name="zip"
          id="zip"
          type="text"
          placeholder="Enter admin's postal code"
          register={register}
          error={errors.zip?.message}
          value={adminSelected ? adminSelected.zip : ''}
          required
        />
        <Select
          label="Active"
          arrayToMap={arrayToMapActive}
          name="active"
          id="active"
          placeholder="Enter admin's status"
          register={register}
          error={errors.active?.message}
          value={adminSelected ? adminSelected.active : ''}
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
