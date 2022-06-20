import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import styles from './form.module.css';
import Loader from '../../Shared/Preloader';
import SharedForm from '../../Shared/Form';
import Input from '../../Shared/Input/InputText';
import Modal from '../../Shared/Modal';
import FeedbackMessage from '../../Shared/FeedbackMessage';
import { showFeedbackMessage } from '../../../redux/employees/actions';
import { editEmployee, postEmployee } from '../../../redux/employees/thunks';
import employeesValidation from 'validations/employees';

const Form = () => {
  const dispatch = useDispatch();
  const isPending = useSelector((state) => state.employees.isPending);
  const feedbackInfo = useSelector((state) => state.employees.infoForFeedback);
  const showFeedback = useSelector((state) => state.employees.showFeedbackMessage);
  const employeeSelected = useSelector((state) => state.employees.employeeSelected);
  const isEmployeeSelected = Boolean(Object.keys(employeeSelected).length);
  const URL = process.env.REACT_APP_API_URL;
  const history = useHistory();
  const title = isEmployeeSelected
    ? `Update ${employeeSelected.firstName} ${employeeSelected.lastName}'s data`
    : 'Add Employee';

  const onSubmit = (data) => {
    const options = {
      method: isEmployeeSelected ? 'PUT' : 'POST',
      url: isEmployeeSelected ? `${URL}/employees/${employeeSelected._id}` : `${URL}/employees`,
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
        active: false
      })
    };
    isEmployeeSelected ? dispatch(editEmployee(options)) : dispatch(postEmployee(options));
  };

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(employeesValidation)
  });

  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <SharedForm onSubmit={handleSubmit(onSubmit)}>
        <Input
          className={styles.input}
          id="firstName"
          label="First Name"
          name="firstName"
          type="text"
          placeholder="Write your name."
          register={register}
          error={errors.firstName?.message}
          value={employeeSelected ? employeeSelected.firstName : ''}
          required
        />
        <Input
          label="Last Name"
          name="last-name"
          id="last-name"
          type="text"
          placeholder="Write your last name."
          register={register}
          error={errors.lastName?.message}
          value={employeeSelected ? employeeSelected.lastName : ''}
          required
        />
        <Input
          label="E-mail"
          name="email"
          id="email"
          type="email"
          placeholder="Write your email."
          register={register}
          error={errors.email?.message}
          value={employeeSelected ? employeeSelected.email : ''}
          required
        />
        <Input
          label="Password"
          name="password"
          id="password"
          type="password"
          placeholder="Write your password."
          register={register}
          error={errors.password?.message}
          value={employeeSelected ? employeeSelected.password : ''}
          required
        />
        <Input
          label="Date of birth"
          name="birthDate"
          id="birthDate"
          type="date"
          placeholder="Write your birthday on format dd/mm/yyyy"
          register={register}
          error={errors.birthDate?.message}
          value={employeeSelected ? employeeSelected.birthDate?.slice(0, 10) : ''}
          required
        />
        <Input
          label="Phone"
          name="phone"
          id="phone"
          type="tel"
          placeholder="Write your telephone."
          register={register}
          error={errors.phone?.message}
          value={employeeSelected ? employeeSelected.phone : ''}
          required
        />
        <Input
          label="Country"
          name="country"
          id="country"
          type="text"
          placeholder="Write your country."
          register={register}
          error={errors.country?.message}
          value={employeeSelected ? employeeSelected.country : ''}
          required
        />
        <Input
          label="City"
          name="city"
          id="city"
          type="text"
          placeholder="Write your city."
          register={register}
          error={errors.city?.message}
          value={employeeSelected ? employeeSelected.city : ''}
          required
        />
        <Input
          label="Postal Code"
          name="zip"
          id="zip"
          type="text"
          placeholder="Write your postal code."
          register={register}
          error={errors.zip?.message}
          value={employeeSelected ? employeeSelected.zip : ''}
          required
        />
        <Input
          label="Profile picture"
          name="photo"
          id="photo"
          type="text"
          placeholder="Write your profile picture url."
          register={register}
          error={errors.photo?.message}
          value={employeeSelected ? employeeSelected.photo : ''}
          required
        />
      </SharedForm>
      <Modal
        isOpen={showFeedback}
        handleClose={() => {
          dispatch(showFeedbackMessage(!showFeedback));
          history.goBack();
        }}
      >
        <FeedbackMessage infoForFeedback={feedbackInfo} />
      </Modal>
      {isPending && <Loader />}
    </div>
  );
};

export default Form;
