import { useSelector, useDispatch } from 'react-redux';
import { showFeedbackMessage } from 'redux/employees/actions';
import { editEmployee, postEmployee } from 'redux/employees/thunks';
import { appendErrors, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
// import { useHistory } from 'react-router-dom';
import styles from './form.module.css';
import SharedForm from 'Components/Shared/Form';
import Preloader from 'Components/Shared/Preloader';
import Input from 'Components/Shared/Input/InputText';
import Select from 'Components/Shared/Input/InputSelect';
import Modal from 'Components/Shared/Modal';
import FeedbackMessage from 'Components/Shared/FeedbackMessage';
import validations from 'Components/Shared/validations';

const Form = () => {
  const dispatch = useDispatch();
  const isPending = useSelector((state) => state.employees.isPending);
  const feedbackInfo = useSelector((state) => state.employees.infoForFeedback);
  const showFeedback = useSelector((state) => state.employees.showFeedbackMessage);
  const employeeSelected = useSelector((state) => state.employees.employeeSelected) || NaN;
  const isEmployeeSelected = Boolean(Object.keys(employeeSelected).length);
  // const URL = process.env.REACT_APP_API_URL;
  // const history = useHistory();
  const title = isEmployeeSelected
    ? `Update ${employeeSelected.firstName} ${employeeSelected.lastName}'s data`
    : 'Add Employee';

  const arrayToMapActive = [
    { id: true, optionContent: 'Active' },
    { id: false, optionContent: 'Inactive' }
  ];

  const onSubmit = (data) => {
    // const options = {
    //   method: isEmployeeSelected ? 'PUT' : 'POST',
    //   url: isEmployeeSelected ? `${URL}/employees/${employeeSelected._id}` : `${URL}/employees`,
    //   headers: {
    //     'Content-type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     firstName: employeeSelected?.firstName,
    //     lastName: employeeSelected?.lastName,
    //     email: employeeSelected?.email,
    //     country: employeeSelected?.country,
    //     city: employeeSelected?.city,
    //     zip: employeeSelected?.zip,
    //     phone: employeeSelected?.phone,
    //     birthDate: employeeSelected?.birthDate,
    //     photo: employeeSelected?.photo,
    //     password: employeeSelected?.password,
    //     active: employeeSelected?.active
    //   })
    // };
    console.log(data, errors /*, options*/);
    isEmployeeSelected
      ? dispatch(editEmployee(JSON.stringify(data)))
      : dispatch(postEmployee(JSON.stringify(data)));
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
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
          id="firstName"
          label="First Name"
          name="firstName"
          type="text"
          placeholder="Write your name."
          register={register}
          error={appendErrors.firstName?.message}
          value={employeeSelected?.firstName}
          required
        />
        <Input
          label="Last Name"
          name="lastName"
          id="lastName"
          type="text"
          placeholder="Write your last name."
          register={register}
          error={appendErrors.lastName?.message}
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
          error={appendErrors.email?.message}
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
          error={appendErrors.password?.message}
          value={employeeSelected?.password}
          required
        />
        <Input
          label="Date of birth"
          name="birthDate"
          id="birthDate"
          type="date"
          placeholder="Write your birthday on format dd/mm/yyyy"
          register={register}
          error={appendErrors.birthDate?.message}
          value={employeeSelected?.birthDate?.slice(0, 10)} /*error on submit*/
          required
        />
        <Input
          label="Phone"
          name="phone"
          id="phone"
          type="tel"
          placeholder="Write your telephone."
          register={register}
          error={appendErrors.phone?.message}
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
          error={appendErrors.country?.message}
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
          error={appendErrors.city?.message}
          value={employeeSelected?.city}
          required
        />
        <Input
          label="Postal Code"
          name="zip"
          id="zip"
          type="text"
          placeholder="Write your postal code."
          register={register}
          error={appendErrors.zip?.message}
          value={employeeSelected?.zip}
          required
        />
        <Input
          label="Profile picture"
          name="photo"
          id="photo"
          type="text"
          placeholder="Write your profile picture url."
          register={register}
          error={appendErrors.photo?.message}
          value={employeeSelected?.photo} /*error on submit*/
          required
        />
        <Select
          label="Active"
          arrayToMap={arrayToMapActive}
          name="active"
          id="active"
          placeholder="Enter employee's status"
          register={register}
          error={appendErrors.active?.message}
          value={employeeSelected.active}
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
