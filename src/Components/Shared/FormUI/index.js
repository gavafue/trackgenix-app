import React from 'react';
import styles from './form.module.css';
import Button from '../Button';
import { useHistory } from 'react-router-dom';

const FormUI = ({ children, onSubmit, name, header }) => {
  const history = useHistory();
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit} name={name}>
        <div className={styles.header}>{header}</div>
        <fieldset className={styles.fieldset}>
          {children}
          <Button type="submit" label="Submit" />
        </fieldset>
      </form>
      <Button label="Go back" onClick={() => history.goBack()} theme="secondary" />
    </div>
  );
};

export default FormUI;
