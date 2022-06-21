import FeedbackMessage from 'Components/Shared/FeedbackMessage';
import Modal from 'Components/Shared/Modal';
import styles from './form.module.css';
import Loader from 'Components/Shared/Preloader';
import { useSelector, useDispatch } from 'react-redux';
import { showFeedbackMessage } from 'redux/employees/actions';
import { editEmployee } from 'redux/employees/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useEffect } from 'react';
import Button from 'Components/Shared/Button';
import Input from 'Components/Shared/Input/InputText';
import employeesValidation from 'validations/employees';

const Form = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(employeesValidation)
  });
  const dispatch = useDispatch();
  const isPending = useSelector((state) => state.employees.isPending);
  const feedbackInfo = useSelector((state) => state.employees.infoForFeedback);
  const showFeedback = useSelector((state) => state.employees.showFeedbackMessage);
  const employeeLogged = useSelector((state) => state.employees.employeeLogged);
  useEffect(() => {
    reset({
      firstName: employeeLogged.firstName,
      lastName: employeeLogged.lastName,
      email: employeeLogged.email,
      country: employeeLogged.country,
      city: employeeLogged.city,
      zip: employeeLogged.zip,
      phone: employeeLogged.phone,
      birthDate: employeeLogged.birthDate,
      photo: employeeLogged.photo,
      password: employeeLogged.password,
      active: employeeLogged.active
    });
  }, [employeeLogged]);
  const URL = process.env.REACT_APP_API_URL;

  const onSubmit = (data) => {
    console.log(data);
    const options = {
      method: 'PUT',
      url: `${URL}/employees/${employeeLogged._id}`,
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
        password: data.password
      })
    };
    dispatch(editEmployee(options));
  };
  return (
    <div className={styles.container}>
      <img className={styles.profileImg} src={employeeLogged.photo}></img>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.firstColumn}>
          <Input
            label="First Name"
            register={register}
            id="firstName"
            type="text"
            placeholder="Write your name."
            error={errors.firstName?.message}
            name="firstName"
            required
          />
          <Input
            label="Last Name"
            register={register}
            id="lastName"
            type="text"
            placeholder="Write your last name."
            error={errors.lastName?.message}
            name="lastName"
            required
          />
          <Input
            label="Email"
            register={register}
            id="email"
            type="text"
            placeholder="Write your email"
            error={errors.email?.message}
            name="email"
            required
          />
          <Input
            label="Country"
            register={register}
            id="country"
            type="text"
            placeholder="Write your Country"
            error={errors.country?.message}
            name="country"
            required
          />
          <Input
            label="City"
            register={register}
            id="city"
            type="text"
            placeholder="Write your City"
            error={errors.city?.message}
            name="city"
            required
          />
        </div>
        <div className={styles.secondColumn}>
          <Input
            label="Postal Code"
            register={register}
            id="zip"
            type="text"
            placeholder="Write your Postal Code"
            error={errors.zip?.message}
            name="zip"
            required
          />
          <Input
            label="Phone"
            register={register}
            id="phone"
            type="tel"
            placeholder="Write your Phone"
            error={errors.phone?.message}
            name="phone"
            required
          />
          <Input
            label="Birth Date"
            register={register}
            id="birthDate"
            type="text"
            placeholder="Write your birth date"
            error={errors.birthDate?.message}
            name="birthDate"
            required
          />
          <Input
            label="Password"
            register={register}
            id="password"
            type="password"
            placeholder="Change your password"
            error={errors.password?.message}
            name="password"
            required
          />
          <Input
            label="Photo"
            register={register}
            id="photo"
            type="text"
            placeholder="Change your profile picture"
            error={errors.photo?.message}
            name="photo"
            required
          />
          <div className={styles.submitButton}>
            <Button type="submit" label="Submit" />
          </div>
        </div>
      </form>
      <Modal
        isOpen={showFeedback}
        handleClose={() => {
          dispatch(showFeedbackMessage(!showFeedback));
        }}
      >
        <FeedbackMessage infoForFeedback={feedbackInfo} />
      </Modal>
      {isPending && <Loader />}
    </div>
  );
};

export default Form;
