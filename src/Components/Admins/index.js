import { useEffect, useState } from 'react';
import styles from './admins.module.css';
import AdminsTable from './Table';

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

  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      <a href="/admins/form" className={styles.button}>
        Add new admin +
      </a>
      <AdminsTable admins={admins} showModal={showModal} setShowModal={setShowModal} />
    </section>
  );
};

export default Admins;
