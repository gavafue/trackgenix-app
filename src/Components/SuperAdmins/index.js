import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import Table from '../Shared/Table';

const SuperAdmins = () => {
  const [superAdmins, setSuperAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/super-admin`)
      .then((res) => res.json())
      .then((data) => {
        setSuperAdmins(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const createSuperAdmin = () => {
    window.location.href = '/super-admins/form';
  };

  const deleteSuperAdmin = (string, setContentFeedbackModal) => {
    const options = {
      method: 'DELETE',
      url: `${`${process.env.REACT_APP_API_URL}`}/super-admin/${string}`
    };
    fetch(options.url, options)
      .then((response) => response.json())
      .then((response) => {
        if (response.error === true) {
          setContentFeedbackModal({ title: 'Something went wrong', description: response.message });
        } else {
          setContentFeedbackModal({ title: 'Request done!', description: response.message });
          setSuperAdmins(superAdmins.filter((superAdmin) => superAdmin._id !== string));
        }
      })
      .catch((err) => console.log(err));
  };
  const superAdminData = superAdmins.map((superAdmin) => {
    return {
      firstName: superAdmin.firstName,
      lastName: superAdmin.lastName,
      email: superAdmin.email,
      password: superAdmin.password,
      role: superAdmin.role,
      ...superAdmin,
      active: superAdmin.active ? 'Yes' : 'No'
    };
  });
  return (
    <section className={styles.container}>
      <Table
        data={superAdminData}
        headersName={['Name', 'Last Name', 'Email', 'Password', 'Role', 'Active']}
        headers={['firstName', 'lastName', 'email', 'password', 'role', 'active']}
        deleteSuperAdmin={deleteSuperAdmin}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <button onClick={createSuperAdmin}>Add SuperAdmin</button>
    </section>
  );
};

export default SuperAdmins;
