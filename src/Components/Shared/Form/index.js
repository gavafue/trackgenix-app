import React from 'react';
import styles from './form.module.css';
import Button from '../Button';
import { useHistory } from 'react-router-dom';

const Form = ({ children, onSubmit }) => {
  const history = useHistory();
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <fieldset className={styles.fieldset}>
          {children}
          <Button type="submit" label="Submit" />
        </fieldset>
      </form>
      <Button label="Go back" onClick={() => history.goBack()} theme="secondary" />
    </div>
  );
};

export default Form;
