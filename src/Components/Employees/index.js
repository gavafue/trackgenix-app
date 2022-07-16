import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './employees.module.css';
import Table from 'Components/Shared/Table';
import DeleteMessage from 'Components/Shared/DeleteMessage';
import Modal from 'Components/Shared/Modal';
import FeedbackMessage from 'Components/Shared/FeedbackMessage';
import Button from 'Components/Shared/Button';
import Preloader from 'Components/Shared/Preloader';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployee, deleteEmployee } from 'redux/employees/thunks';
import {
  setidFromRow,
  showDeleteMessage,
  showFeedbackMessage,
  getSelectedEmployee,
  cleanSelectedEmployee
} from 'redux/employees/actions';

function Employees() {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.list);
  const isPending = useSelector((state) => state.employees.isPending);
  const feedbackInfo = useSelector((state) => state.employees.infoForFeedback);
  const deleteInfo = useSelector((state) => state.employees.idFromRow);
  const showDelete = useSelector((state) => state.employees.showDeleteMessage);
  const showFeedback = useSelector((state) => state.employees.showFeedbackMessage);
  const history = useHistory();
  const editData = (row) => {
    dispatch(getSelectedEmployee(row));
    history.push(`/employees/form/`);
  };
  const createEmployee = () => {
    history.push('/employees/form');
  };
  useEffect(() => {
    dispatch(cleanSelectedEmployee());
    dispatch(getEmployee());
  }, []);

  const deleteHandler = () => {
    dispatch(deleteEmployee(deleteInfo));
  };

  const employeesData = employees.map((employee) => {
    if (employee.active) return employee;
  });

  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      <Button label="Add new employee" onClick={createEmployee} />
      <Table
        data={employeesData}
        headersName={['Name', 'Last Name', 'Email', 'Phone']}
        headers={['firstName', 'lastName', 'email', 'phone']}
        setShowModal={(boolean) => dispatch(showDeleteMessage(boolean))}
        setidFromRow={(employeeId) => dispatch(setidFromRow(employeeId))}
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
          idFromRow={deleteInfo}
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
      {isPending && <Preloader />}
    </section>
  );
}

export default Employees;
