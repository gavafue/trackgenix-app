import React from 'react';
import styles from './index.module.css';

const InfoMessage = ({ infoToShow }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}> {infoToShow.title}</h1>
      <p>{infoToShow.description}</p>
    </div>
  );
};

export default InfoMessage;
