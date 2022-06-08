import { useEffect, useState } from 'react';
import styles from './admins.module.css';
import AdminsTable from './Table';
import Preloader from '../Shared/Preloader';

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);
  const url = `${process.env.REACT_APP_API_URL}`;
  useEffect(() => {
    setShowPreloader(true);
    fetch(`${url}/admins`)
      .then((res) => res.json())
      .then((data) => {
        setAdmins(data.data);
        setShowPreloader(false);
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
      {showPreloader && <Preloader />}
    </section>
  );
};

export default Admins;
