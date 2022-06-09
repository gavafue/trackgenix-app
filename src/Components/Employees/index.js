import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './employees.module.css';
import Table from '../Shared/Table';
import DeleteMessage from '../Shared/DeleteMessage';
import Modal from '../Shared/Modal';
import FeedbackMessage from '../Shared/FeedbackMessage';
import Button from '../Shared/Button';
import Loader from '../Shared/Preloader';

const URL = process.env.REACT_APP_API_URL;

function Employees() {
  const [employees, saveEmployees] = useState([]);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [showFeedbackMessage, setShowFeedbackMessage] = useState(false);
  const [infoForDelete, setInfoForDelete] = useState('');
  const [infoForFeedback, setInfoForFeedback] = useState({});
  const [showLoader, setShowLoader] = useState(false);

  const history = useHistory();
  const editData = (id) => {
    history.push(`/employees/form/${id}`);
  };
  const createEmployee = () => {
    history.push('/employees/form');
  };
  useEffect(() => {
    setShowLoader(true);
    fetch(`${URL}/employees`)
      .then((res) => res.json())
      .then((data) => {
        saveEmployees(data.data);
        setShowLoader(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const deleteEmployee = (_id) => {
    const options = {
      method: 'DELETE',
      url: `${URL}/employees/${_id}`
    };
    setShowLoader(true);
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
          saveEmployees(employees.filter((employee) => _id !== employee._id));
          setShowFeedbackMessage(true);
          setShowLoader(false);
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Employees</h2>
      <div className={styles.button}>
        <Button label="Add new employee" theme="secondary" onClick={createEmployee} />
      </div>
      <div>
        <Table
          data={employees}
          headersName={['Name', 'Last Name', 'Email', 'Phone']}
          headers={['firstName', 'lastName', 'email', 'phone']}
          deleteEmployee={deleteEmployee}
          editData={editData}
          setShowModal={setShowDeleteMessage}
          setInfoForDelete={setInfoForDelete}
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
            deleteItem={deleteEmployee}
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
        {showLoader && <Loader />}
      </div>
    </section>
  );
}

export default Employees;
