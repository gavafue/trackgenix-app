import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Preloader from 'Components/Shared/Preloader';
import Form from 'Components/Shared/Form';
import Input from 'Components/Shared/Input/InputText';
import Select from 'Components/Shared/Input/InputSelect';
import Modal from 'Components/Shared/Modal';
import FeedbackMessage from 'Components/Shared/FeedbackMessage';
import adminsValidation from 'validations/admins';
import { editAdmin } from 'redux/admins/thunks';
import { showFeedbackMessage } from 'redux/admins/actions';
import { joiResolver } from '@hookform/resolvers/joi';

const ProfileForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isPending = useSelector((state) => state.admins.isPending);
  const feedbackInfo = useSelector((state) => state.admins.infoForFeedback);
  const showFeedback = useSelector((state) => state.admins.showFeedbackMessage);
  const adminLogged = useSelector((state) => state.auth.authenticated.data);
  const URL = process.env.REACT_APP_API_URL;
  const arrayToMapGender = [
    { id: 'male', optionContent: 'Male' },
    { id: 'female', optionContent: 'Female' },
    { id: 'other', optionContent: 'Other' }
  ];
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(adminsValidation)
  });
  const onSubmit = (data) => {
    const options = {
      method: 'PUT',
      url: `${URL}/admins/${adminLogged._id}`,
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        gender: data.gender,
        phone: data.phone,
        dateBirth: data.dateBirth,
        city: data.city,
        zip: data.zip,
        active: true
      })
    };
    dispatch(editAdmin(options));
  };
  useEffect(() => {
    reset({
      name: adminLogged?.name,
      lastName: adminLogged?.lastName,
      email: adminLogged?.email,
      gender: adminLogged?.gender,
      city: adminLogged?.city,
      zip: adminLogged?.zip,
      phone: adminLogged?.phone,
      dateBirth: adminLogged?.dateBirth?.slice(0, 10),
      active: true
    });
  }, [adminLogged]);

  return (
    <section>
      <Form onSubmit={handleSubmit(onSubmit)} header="Edit your profile">
        <Input
          label="Name"
          name="name"
          id="name"
          type="text"
          placeholder="Enter your first name"
          register={register}
          error={errors.name?.message}
          required
        />
        <Input
          label="Last&nbsp;name"
          name="lastName"
          id="lastName"
          type="text"
          placeholder="Enter your last name"
          register={register}
          error={errors.lastName?.message}
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
          required
        />
        <Select
          label="Gender"
          name="gender"
          id="gender"
          arrayToMap={arrayToMapGender}
          placeholder="Enter your gender"
          register={register}
          error={errors.gender?.message}
          required
        />
        <Input
          label="Phone"
          name="phone"
          id="phone"
          type="tel"
          placeholder="Enter your phone number"
          register={register}
          error={errors.phone?.message}
          required
        />
        <Input
          label="Date&nbsp;of&nbsp;birth"
          name="dateBirth"
          id="dateBirth"
          type="date"
          register={register}
          error={errors.dateBirth?.message}
          required
        />
        <Input
          label="City"
          name="city"
          id="city"
          type="text"
          placeholder="Enter your city"
          register={register}
          error={errors.city?.message}
          required
        />
        <Input
          label="Postal&nbsp;code"
          name="zip"
          id="zip"
          type="text"
          placeholder="Enter your postal code"
          register={register}
          error={errors.zip?.message}
          required
        />
      </Form>
      <Modal
        isOpen={showFeedback}
        handleClose={() => {
          dispatch(showFeedbackMessage(!showFeedback));
          if (feedbackInfo.title !== 'Something went wrong') {
            history.push(`/admin/`);
          }
        }}
      >
        <FeedbackMessage infoForFeedback={feedbackInfo} />
      </Modal>
      {isPending && <Preloader />}
    </section>
  );
};

export default ProfileForm;
