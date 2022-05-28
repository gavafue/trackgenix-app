import { useState } from 'react';
import styles from './form.module.css';
import Input from './Input';
const Form = () => {
  const [nameValue, setNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [telephoneValue, setTelephoneValue] = useState('');
  const onChangeNameValue = (e) => {
    setNameValue(e.target.value);
  };
  const onChangeLastNameValue = (e) => {
    setLastNameValue(e.target.value);
  };
  const onChangeEmailValue = (e) => {
    setEmailValue(e.target.value);
  };
  const onChangeTelephoneValue = (e) => {
    setTelephoneValue(e.target.value);
  };
  return (
    <div className={styles.container}>
      <h1>Add an employee</h1>
      <form>
        <Input
          name="first-name"
          type="text"
          placeholder="Write your name."
          value={nameValue}
          onChange={onChangeNameValue}
          required
        />
        <Input
          name="last-name"
          type="text"
          placeholder="Write your last name."
          value={lastNameValue}
          onChange={onChangeLastNameValue}
          required
        />
        <Input
          name="email"
          type="text"
          placeholder="Write your email."
          value={emailValue}
          onChange={onChangeEmailValue}
          required
        />
        <Input
          name="phone"
          type="text"
          placeholder="Write your telephone."
          value={telephoneValue}
          onChange={onChangeTelephoneValue}
          required
        />

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Form;
