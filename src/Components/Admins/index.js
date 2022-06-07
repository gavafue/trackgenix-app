import { useEffect, useState } from 'react';
import styles from './admins.module.css';
import AdminsTable from './Table';
import Modal from '../Shared/Modal';

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const url = `${process.env.REACT_APP_API_URL}`;
  useEffect(() => {
    fetch(`${url}/admins`)
      .then((res) => res.json())
      .then((data) => {
        setAdmins(data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const deleteAdmin = (string /*, setContentFeedbackModal*/) => {
    const options = {
      method: 'DELETE',
      url: `${`${process.env.REACT_APP_API_URL}`}/admins/${string}`
    };
    fetch(options.url, options)
      .then((response) => response.json())
      .then((response) => {
        if (response.error === true) {
          <Modal>
            <h2>Something went wrong</h2>
            <p>{response.message}</p>
          </Modal>;
        } else {
          <Modal>
            <h2>Request done!</h2>
            <p>{response.message}</p>
          </Modal>;
          setAdmins(admins.filter((admin) => admin._id !== string));
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      <a href="/admins/form" className={styles.button}>
        Add new admin +
      </a>
      <AdminsTable
        admins={admins}
        deleteAdmin={deleteAdmin}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </section>
  );
};

export default Admins;
