// import FeedbackMessage from 'Components/Shared/FeedbackMessage';
// import Modal from 'Components/Shared/Modal';
import styles from './form.module.css';
import Loader from 'Components/Shared/Preloader';
// import { showFeedbackMessage } from 'redux/employees/actions';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Button from 'Components/Shared/Button';
import Input from 'Components/Shared/Input/InputText';
import employeesValidation from 'validations/employees';
// import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const Form = () => {
  // const dispatch = useDispatch();
  const isPending = useSelector((state) => state.employees.isPending);
  // const feedbackInfo = useSelector((state) => state.employees.infoForFeedback);
  // const showFeedback = useSelector((state) => state.employees.showFeedbackMessage);
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(employeesValidation)
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <img
        className={styles.loginImg}
        src="https://media.istockphoto.com/photos/computer-monitor-on-an-office-desk-with-equipment-picture-id814564524?b=1&k=20&m=814564524&s=170667a&w=0&h=FahLg9zTUDG7gx5hZjq6D9I-FI6jwV7CDSx7-2N1Bqw="
      ></img>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
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
          label="Password"
          register={register}
          id="password"
          type="password"
          placeholder="Change your password"
          error={errors.password?.message}
          name="password"
          required
        />
        <div className={styles.submitButton}>
          <Button type="Submit" label="Login" />
        </div>
      </form>
      {/* <Modal
        isOpen={showFeedback}
        handleClose={() => {
          dispatch(showFeedbackMessage(!showFeedback));
        }}
      >
        <FeedbackMessage infoForFeedback={feedbackInfo} />
      </Modal> */}
      {isPending && <Loader />}
    </div>
  );
};

export default Form;
