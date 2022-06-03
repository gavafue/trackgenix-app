import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import SuperAdminsTable from './Table';

const SuperAdmins = () => {
  const [superAdmins, setSuperAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/super-admin`)
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data);
        setSuperAdmins(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const createSuperAdmin = () => {
    window.location.href = '/super-admins/form';
  };
  const deleteSuperAdmin = (_id, setContentFeedbackModal) => {
    fetch(`${process.env.REACT_APP_API_URL}/super-admin/${_id}`, {
      method: 'DELETE'
    })
      .then((response) => {
        response.json().then((response) => {
          if (response.error === true) {
            setContentFeedbackModal({
              title: 'Something went wrong',
              description: response.message
            });
          } else {
            setContentFeedbackModal({ title: 'Request done!', description: response.message });
            setSuperAdmins(superAdmins.filter((superAdmin) => superAdmin._id !== _id));
            alert(response.message);
          }
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className={styles.container}>
      <SuperAdminsTable
        superAdmins={superAdmins}
        deleteSuperAdmin={deleteSuperAdmin}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <button onClick={createSuperAdmin}>Add SuperAdmin</button>
    </section>
  );
};

export default SuperAdmins;
