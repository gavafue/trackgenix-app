import { useSelector, useDispatch } from 'react-redux';
import { showFeedbackMessage } from '../../../redux/employees/actions';
import { editEmployee, postEmployee } from '../../../redux/employees/thunks';
import { appendErrors, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
// import { useHistory } from 'react-router-dom';
import styles from './form.module.css';
import SharedForm from '../../Shared/Form';
import Preloader from '../../Shared/Preloader';
import Input from '../../Shared/Input/InputText';
import Modal from '../../Shared/Modal';
import FeedbackMessage from '../../Shared/FeedbackMessage';
import validations from 'Components/Shared/validations';

const Form = () => {
  const dispatch = useDispatch();
  const isPending = useSelector((state) => state.employees.isPending);
  const feedbackInfo = useSelector((state) => state.employees.infoForFeedback);
  const showFeedback = useSelector((state) => state.employees.showFeedbackMessage);
  const employeeSelected = useSelector((state) => state.employees.employeeSelected) || NaN;
  const isEmployeeSelected = Boolean(Object.keys(employeeSelected).length);
  const URL = process.env.REACT_APP_API_URL;
  // const history = useHistory();
  const title = isEmployeeSelected
    ? `Update ${employeeSelected.firstName} ${employeeSelected.lastName}'s data`
    : 'Add Employee';

  const onSubmit = () => {
    const options = {
      method: isEmployeeSelected ? 'PUT' : 'POST',
      url: isEmployeeSelected ? `${URL}/employees/${employeeSelected._id}` : `${URL}/employees`,
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        firstName: employeeSelected?.firstName,
        lastName: employeeSelected?.lastName,
        email: employeeSelected?.email,
        country: employeeSelected?.country,
        city: employeeSelected?.city,
        zip: employeeSelected?.zip,
        phone: employeeSelected?.phone,
        birthDate: employeeSelected?.birthDate,
        photo: employeeSelected?.photo,
        password: employeeSelected?.password,
        active: employeeSelected?.active
      })
    };
    isEmployeeSelected ? dispatch(editEmployee(options)) : dispatch(postEmployee(options));
  };

  const {
    handleSubmit,
    register
    // formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(validations)
  });

  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <SharedForm onSubmit={handleSubmit(onSubmit)}>
        <Input
          className={styles.input}
          id="first-name"
          label="First Name"
          name="first-name"
          type="text"
          placeholder="Write your name."
          register={register}
          error={appendErrors.name?.message}
          value={employeeSelected?.firstName}
          required
        />
        <Input
          label="Last Name"
          name="last-name"
          id="last-name"
          type="text"
          placeholder="Write your last name."
          register={register}
          error={appendErrors.name?.message}
          value={employeeSelected?.lastName}
          required
        />
        <Input
          label="E-mail"
          name="email"
          id="email"
          type="email"
          placeholder="Write your email."
          register={register}
          error={appendErrors.name?.message}
          value={employeeSelected?.email}
          required
        />
        <Input
          label="Password"
          name="password"
          id="password"
          type="password"
          placeholder="Write your password."
          register={register}
          error={appendErrors.name?.message}
          value={employeeSelected?.password}
          required
        />
        <Input
          label="Date of birth"
          name="birthday"
          id="birthday"
          type="date"
          placeholder="Write your birthday on format dd/mm/yyyy"
          register={register}
          error={appendErrors.name?.message}
          value={employeeSelected?.birthDate?.slice(0, 10)}
          required
        />
        <Input
          label="Phone"
          name="phone"
          id="phone"
          type="tel"
          placeholder="Write your telephone."
          register={register}
          error={appendErrors.name?.message}
          value={employeeSelected?.phone}
          required
        />
        <Input
          label="Country"
          name="country"
          id="country"
          type="text"
          placeholder="Write your country."
          register={register}
          error={appendErrors.name?.message}
          value={employeeSelected?.country}
          required
        />
        <Input
          label="City"
          name="city"
          id="city"
          type="text"
          placeholder="Write your city."
          register={register}
          error={appendErrors.name?.message}
          value={employeeSelected?.city}
          required
        />
        <Input
          label="Postal Code"
          name="ZIP"
          id="ZIP"
          type="text"
          placeholder="Write your postal code."
          register={register}
          error={appendErrors.name?.message}
          value={employeeSelected?.zip}
          required
        />
        <Input
          label="Profile picture"
          name="profile-picture"
          id="profile-picture"
          type="text"
          placeholder="Write your profile picture url."
          register={register}
          error={appendErrors.name?.message}
          value={employeeSelected?.photo}
          required
        />
      </SharedForm>
      <Modal
        isOpen={showFeedback}
        handleClose={() => {
          dispatch(showFeedbackMessage(!showFeedback));
          // history.goBack();
        }}
      >
        <FeedbackMessage infoForFeedback={feedbackInfo} />
      </Modal>
      {isPending && <Preloader />}
    </div>
  );
};

export default Form;
