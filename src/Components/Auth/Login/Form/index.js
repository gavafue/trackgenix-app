import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useHistory } from 'react-router-dom';
import styles from './form.module.css';
import Preloader from 'Components/Shared/Preloader';
import Input from 'Components/Shared/Input/InputText';
import Button from 'Components/Shared/Button';
import loginValidation from 'validations/login';
import FeedbackMessage from 'Components/Shared/FeedbackMessage';
import Modal from 'Components/Shared/Modal';
import { showFeedbackMessage } from 'redux/employees/actions';
import { useDispatch } from 'react-redux';
import { login } from 'redux/auth/thunks';

const Form = () => {
  const dispatch = useDispatch();
  const isPending = useSelector((state) => state.auth.isPending);
  const feedbackInfo = useSelector((state) => state.auth.infoForFeedback);
  const showFeedback = useSelector((state) => state.auth.showFeedbackMessage);
  const status = useSelector((state) => state.auth?.authenticated?.data?.active) || false;
  const history = useHistory();
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(loginValidation)
  });

  const onSubmit = (credentials) => {
    dispatch(login(credentials)).then((response) => {
      if (response) {
        switch (response.payload?.role) {
          case 'EMPLOYEE':
            return history.push(status ? '/employee' : '/accountinactive');
          case 'ADMIN':
            return history.push(status ? '/admin' : '/accountinactive');
          case 'SUPERADMIN':
            return history.push('/superadmin');
          default:
            break;
        }
      }
    });
  };

  return (
    <div className={styles.container}>
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
          placeholder="Enter your email"
          error={errors.email?.message}
          name="email"
          required
        />
        <Input
          label="Password"
          register={register}
          id="password"
          type="password"
          placeholder="Enter your password"
          error={errors.password?.message}
          name="password"
          required
        />
        <div className={styles.submitButton}>
          <Button type="Submit" label="Login" />
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
      {isPending && <Preloader />}
    </div>
  );
};

export default Form;
