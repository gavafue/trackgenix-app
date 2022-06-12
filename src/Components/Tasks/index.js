import styles from './tasks.module.css';
import Table from '../Shared/Table';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import DeleteMessage from '../Shared/DeleteMessage';
import Modal from '../Shared/Modal';
import FeedbackMessage from '../Shared/FeedbackMessage';
import Button from '../Shared/Button';
import Preloader from '../Shared/Preloader';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks, deleteTask } from '../../redux/tasks/thunks';
import {
  setInfoForDelete,
  showDeleteMessage,
  showFeedbackMessage
} from '../../redux/tasks/actions';

const Tasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.list);
  const isPending = useSelector((state) => state.tasks.pending);
  const feedbackInfo = useSelector((state) => state.tasks.infoForFeedback);
  const deleteInfo = useSelector((state) => state.tasks.infoForDelete);
  const showDelete = useSelector((state) => state.tasks.showDeleteMessage);
  const showFeedback = useSelector((state) => state.tasks.showFeedbackMessage);

  const history = useHistory();
  const editData = (id) => {
    history.push(`/tasks/form/${id}`);
  };
  const createTask = () => {
    history.push('/tasks/form/');
  };
  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const deleteHandler = () => {
    dispatch(deleteTask(deleteInfo));
  };
  const taskData = tasks.map((task) => ({
    ...task,
    nameProject: task.nameProject?.name || 'Project Not Found'
  }));
  return (
    <section className={styles.container}>
      <h2>Tasks</h2>
      <div className={styles.buttonContainer}>
        <Button onClick={createTask} label="Add new task" />
      </div>
      <Table
        data={taskData}
        headersName={['Project', 'Week', 'Day', 'Description', 'Hours']}
        headers={['nameProject', 'week', 'day', 'description', 'hours']}
        setShowModal={(boolean) => dispatch(showDeleteMessage(boolean))}
        setInfoForDelete={(taskId) => dispatch(setInfoForDelete(taskId))}
        editData={editData}
        deleteTask={deleteHandler}
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
      {isPending && <Preloader />}
    </section>
  );
};

export default Tasks;
