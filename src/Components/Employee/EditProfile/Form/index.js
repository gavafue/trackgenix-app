import FeedbackMessage from 'Components/Shared/FeedbackMessage';
import Modal from 'Components/Shared/Modal';
import styles from './form.module.css';
import Loader from 'Components/Shared/Preloader';
import { useSelector, useDispatch } from 'react-redux';
import { showFeedbackMessage } from 'redux/employees/actions';
import { editEmployee } from 'redux/employees/thunks';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useEffect } from 'react';
import Button from 'Components/Shared/Button';
import Input from 'Components/Shared/Input/InputText';

const Form = () => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(40).messages({
      'string.min': 'Invalid name, it must not contain less than 3 letters',
      'string.max': 'Invalid name, it must not contain more than 40 letters'
    }),
    lastName: Joi.string().min(3).max(40).messages({
      'string.min': 'Invalid last name, it must not contain less than 3 letters',
      'string.max': 'Invalid last name, it must not contain more than 40 letters'
    }),
    birthDate: Joi.date().greater('1-1-1900').less(new Date()).messages({
      'date.greater': 'You can not get than older',
      'date.less': 'Your birth date can not be tomorrow, you already born'
    }),
    country: Joi.string().min(3).max(60).messages({
      'string.min': 'Invalid country, it must not contain less than 3 letters',
      'string.max': 'Invalid country, it must not contain more than 60 letters'
    }),
    city: Joi.string().min(3).max(60).messages({
      'string.min': 'Invalid city, it must not contain less than 3 letters',
      'string.max': 'Invalid city, it must not contain more than 60 letters'
    }),
    zip: Joi.number().integer().min(1000).max(99999).messages({
      'string.min': 'Invalid zip, it must not contain less than 4 numbers',
      'string.max': 'Invalid zip, it must not contain more than 5 numbers'
    }),
    phone: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .messages({
        'string.pattern': 'Phonenomber must contain 10 numbers, only integers'
      }),
    email: Joi.string().lowercase().messages({
      'string.email': 'Invalid email format. Try again.'
    }),
    password: Joi.string()
      .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
      .messages({
        'string.pattern':
          'Password must be more than 6 char, at least 1 letter and 1 number. Without any symbols.'
      }),
    photo: Joi.string()
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema)
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
      password: employeeLogged.password
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
            value={employeeLogged ? employeeLogged.firstName : ''}
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
            value={employeeLogged ? employeeLogged.lastName : ''}
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
            value={employeeLogged ? employeeLogged.email : ''}
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
            value={employeeLogged ? employeeLogged.country : ''}
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
            value={employeeLogged ? employeeLogged.city : ''}
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
            value={employeeLogged ? employeeLogged.zip : ''}
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
            value={employeeLogged ? employeeLogged.phone : ''}
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
            value={employeeLogged ? employeeLogged.birthDate : ''}
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
            value={employeeLogged ? employeeLogged.password : ''}
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
            value={employeeLogged ? employeeLogged.photo : ''}
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
