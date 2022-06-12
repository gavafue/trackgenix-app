import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './employees.module.css';
import Table from '../Shared/Table';
import DeleteMessage from '../Shared/DeleteMessage';
import Modal from '../Shared/Modal';
import FeedbackMessage from '../Shared/FeedbackMessage';
import Button from '../Shared/Button';
import Loader from '../Shared/Preloader';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployee, deleteEmployee } from '../../redux/employees/thunks';
import {
  setInfoForDelete,
  showDeleteMessage,
  showFeedbackMessage
} from '../../redux/employees/actions';

function Employees() {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.list);
  const isPending = useSelector((state) => state.employees.pending);
  const feedbackInfo = useSelector((state) => state.employees.infoForFeedback);
  const deleteInfo = useSelector((state) => state.employees.infoForDelete);
  const showDelete = useSelector((state) => state.employees.showDeleteMessage);
  const showFeedback = useSelector((state) => state.employees.showFeedbackMessage);
  const history = useHistory();
  const editData = (id) => {
    history.push(`/employees/form/${id}`);
  };
  const createEmployee = () => {
    history.push('/employees/form');
  };
  useEffect(() => {
    dispatch(getEmployee());
  }, []);

  const deleteHandler = () => {
    dispatch(deleteEmployee(deleteInfo));
  };
  const employeeData = employees.map((employee) => ({
    ...employee
  }));

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Employees</h2>
      <div className={styles.button}>
        <Button label="Add new employee" onClick={createEmployee} />
      </div>
      <div>
        <Table
          data={employeeData}
          headersName={['Name', 'Last Name', 'Email', 'Phone']}
          headers={['firstName', 'lastName', 'email', 'phone']}
          setShowModal={(boolean) => dispatch(showDeleteMessage(boolean))}
          setInfoForDelete={(employeeId) => dispatch(setInfoForDelete(employeeId))}
          editData={editData}
          deleteEmployee={deleteHandler}
        />
        <Modal
          isOpen={showDelete}
          handleClose={() => {
            dispatch(showDeleteMessage(!showDelete));
          }}
        >
          <DeleteMessage
            handleClose={() => {
              dispatch(showDeleteMessage(!showDelete));
            }}
            infoForDelete={deleteInfo}
            deleteItem={deleteHandler}
            setShowModal={(boolean) => dispatch(showDeleteMessage(boolean))}
          />
        </Modal>
        <Modal
          isOpen={showFeedback}
          handleClose={() => {
            dispatch(showFeedbackMessage(!showFeedback));
          }}
        >
          <FeedbackMessage infoForFeedback={feedbackInfo} />
        </Modal>
        {isPending && <Loader />}
      </div>
    </section>
  );
}

export default Employees;
