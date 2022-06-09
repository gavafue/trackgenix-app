import React from 'react';
import styles from './form.module.css';
import Button from '../Button';

const Form = ({ children, legend }) => {
  if (legend) {
    <div className={styles.container}>
      <form className={styles.form}>
        <fieldset className={styles.fieldset}>
          <legend>{legend}</legend>
          {children}
          <Button type="submit" label="Submit" />
        </fieldset>
      </form>
    </div>;
  }

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <fieldset className={styles.fieldset}>
          {children}
          <Button type="submit" label="Submit" />
        </fieldset>
      </form>
    </div>
  );
};

export default Form;
