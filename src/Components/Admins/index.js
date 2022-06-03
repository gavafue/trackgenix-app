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
  const deleteAdmin = (string, setContentFeedbackModal) => {
    const options = {
      method: 'DELETE',
      url: `${`${process.env.REACT_APP_API_URL}`}/admins/${string}`
    };
    fetch(options.url, options)
      .then((response) => response.json())
      .then((response) => {
        if (response.error === true) {
          setContentFeedbackModal({ title: 'Something went wrong', description: response.message });
        } else {
          setContentFeedbackModal({ title: 'Request done!', description: response.message });
          setAdmins(admins.filter((admin) => admin._id !== string));
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <section className={styles.container}>
      <AdminsTable
        admins={admins}
        deleteAdmin={deleteAdmin}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <button className={styles.addBtn}>
        <a href="/admins/form">Add New Admin</a>
      </button>
    </section>
  );
};

export default Admins;
