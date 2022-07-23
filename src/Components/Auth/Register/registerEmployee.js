import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';
import styles from './registerForm.module.css';
import Preloader from 'Components/Shared/Preloader';
import SharedForm from 'Components/Shared/Form';
import Input from 'Components/Shared/Input/InputText';
import Select from 'Components/Shared/Input/InputSelect';
import Modal from 'Components/Shared/Modal';
import FeedbackMessage from 'Components/Shared/FeedbackMessage';
import { showFeedbackMessage } from 'redux/employees/actions';
import { postEmployee } from 'redux/employees/thunks';
import employeesValidation from 'validations/employees';

const RegisterEmployee = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userLoggedRole = useSelector((state) => state.auth.authenticated.role);
  const feedbackInfo = useSelector((state) => state.employees?.infoForFeedback);
  const showFeedback = useSelector((state) => state.employees?.showFeedbackMessage);
  const isPending = useSelector((state) => state.employees?.isPending);
  const URL = process.env.REACT_APP_API_URL;
  const arrayToMapActive = [
    { id: true, optionContent: 'Active' },
    { id: false, optionContent: 'Inactive' }
  ];

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(employeesValidation)
  });

  const onSubmit = (data) => {
    const options = {
      method: 'POST',
      url: `${URL}/register/employee`,
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        country: data.country,
        city: data.city,
        zip: data.zip,
        phone: data.phone,
        birthDate: data.birthDate,
        photo: data.photo,
        password: data.password,
        active: userLoggedRole === 'ADMIN' ? data.active : true
      })
    };
    dispatch(postEmployee(options));
  };

  useEffect(() => {
    reset({
      active: true
    });
  }, []);

  return (
    <section className={styles.container}>
      <SharedForm
        onSubmit={handleSubmit(onSubmit)}
        header={userLoggedRole === 'ADMIN' ? 'Register employee' : 'Sign up'}
      >
        <Input
          className={styles.input}
          id="firstName"
          label="First Name"
          name="firstName"
          type="text"
          placeholder={`Enter ${userLoggedRole === 'ADMIN' ? `employee's` : `your`} first name`}
          register={register}
          error={errors.firstName?.message}
          required
        />
        <Input
          label="Last Name"
          name="lastName"
          id="lastName"
          type="text"
          placeholder={`Enter ${userLoggedRole === 'ADMIN' ? `employee's` : `your`} last name`}
          register={register}
          error={errors.lastName?.message}
          required
        />
        <Input
          label="E-mail"
          name="email"
          id="email"
          type="email"
          placeholder={`Enter ${userLoggedRole === 'ADMIN' ? `employee's` : `your`} email`}
          register={register}
          error={errors.email?.message}
          required
        />
        <Input
          label="Password"
          name="password"
          id="password"
          type="password"
          placeholder={`Enter ${userLoggedRole === 'ADMIN' ? `employee's` : `a`} password`}
          register={register}
          error={errors.password?.message}
          required
        />
        <Input
          label="Date of birth"
          name="birthDate"
          id="birthDate"
          type="date"
          placeholder={`Enter ${userLoggedRole === 'ADMIN' ? `employee's` : `your`} date of birth`}
          register={register}
          error={errors.birthDate?.message}
          required
        />
        <Input
          label="Phone"
          name="phone"
          id="phone"
          type="tel"
          placeholder={`Enter ${userLoggedRole === 'ADMIN' ? `employee's` : `your`} phone number`}
          register={register}
          error={errors.phone?.message}
          required
        />
        <Input
          label="Country"
          name="country"
          id="country"
          type="text"
          placeholder={`Enter ${
            userLoggedRole === 'ADMIN' ? `employee's` : `your`
          } current country`}
          register={register}
          error={errors.country?.message}
          required
        />
        <Input
          label="City"
          name="city"
          id="city"
          type="text"
          placeholder={`Enter ${userLoggedRole === 'ADMIN' ? `employee's` : `your`} current city`}
          register={register}
          error={errors.city?.message}
          required
        />
        <Input
          label="Postal Code"
          name="zip"
          id="zip"
          type="text"
          placeholder={`Enter ${userLoggedRole === 'ADMIN' ? `employee's` : `your`} postal code`}
          register={register}
          error={errors.zip?.message}
          required
        />
        <Input
          label="Profile picture"
          name="photo"
          id="photo"
          type="text"
          placeholder={`Enter ${
            userLoggedRole === 'ADMIN' ? `employee's` : `a`
          } profile picture url`}
          register={register}
          error={errors.photo?.message}
          required
        />
        {userLoggedRole == 'ADMIN' && (
          <Select
            label="Active"
            arrayToMap={arrayToMapActive}
            name="active"
            id="active"
            placeholder="Enter employee's status"
            register={register}
            error={errors.active?.message}
            hidden={userLoggedRole === 'ADMIN' ? false : true}
            required
          />
        )}
      </SharedForm>
      <Modal
        isOpen={showFeedback}
        handleClose={() => {
          dispatch(showFeedbackMessage(!showFeedback));
          if (feedbackInfo.title !== 'Something went wrong') {
            history.goBack();
          }
        }}
      >
        <FeedbackMessage infoForFeedback={feedbackInfo} />
      </Modal>
      {isPending && <Preloader />}
    </section>
  );
};

export default RegisterEmployee;
