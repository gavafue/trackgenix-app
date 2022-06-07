import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import Table from '../Shared/Table';
import DeleteMessage from '../Shared/DeleteMessage';
import Modal from '../Shared/Modal';
import FeedbackMessage from '../Shared/FeedbackMessage';
import Button from '../Shared/Button';

const SuperAdmins = () => {
  const [superAdmins, setSuperAdmins] = useState([]);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [showFeedbackMessage, setShowFeedbackMessage] = useState(false);
  const [infoForDelete, setInfoForDelete] = useState('');
  const [infoForFeedback, setInfoForFeedback] = useState({});
  const editData = (id) => {
    window.location = `/super-admins/form/${id}`;
  };

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

  const deleteSuperAdmin = (string) => {
    const options = {
      method: 'DELETE',
      url: `${`${process.env.REACT_APP_API_URL}`}/super-admin/${string}`
    };
    fetch(options.url, options)
      .then((response) => response.json())
      .then((response) => {
        if (response.error === true) {
          setInfoForFeedback({
            title: 'Something went wrong',
            description: response.message
          });
        } else {
          setInfoForFeedback({
            title: 'Request done!',
            description: response.message
          });
          setSuperAdmins(superAdmins.filter((superAdmin) => superAdmin._id !== string));
          setShowFeedbackMessage(true);
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
      <h1>Super Admins</h1>
      <Table
        data={superAdminData}
        headersName={['Name', 'Last Name', 'Email', 'Password', 'Role', 'Active']}
        headers={['firstName', 'lastName', 'email', 'password', 'role', 'active']}
        setShowModal={setShowDeleteMessage}
        setInfoForDelete={setInfoForDelete}
        editData={editData}
      />
      <Modal
        isOpen={showDeleteMessage}
        handleClose={() => {
          setShowDeleteMessage(false);
        }}
      >
        <DeleteMessage
          handleClose={() => {
            setShowDeleteMessage(false);
          }}
          infoForDelete={infoForDelete}
          deleteItem={deleteSuperAdmin}
          setShowModal={setShowDeleteMessage}
        />
      </Modal>
      <Modal
        isOpen={showFeedbackMessage}
        handleClose={() => {
          setShowFeedbackMessage(false);
        }}
      >
        <FeedbackMessage infoForFeedback={infoForFeedback} />
      </Modal>
      <div className={styles.buttonContainer}>
        <Button onClick={createSuperAdmin} label="Add Super Admin" theme="secondary" />
      </div>
    </section>
  );
};

export default SuperAdmins;
