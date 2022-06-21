import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import styles from './form.module.css';
import Preloader from '../../Shared/Preloader';
import SharedForm from '../../Shared/Form';
import Input from '../../Shared/Input/InputText';
import Select from '../../Shared/Input/InputSelect';
import Modal from '../../Shared/Modal';
import FeedbackMessage from '../../Shared/FeedbackMessage';
import { editSuperAdmin, postSuperAdmin } from '../../../redux/superadmin/thunks';
import { showFeedbackMessage } from '../../../redux/superadmin/actions';
import superadminsValidation from 'validations/superadmins';

const Form = () => {
  const URL = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const isPending = useSelector((state) => state.superadmins.pending);
  const infoForFeedback = useSelector((state) => state.superadmins.infoForFeedback);
  const showFeedback = useSelector((state) => state.superadmins.showFeedbackMessage);
  const selectedSuperadmin = useSelector((state) => state.superadmins.selectedSuperadmin);
  const isSuperadminSelected = Boolean(Object.keys(selectedSuperadmin).length);
  const title = isSuperadminSelected ? 'Update Super Admin' : 'Add Super Admin';

  const arrayToMapRole = [{ id: 'SA', optionContent: 'SuperAdmin' }];
  const arrayToMapStatus = [
    { id: true, optionContent: 'Active' },
    { id: false, optionContent: 'Inactive' }
  ];

  const onSubmit = (data) => {
    const options = {
      method: isSuperadminSelected ? 'PUT' : 'POST',
      url: isSuperadminSelected
        ? `${URL}/super-admin/${selectedSuperadmin._id}`
        : `${URL}/super-admin`,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        email: data.email,
        role: data.role,
        active: data.active
      })
    };
    isSuperadminSelected ? dispatch(editSuperAdmin(options)) : dispatch(postSuperAdmin(options));
  };

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(superadminsValidation)
  });

  return (
    <div className={styles.container}>
      {isPending && <Preloader />}
      <h2>{title}</h2>
      <SharedForm onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Name"
          id="firstName"
          name="firstName"
          type="text"
          placeholder="Write your first name"
          register={register}
          error={errors.firstName?.message}
          value={selectedSuperadmin ? selectedSuperadmin.firstName : ''}
          required
        />
        <Input
          label="Last Name"
          name="lastName"
          id="lastName"
          type="text"
          placeholder="Write your last name"
          register={register}
          error={errors.lastName?.message}
          value={selectedSuperadmin ? selectedSuperadmin.lastName : ''}
          required
        />
        <Input
          label="Email"
          name="email"
          id="email"
          type="email"
          placeholder="Write your email"
          register={register}
          error={errors.email?.message}
          value={selectedSuperadmin ? selectedSuperadmin.email : ''}
          required
        />
        <Input
          label="Password"
          name="password"
          id="password"
          type="password"
          placeholder="Write your password"
          register={register}
          error={errors.password?.message}
          value={selectedSuperadmin ? selectedSuperadmin.password : ''}
          required
        />
        <Select
          label="Active"
          id="active"
          name="active"
          placeholder="Choose Status"
          arrayToMap={arrayToMapStatus}
          register={register}
          error={errors.active?.message}
          value={selectedSuperadmin ? selectedSuperadmin.active : ''}
          required
        />
        <Select
          label="Role"
          id="role"
          name="role"
          arrayToMap={arrayToMapRole}
          register={register}
          error={errors.role?.message}
          value={'SA'}
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
