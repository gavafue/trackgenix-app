import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import Table from '../Shared/Table';
import DeleteMessage from '../Shared/DeleteMessage';
import Modal from '../Shared/Modal';
import FeedbackMessage from '../Shared/FeedbackMessage';
import Button from '../Shared/Button';
import { useHistory } from 'react-router-dom';
import Preloader from '../Shared/Preloader';

const SuperAdmins = () => {
  const [superAdmins, setSuperAdmins] = useState([]);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [showFeedbackMessage, setShowFeedbackMessage] = useState(false);
  const [infoForDelete, setInfoForDelete] = useState('');
  const [infoForFeedback, setInfoForFeedback] = useState({});
  const [showPreloader, setShowPreloader] = useState(false);
  const history = useHistory();
  const editData = (id) => {
    history.push(`/super-admins/form/${id}`);
  };

  useEffect(() => {
    setShowPreloader(true);
    fetch(`${process.env.REACT_APP_API_URL}/super-admin`)
      .then((res) => res.json())
      .then((data) => {
        setSuperAdmins(data.data);
        setShowPreloader(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const createSuperAdmin = () => {
    history.push('/super-admins/form');
  };

  const deleteSuperAdmin = (superAdminId) => {
    const options = {
      method: 'DELETE',
      url: `${`${process.env.REACT_APP_API_URL}`}/super-admin/${superAdminId}`
    };
    setShowPreloader(true);
    fetch(options.url, options)
      .then((response) => response.json())
      .then((response) => {
        if (response.error === true) {
          setInfoForFeedback({
            title: 'Something went wrong',
            description: response.message
          });
          setShowPreloader(false);
        } else {
          setInfoForFeedback({
            title: 'Request done!',
            description: response.message
          });
          setSuperAdmins(superAdmins.filter((superAdmin) => superAdmin._id !== superAdminId));
          setShowFeedbackMessage(true);
          setShowPreloader(false);
        }
      })
      .catch((err) => console.log(err));
  };
  const superAdminData = superAdmins.map((superAdmin) => {
    return {
      ...superAdmin,
      active: superAdmin.active ? 'Yes' : 'No'
    };
  });
  return (
    <section className={styles.container}>
      <h1>Super Admins</h1>
      <div className={styles.buttonContainer}>
        <Button onClick={createSuperAdmin} label="Add Super Admin" theme="secondary" />
      </div>
      <Table
        data={superAdminData}
        headersName={['Name', 'Last Name', 'Email', 'Role', 'Active']}
        headers={['firstName', 'lastName', 'email', 'role', 'active']}
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
      {showPreloader && <Preloader />}
    </section>
  );
};

export default SuperAdmins;
