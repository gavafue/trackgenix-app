import React from 'react';
import styles from './notFound.module.css';
import { useHistory } from 'react-router-dom';
import Button from '../Button';

const NotFound = () => {
  const history = useHistory();
  return (
    <section className={styles.container}>
      <h1>404 - Page not found</h1>
      <nav>
        <Button label="Go Home" onClick={() => history.push('/home')} />
        <Button label="Go back" onClick={() => history.goBack()} theme="secondary" />
      </nav>
    </section>
  );
};
export default NotFound;
